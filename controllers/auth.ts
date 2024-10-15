import { eq } from "drizzle-orm";

import { db } from "../db/db";

import { users } from "../models/schema";

import { AppError } from "../lib/app-error";
import { createCookie } from "../lib/cookie";
import { catchAsync } from "../lib/catch-async";
import { comparePasswords, createHashPassword } from "../lib/bcrypt";

import type { SignupInput, SignInInput } from "../schema/auth";

export const signup = catchAsync<SignupInput>(async (req, res, next) => {
  const { email, password, username } = req.body;
  const hashPassword = await createHashPassword(password);

  const [user] = await db
    .insert(users)
    .values({
      email,
      username,
      password: hashPassword,
    })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      avatar: users.avatar,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  await createCookie(res, {
    email: user.email,
    userId: user.id,
    username: user.username,
  });

  res.status(200).json({ status: "success", data: user });
});

export const signin = catchAsync<SignInInput>(async (req, res, next) => {
  const { email, password } = req.body;

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) return next(new AppError("email or password is wrong", 404));

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid)
    return next(new AppError("email or password is wrong", 401));

  await createCookie(res, {
    email: user.email,
    userId: user.id,
    username: user.username,
  });

  res
    .status(200)
    .json({ status: "success", data: { ...user, password: undefined } });
});
