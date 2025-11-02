// const LoginUserToDb = async (payLoad: ILoginUser) => {
//   //check if user exists
//   const user = await User.findOne({ email: payLoad?.email });

import AppError from "@/helper/errorHelper/appError";
import {
  CustomerRegisterPayload,
  ICustomer,
} from "../Customer/Customer.interface";
import { Customer } from "../Customer/Customer.model";
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
  const isCustomerExists = await Customer.findOne({ email });

  if (isCustomerExists) {
    throw new AppError("Customer already exists", 400);
  }

  const hashedPassword = await hashPassword(password);
};

export const AuthService = {
  // LoginUserToDb,
};
