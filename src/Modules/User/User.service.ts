import AppError from "@/helper/errorHelper/appError";
import CreateAccessToken from "../Auth/Auth.utils";
import { IJwtPayload, IUser } from "./User.interface";
import { User } from "./User.model";

// const RegisterUserToDB = async (payLoad: IUser) => {
//check if user already exists
//   const isUserExist = await User.findOne({ email: payLoad?.email });
//   if (isUserExist) {
//     throw new AppError("User already exists", 400);
//   }

//create access token
//   const jwtPayload: IJwtPayload = {
//     email: payLoad?.email,
//     role: payLoad?.role,
//   };

//   const accessToken = await CreateAccessToken(jwtPayload);

//create user
//   await User.create(payLoad);

//   return {
//     accessToken: accessToken,
//   };
// };

// export const UserService = {
//   RegisterUserToDB,
// };

const GetAllUsers = async () => {
  const users = await User.find({}, { password: 0, confirmPassword: 0 }).sort({
    createdAt: -1,
  });

  if (!users) {
    throw new AppError("Users not found", 404);
  }

  return users;
};

const GetUserById = async (id: string) => {
  const user = await User.findById(id, { password: 0, confirmPassword: 0 });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

const UpdateUser = async (id: string, payload: Partial<IUser>) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const { password, confirmPassword, ...safeData } = payload;

  const updatedUser = await User.findByIdAndUpdate(id, safeData, {
    new: true,
    runValidators: true,
  }).select("-password -confirmPassword");

  return updatedUser;
};

const DeleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.isActive) {
    throw new AppError("User already inactive", 400);
  }

  user.isActive = false;
  await user.save({ validateBeforeSave: false });

  return { message: "User Delete successfully" };
};

export const UserService = {
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
};
