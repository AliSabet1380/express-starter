import express from "express";

import { validateBody } from "../middlewares/validate";

import {
  SigninSchema,
  SignupSchema,
  type SignInInput,
  type SignupInput,
} from "../schema/auth";

import { signin, signup } from "../controllers/auth";

const router = express.Router();

router.post("/sign-up", validateBody<SignupInput>(SignupSchema), signup);
router.post("/sign-in", validateBody<SignInInput>(SigninSchema), signin);

export default router;
