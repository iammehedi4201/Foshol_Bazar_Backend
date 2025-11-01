import { Document, model, Schema } from "mongoose";
import {
  Availability,
  IAddress,
  IDeliveryMan,
  IVehicleLocation,
  VehicleType,
} from "./DeliveryMan.interface";

const AddressSchema = new Schema<IAddress>({
  full: { type: String, required: [true, "Full address is required"] },
  area: { type: String, required: [true, "Area is required"] },
  city: { type: String, required: [true, "City is required"] },
});

const VehicleLocationSchema = new Schema<IVehicleLocation>({
  latitude: { type: Number, required: [true, "Latitude is required"] },
  longitude: { type: Number, required: [true, "Longitude is required"] },
});

const DeliveryManSchema = new Schema<IDeliveryMan>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },
    name: { type: String, required: [true, "Name is required"] },
    phone: { type: String, required: [true, "Phone number is required"] },
    image: { type: String },

    address: { type: AddressSchema },
    rating: { type: Number, default: 0 },
    location: { type: VehicleLocationSchema },

    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      default: VehicleType.Bike,
      required: [true, "Vehicle type is required"],
    },
    availability: {
      type: String,
      enum: Object.values(Availability),
      default: Availability.Offline,
      required: [true, "Availability status is required"],
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Minimal indexes
DeliveryManSchema.index({ userId: 1 }); // search by userId
DeliveryManSchema.index({ vehicleType: 1, availability: 1 }); // search by vehicleType + availability

export const DeliveryMan = model<IDeliveryMan>(
  "DeliveryMan",
  DeliveryManSchema,
);
