import CatchAsync from "@/Utils/CatchAsync";
import sendResponse from "@/Utils/SendResponse";
import { UserService } from "./User.service";

// const RegisterUser = CatchAsync(async (req, res) => {
//   const result = await UserService.RegisterUserToDB(req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: 201,
//     data: result,
//     message: "User Created Successfully",
//   });
// });

// export const UserController = {
//   RegisterUser,
// };

const getAllUsers = CatchAsync(async (req, res) => {
  const result = await UserService.GetAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "All Users Fetched Successfully",
  });
});

const getUserById = CatchAsync(async (req, res) => {
  const result = await UserService.GetUserById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "User Fetched Successfully",
  });
});

const updateUser = CatchAsync(async (req, res) => {
  const result = await UserService.UpdateUser(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "User Updated Successfully",
  });
});

const deleteUser = CatchAsync(async (req, res) => {
  const result = await UserService.DeleteUser(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Deleted Successfully",
    data: result.message,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
