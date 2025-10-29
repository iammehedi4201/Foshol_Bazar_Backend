import { model, Schema } from "mongoose";
import { userRoles, UserRoles } from "./User.constant";
import { IUser, UserModel } from "./User.interface";

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Please enter your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: {
        values: UserRoles,
        message: "Please select correct role",
      },
      default: "Customer",
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please enter your password again"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//hash password before saving
// UserSchema.pre("save", async function (next) {
//   const user = this as IUser;
//   user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
//   user.confirmPassword = user?.password;
//   next();
// });

//check if password is correct
// UserSchema.static(
//   "isPasswordCorrect",
//   async function (password: string, hashedPassword: string) {
//     return await bcrypt.compare(password, hashedPassword);
//   },
// );

export const User = model<IUser, UserModel>("User", UserSchema);
