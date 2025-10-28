import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID || "";
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const RESEND_SENDER = process.env.RESEND_SENDER || "";
