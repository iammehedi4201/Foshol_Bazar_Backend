import ValidateRequest from "@/middlewares/common/ValidationRequest";
import { Router } from "express";
import { AuthController } from "./Auth.controller";
import {
  createCustomerValidation,
  loginSchema,
  verifyOTPSchema,
} from "./Auth.validation";

const router = Router();

//: Create New Customer
router.post(
  "/register-customer",
  ValidateRequest(createCustomerValidation),
  AuthController.registerCustomerToDB,
);

router.post("/login", ValidateRequest(loginSchema), AuthController.loginToDB);

// send otp fallback route
router.post("/send-otp", AuthController.sendOTP);

// verify email route
router.get("/verify-email", AuthController.verifyEmail);

// verify otp route
router.get(
  "/verify-otp",
  ValidateRequest(verifyOTPSchema),
  AuthController.sendOTP,
);

//: Login User
// router.post(
//   "/login",
//   ValidateRequest(UserValidation.UserLoginSchema),
//   AuthController.LoginUser,
// );

export const Authroutes = router;
