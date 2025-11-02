// const LoginUserToDb = async (payLoad: ILoginUser) => {
//   //check if user exists
//   const user = await User.findOne({ email: payLoad?.email });

import { ENV } from "@/config";
import AppError from "@/helper/errorHelper/appError";
import { generateToken } from "@/helper/jwtHelper";
import { performDBTransaction } from "@/Utils/performDBTransaction";
import {
  CustomerRegisterPayload,
  ICustomer,
} from "../Customer/Customer.interface";
import { Customer } from "../Customer/Customer.model";
import { userRoles, UserRoles } from "../User/User.constant";
import { IUser } from "../User/User.interface";
import { User } from "../User/User.model";
import { hashPassword } from "./../../helper/password.helper";

//   if (!user) {
//     throw new AppError("User does not exist", 400);
//   }

//   //check if user is blocked
//   if (user?.status === "blocked") {
//     throw new AppError("User is blocked", 400);
//   }

//   //check if user is deleted
//   if (user?.isDeleted) {
//     throw new AppError("User is deleted", 400);
//   }

//   //check if password is correct
//   if (!(await User.isPasswordCorrect(payLoad?.password, user?.password))) {
//     throw new AppError("Password is incorrect", 400);
//   }

//   //create access token
//   const jwtPayload: IJwtPayload = {
//     email: user?.email,
//     role: user?.role,
//   };

//   const accessToken = await CreateAccessToken(jwtPayload);

//   return {
//     accessToken: accessToken,
//   };
// };

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

  return {
    customer: {
      id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    },
    accessToken,
    refreshToken,
  };
};
export const AuthService = {
  // LoginUserToDb,
  registerCustomerToDB,
};
