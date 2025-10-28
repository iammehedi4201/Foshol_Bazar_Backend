import { ZodError } from "zod";
import AppError from "./appError";
import handleDuplicateError from "./handleDuplicateError";
import handleZodError from "./handleZodErrror";
import JwtError from "./jwtError";

interface ErrorWithCode {
  code?: string;
  meta?: {
    target?: string[];
  };
}

export const errorPreprossing = (err: unknown) => {
  if (err instanceof ZodError) {
    return handleZodError(err);
  }

  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as ErrorWithCode).code === "P2002"
  ) {
    return handleDuplicateError(err as ErrorWithCode);
  }

  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      status: "error",
      message: "something went wrong",
      errorDetails: err.message,
      errorSource: null,
    };
  }

  if (err instanceof JwtError) {
    return {
      statusCode: err.statusCode,
      status: "error",
      message: err.message || "Unauthorized Access",
    };
  }

  if (err instanceof Error) {
    return {
      statusCode: 500,
      status: "error",
      message: err.name || "something went wrong",
      errorDetails: err.name ? err.name : err.message,
      errorSource: null,
    };
  }
};
