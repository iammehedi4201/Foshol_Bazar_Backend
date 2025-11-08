import { ENV } from "@/config";
import CatchAsync from "../../Utils/CatchAsync";
import sendResponse from "../../Utils/SendResponse";
import { AuthService } from "./Auth.service";

// const LoginUser = CatchAsync(async (req, res) => {
//   const result = await AuthService.LoginUserToDb(req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     data: result,
//     message: "User Logged In Successfully",
//   });
// });

const registerCustomerToDB = CatchAsync(async (req, res) => {
  const result = await AuthService.registerCustomerToDB(req.body);

  // 2️⃣ Send response with access token + customer info
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Customer registered successfully",
    data: result,
  });
});

const verifyEmail = CatchAsync(async (req, res) => {
  const { token } = req.query;

  if (typeof token !== "string") {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Invalid token",
      data: null,
    });
  }

  const { accessToken, refreshToken } = await AuthService.verifyEmail(token);

  // 1. Set refreshToken in httpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });

  // 2. Decide redirect URL
  const clientBase = ENV.CLIENT_URL;
  let redirectTo: string;
  // 2. Redirect to /home with accessToken
  const redirectUrl = new URL("/home", process.env.CLIENT_URL!);
  redirectUrl.searchParams.set("accessToken", accessToken);

  // Optional: Add flag so frontend knows it's post-verification
  redirectUrl.searchParams.set("verified", "true");
  // 3. Send a tiny JSON response (optional) then redirect
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Email verified and logged in",
    data: { redirectTo: redirectUrl.toString() },
  });
});

const sendOTP = CatchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await AuthService.sendOTP(email);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: result.message,
    data: null,
  });
});

export const verifyOTPCode = CatchAsync(async (req, res) => {
  const { email, code } = req.body;
  const { accessToken, refreshToken } = await AuthService.verifyOTPCode(
    email,
    code,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  const redirectUrl = new URL("/home", ENV.CLIENT_URL);
  redirectUrl.searchParams.set("accessToken", accessToken);
  redirectUrl.searchParams.set("verified", "true");

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "OTP verified",
    data: { redirectTo: redirectUrl.toString() },
  });
});
export const AuthController = {
  // LoginUser,
  registerCustomerToDB,
  verifyEmail,
  sendOTP,
};
