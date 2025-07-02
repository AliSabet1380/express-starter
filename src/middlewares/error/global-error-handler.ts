import type { ErrorRequestHandler } from "express";

import { AppError } from "@utils/errors/app-error";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  console.log(err);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details && { details: err.details }),
    });
    return; // Return void explicitly here
  }

  res.status(500).json({
    success: false,
    message: "خطای سرور رخ داده است. لطفاً بعداً دوباره تلاش کنید.",
  });
};
