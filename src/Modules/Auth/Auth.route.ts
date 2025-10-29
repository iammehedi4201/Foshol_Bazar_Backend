import { Router } from "express";
import ValidateRequest from "../../Middleware/ValidationRequest";
import { UserController } from "../User/User.controller";
import { UserValidation } from "../User/User.validation";
import { AuthController } from "./Auth.controller";

const router = Router();

//: Create New User
router.post(
  "/register-user",
  ValidateRequest(UserValidation.RegisterUserSchema),
  UserController.RegisterUser,
);

//: Login User
router.post(
  "/login",
  ValidateRequest(UserValidation.UserLoginSchema),
  AuthController.LoginUser,
);

export const Authroutes = router;
