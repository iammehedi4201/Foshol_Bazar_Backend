import { Types } from "mongoose";

export interface IPaymentMethod {
  bank: string;
  bikash: number;
  nigod: number;
}

export interface IAddress {
  full: string;
  area: string;
  city: string;
}

export interface IVerification {
  nid: string;
  tradeLicense: string;
}

export interface IVendor {
  user_id: Types.ObjectId;
  name: string;
  phone: number;
  email: string;
  image?: string;
  coverUrl?: string;
  store_name?: string;
  paymentMethod?: IPaymentMethod;
  address?: IAddress;
  rating?: number;
  category?: string[];
  verification?: IVerification;
  isActive: boolean;
  isVerified: boolean;
}
