import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().trim().email(),
  username: z.string().trim().min(3).max(15),
  password: z.string().min(3).max(25),
});
export type SignInInput = z.infer<typeof SigninSchema>;

export const SigninSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(3).max(25),
});
export type SignupInput = z.infer<typeof SignupSchema>;
