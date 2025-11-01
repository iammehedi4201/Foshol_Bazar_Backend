// interfaces/IDeliveryMan.ts
import { Document, Types } from "mongoose";

export interface IAddress {
  full: string;
  area: string;
  city: string;
}

export interface IVehicleLocation {
  latitude: number;
  longitude: number;
}

export enum VehicleType {
  Bike = "bike",
  Cycle = "cycle",
}

export enum Availability {
  Online = "online",
  Offline = "offline",
}

export interface IDeliveryMan {
  userId: Types.ObjectId;
  //   vehicleId: Types.ObjectId;
  name: string;
  image?: string;
  phone: string;
  address?: IAddress;
  rating?: number;
  location?: IVehicleLocation;
  vehicleType: VehicleType;
  availability?: Availability;
  isActive: boolean;
  isVerified: boolean;
  isProfileComplete: boolean;
}
