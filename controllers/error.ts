import type { Request, Response, NextFunction } from "express";

import { AppError } from "../lib/app-error";

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "something goes wrong";
  err.status = err.status || "error";

  res.status(err.statusCode).json({ status: err.status, error: err.message });
};
