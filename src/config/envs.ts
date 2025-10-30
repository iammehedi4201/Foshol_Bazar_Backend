import dotenv from "dotenv";
import z from "zod";

dotenv.config();

// Define schema for validation
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  ACCESS_KEY_ID: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_SENDER: z.string().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
});

// Validate and parse
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:",
    env.error.flatten().fieldErrors,
  );
  process.exit(1);
}

// Export validated variables
export const ENV = {
  NODE_ENV: env.data.NODE_ENV,
  PORT: Number(env.data.PORT),
  MONGO_URI: env.data.MONGO_URI,
  JWT_SECRET: env.data.JWT_SECRET,
  ACCESS_KEY_ID: env.data.ACCESS_KEY_ID,
  RESEND_API_KEY: env.data.RESEND_API_KEY,
  RESEND_SENDER: env.data.RESEND_SENDER,
  EMAIL_USER: env.data.EMAIL_USER,
  EMAIL_PASS: env.data.EMAIL_PASS,
};
