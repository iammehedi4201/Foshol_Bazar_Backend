// models/EmailVerification.model.ts
import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import {
  EmailVerificationModel,
  IEmailVerification,
} from "./EmailVerification.interface";

const emailVerificationSchema = new Schema<EmailVerificationModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["otp"],
      default: "otp",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// === INDEXES ===
emailVerificationSchema.index({ email: 1, type: 1 });
emailVerificationSchema.index({ userId: 1, used: 1 });

// Auto-delete expired tokens (MongoDB TTL)
emailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// === METHODS ===
emailVerificationSchema.methods.isValidCode = async function (
  plainCode: string,
): Promise<boolean> {
  return await bcrypt.compare(plainCode, this.code);
};

export const EmailVerification = model<EmailVerificationModel>(
  "EmailVerification",
  emailVerificationSchema,
);
