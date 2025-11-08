import { ENV } from "@/config";
import { sendOTPEmail } from "@/helper/emailHelper/sendOTPEmail";
import { sendVerificationEmail } from "@/helper/emailHelper/sendVerificationEmail";
import { AppError } from "@/helper/errorHelper/appError";
import { generateToken, verifyToken } from "@/helper/jwtHelper";
import { performDBTransaction } from "@/Utils/performDBTransaction";
import { CustomerRegisterPayload } from "../Customer/Customer.interface";
import { Customer } from "../Customer/Customer.model";
import { EmailVerification } from "../EmailVerification/EmailVerification.model";
import { userRoles } from "../User/User.constant";
import { IUser } from "../User/User.interface";
import { User } from "../User/User.model";
import { hashPassword } from "./../../helper/password.helper";

const registerCustomerToDB = async (payLoad: CustomerRegisterPayload) => {
  const { name, email, phone, password } = payLoad;

  const hashedPassword = await hashPassword(password);

  // Perform transaction for DB operations only
  const { user, customer } = await performDBTransaction(async (session) => {
    const isCustomerExists = await Customer.findOne({ email }).session(session);
    if (isCustomerExists) {
      throw new AppError("Customer already exists", 400);
    }

    // Create user
    const [user] = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
          role: userRoles.Customer,
        },
      ],
      { session },
    );

    // Create customer
    const [customer] = await Customer.create(
      [
        {
          name,
          email,
          phone,
          user_id: user._id,
        },
      ],
      { session },
    );

    return { user, customer };
  });

  let verificationSent = false;

  // Generate Magic Link JWT
  const magicToken = generateToken(
    {
      id: user._id,
      email: user.email,
    },
    ENV.EMAIL_VERIFICATION_SECRET,
    "15min",
  );

  await sendVerificationEmail(email, magicToken);

  verificationSent = true;

  return customer;
};

const verifyEmail = async (token: string) => {
  if (!token) {
    throw new AppError("token is required", 400);
  }

  const decoded = verifyToken(token, ENV.EMAIL_VERIFICATION_SECRET);

  const user = await User.findOne({
    _id: decoded.id,
    email: decoded.email,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Generate tokens
  const accessToken = generateToken(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    ENV.JWT_ACCESS_SECRET_KEY,
    "15m",
  );

  const refreshToken = generateToken(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    ENV.JWT_REFRESH_SECRET_KEY,
    "7d",
  );

  // 4. Mark as verified ONLY if not already
  const alreadyVerified = user.isVerified;
  if (!alreadyVerified) {
    user.isVerified = true;
    await user.save();
  }

  return {
    accessToken,
    refreshToken,
  };
};

const sendOTP = async (email: string) => {
  const user = await User.findOne({ email, isVerified: false });
  if (!user) throw new AppError("User not found or already verified", 404);

  // Revoke old OTPs
  await EmailVerification.deleteMany({ userId: user._id, used: false });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashed = await hashPassword(code);

  await EmailVerification.create({
    userId: user._id,
    email,
    code: hashed,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
  });

  await sendOTPEmail(email, code);
  return { message: "OTP sent to email" };
};

const verifyOTPCode = async (email: string, code: string) => {
  const record = await EmailVerification.findOne({
    email,
    used: false,
    expiresAt: { $gt: new Date() }, // ← CRITICAL: Check expiry
  });

  if (!record) {
    throw new AppError("No OTP request found for this email", 404);
  }

  if (!record) throw new AppError("Invalid or expired code", 400);
  if (!(await record.isValidCode(code)))
    throw new AppError("Incorrect code", 400);

  await EmailVerification.updateOne({ _id: record._id }, { used: true });

  const user = await User.findByIdAndUpdate(
    record.userId,
    { isVerified: true },
    { new: true },
  );

  if (!user) throw new AppError("User not found", 404);

  // Generate tokens AFTER transaction (doesn't need DB lock)
  const accessToken = generateToken(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    ENV.JWT_ACCESS_SECRET_KEY,
    "15m",
  );

  const refreshToken = generateToken(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    ENV.JWT_REFRESH_SECRET_KEY,
    "7d",
  );

  return { accessToken, refreshToken };
};

export const AuthService = {
  registerCustomerToDB,
  verifyEmail,
  sendOTP,
  verifyOTPCode,
};
