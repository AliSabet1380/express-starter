import type { Response, Request, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

type Fn<T> = (
  req: Request<ParamsDictionary, any, T, any>,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync =
  <T>(fn: Fn<T>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);
