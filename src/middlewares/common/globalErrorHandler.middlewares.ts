/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorPreprossing } from "@/helper/errorHelper/errorPreprossing";
import { ErrorRequestHandler } from "express";

export type TErrorSource = {
  path: string[] | string;
  message: string;
}[];

export type TErrorResponse = {
  statusCode: number;
  status: "error";
  message: string;
  errorDetails: string;
  errorSource: TErrorSource | null;
  stack?: string | undefined;
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // Default error response
  let errorResponse: TErrorResponse = {
    statusCode: (err as any)?.statusCode || 500,
    status: "error",
    message: (err as any)?.message || "something went wrong",
    errorDetails: (err as any)?.message || "something went wrong",
    errorSource: [
      {
        path: [],
        message: "something went wrong",
      },
    ],
    stack: (err as any)?.stack,
  };

  // Error preprocessing
  const processedError = errorPreprossing(err);
  if (processedError) {
    errorResponse = {
      ...errorResponse,
      ...processedError,
      stack: (err as any)?.stack,
    };
  }

  return res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    message: errorResponse.message,
    errorDetails: errorResponse.errorDetails,
    errorSource: errorResponse.errorSource,
    stack:
      process.env.NODE_ENV === "production" ? undefined : errorResponse.stack,
  });
};
