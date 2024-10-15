import type { Response, Request } from "express";
import { jwtVerify, SignJWT } from "jose";

interface User {
  email: string;
  userId: string;
  username: string;
}

export const createCookie = async (
  res: Response,
  { email, userId, username }: User
): Promise<void> => {
  const secret = new TextEncoder().encode(process.env.JOSE_SECRET!);
  const session = await new SignJWT({ email, userId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.JOSE_EXPIRE!)
    .sign(secret);

  res.cookie("session", session, {
    httpOnly: true,
    sameSite: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
};

export const getCredentials = async (req: Request): Promise<null | User> => {
  const { session } = req.cookies;
  if (!session) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JOSE_SECRET!);
    const decoded = (await jwtVerify(session, secret)).payload as {
      email: string;
      userId: string;
      username: string;
      exp: number;
    };
    if (!decoded) return null;

    const isSessionValid = decoded.exp > Date.now() / 1000;
    if (!isSessionValid) return null;

    return {
      userId: decoded.userId,
      email: decoded.email,
      username: decoded.username,
    };
  } catch (error) {
    return null;
  }
};
