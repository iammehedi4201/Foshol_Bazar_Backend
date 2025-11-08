import ValidateRequest from "@/middlewares/common/ValidationRequest";
import { Router } from "express";
import { AuthController } from "./Auth.controller";
import { createCustomerValidation } from "./Auth.validation";

const router = Router();

//: Create New Customer
router.post(
  "/register-customer",
  ValidateRequest(createCustomerValidation),
  AuthController.registerCustomerToDB,
);

//: verify Email
router.get("/verify-email", AuthController.verifyEmail);

// send otp fallback route
router.post("/send-otp", AuthController.sendOTP);

router.get("/verify-otp", AuthController.verifyOTP);

//: Login User
// router.post(
//   "/login",
//   ValidateRequest(UserValidation.UserLoginSchema),
//   AuthController.LoginUser,
// );

export const Authroutes = router;
