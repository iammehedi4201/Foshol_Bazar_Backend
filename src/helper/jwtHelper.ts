import httpStatus from "http-status";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import JwtError from "./errorHelper/jwtError";

export const generateToken = (
  payLoad: object, // better to use object type
  secret: Secret,
  expiresIn: number,
): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn,
  };

  // ✅ Explicitly pass SignOptions as the 3rd argument
  const token = jwt.sign(payLoad, secret, options);

  return token;
};

export const verifyToken = (token: string, secret: Secret): any => {
  try {
    // ✅ verify returns the decoded payload
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new JwtError("Invalid Token", httpStatus.UNAUTHORIZED);
  }
};
