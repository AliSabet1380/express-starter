import { z } from "zod";
import { type RequestHandler } from "express";
import { type ParamsDictionary } from "express-serve-static-core";

import { AppError } from "../lib/app-error";

export const validateBody: <T>(
  schema: z.Schema<T>
) => RequestHandler<ParamsDictionary, any, T, any, any> =
  (schema) => (req, res, next) => {
    const validateData = schema.safeParse(req.body);
    if (!validateData.success) {
      if (!validateData.success) {
        const errorMessage = `${validateData.error.errors[0].path}: ${validateData.error.errors[0].message}`;
        return next(new AppError(errorMessage, 400));
      }
    }

    next();
  };
