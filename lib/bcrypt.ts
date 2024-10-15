import { genSalt, compare, hash } from "bcryptjs";

export const createHashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashPassword: string
): Promise<boolean> => await compare(password, hashPassword);
