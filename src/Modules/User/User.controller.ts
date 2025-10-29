import CatchAsync from "@/Utils/CatchAsync";
import sendResponse from "@/Utils/SendResponse";
import { UserService } from "./User.service";

const RegisterUser = CatchAsync(async (req, res) => {
  const result = await UserService.RegisterUserToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
    message: "User Created Successfully",
  });
});

export const UserController = {
  RegisterUser,
};
