import AppError from "@/helper/errorHelper/appError";
import CreateAccessToken from "../Auth/Auth.utils";
import { IJwtPayload, IUser } from "./User.interface";
import { User } from "./User.model";

const RegisterUserToDB = async (payLoad: IUser) => {
  //check if user already exists
  const isUserExist = await User.findOne({ email: payLoad?.email });
  if (isUserExist) {
    throw new AppError("User already exists", 400);
  }

  //create access token
  const jwtPayload: IJwtPayload = {
    email: payLoad?.email,
    role: payLoad?.role,
  };

  const accessToken = await CreateAccessToken(jwtPayload);

  //create user
  await User.create(payLoad);

  return {
    accessToken: accessToken,
  };
};

export const UserService = {
  RegisterUserToDB,
};
