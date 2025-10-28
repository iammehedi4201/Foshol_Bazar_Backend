import httpStatus from "http-status";
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import JwtError from "./errorHelper/jwtError";

export const generateToken = (
  payload: object,
  secret: Secret,
  expiresIn: number,
): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn,
  };

  const token = jwt.sign(payload, secret, options);
  return token;
};

// 🎯 Use `JwtPayload | string` instead of `any`
export const verifyToken = (
  token: string,
  secret: Secret,
): JwtPayload | string => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as JwtPayload | string;
  } catch (_err) {
    throw new JwtError("Invalid Token", httpStatus.UNAUTHORIZED);
  }
};
