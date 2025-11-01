import { Types } from "mongoose";

export interface IAddress {
  full: string;
  area: string;
  city: string;
}

export interface ICustomer {
  user_id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address?: IAddress;
  image?: string;
  isActive: boolean;
  isVerified: boolean;
}
