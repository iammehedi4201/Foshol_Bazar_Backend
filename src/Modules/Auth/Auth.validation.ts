import { z } from "zod";

// Address schema (optional)
const addressSchema = z.object({
  full: z.string().min(1, "Full address is required"),
  area: z.string().min(1, "Area is required"),
  city: z.string().min(1, "City is required"),
});

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Must contain at least one number",
  });

// Customer Create Validation Schema
export const createCustomerValidation = z.object({
  body: z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

// OTP Verification Schema
export const verifyOTPSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    code: z.string().length(6, "OTP code must be 6 characters"),
  }),
});

// Login Schema
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

// Refresh Token Schema
export const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
  }),
});
