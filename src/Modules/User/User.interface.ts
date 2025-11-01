import { Model } from "mongoose";
import { userRoles } from "./User.constant";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: TUserRoles;
  password: string;
  confirmPassword: string;
  isActive: boolean;
  isVerified: boolean;
}

export interface IJwtPayload {
  id: string;
  email: string;
  role: string;
}

export type TUserRoles = keyof typeof userRoles;

export interface UserModel extends Model<IUser> {
  isPasswordCorrect: (
    password: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}
