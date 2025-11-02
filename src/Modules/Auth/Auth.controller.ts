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

  // 1️⃣ Set refresh token as HTTP-only cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // 2️⃣ Send response with access token + customer info
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Customer registered successfully",
    data: {
      customer: result.customer,
      accessToken: result.accessToken,
    },
  });
});

export const AuthController = {
  // LoginUser,
  registerCustomerToDB,
};
