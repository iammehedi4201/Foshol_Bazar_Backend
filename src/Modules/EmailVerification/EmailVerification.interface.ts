import { Document, Types } from "mongoose";

export interface IEmailVerification {
  userId: Types.ObjectId;
  email: string;
  code: string;
  type: "otp";
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmailVerificationMethods {
  isValidCode(plainCode: string): Promise<boolean>;
}

export type EmailVerificationModel = Document<unknown, {}, IEmailVerification> &
  IEmailVerification &
  IEmailVerificationMethods;
