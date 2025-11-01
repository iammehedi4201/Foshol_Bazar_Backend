import { model, Schema } from "mongoose";
import {
  IAddress,
  IPaymentMethod,
  IVendor,
  IVerification,
} from "./Vendor.interface";

const paymentMethodSchema = new Schema<IPaymentMethod>(
  {
    bank: { type: String, required: [true, "bank is required"] },
    bikash: { type: Number, required: [true, "bikash is required"] },
    nigod: { type: Number, required: [true, "nigod is required"] },
  },
  { _id: false },
);

const addressSchema = new Schema<IAddress>(
  {
    full: { type: String, required: [true, "full address is required"] },
    area: { type: String, required: [true, "area is required"] },
    city: { type: String, required: [true, "city is required"] },
  },
  { _id: false },
);

const verificationSchema = new Schema<IVerification>(
  {
    nid: { type: String, required: [true, "nid is required"] },
    tradeLicense: {
      type: String,
      required: [true, "trade license is required"],
    },
  },
  { _id: false },
);

const vendorSchema = new Schema<IVendor>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user_id is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "phone is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
    },
    image: { type: String, default: "" },
    coverUrl: { type: String, default: "" },
    store_name: {
      type: String,
      trim: true,
    },
    paymentMethod: {
      type: paymentMethodSchema,
    },
    address: {
      type: addressSchema,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "rating cannot be less than 0"],
      max: [5, "rating cannot exceed 5"],
    },
    category: {
      type: [String],
      default: [],
    },
    verification: {
      type: verificationSchema,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Add after vendorSchema
vendorSchema.index({ user_id: 1 }, { unique: true });
vendorSchema.index({ email: 1 }, { unique: true });
vendorSchema.index({ store_name: "text" });
vendorSchema.index({ isActive: 1 });
vendorSchema.index({ rating: -1 });

export const Vendor = model<IVendor>("Vendor", vendorSchema);
