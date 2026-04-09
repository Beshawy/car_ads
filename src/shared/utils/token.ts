import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (payload: object, expiresIn: string = "7d") => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};