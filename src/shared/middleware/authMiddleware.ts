import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { AuthenticatedRequest } from "../../types";

interface JwtPayload {
  id: number;
  email: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized: No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new AppError("JWT secret not defined", 500);

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (err: any) {
    if (err.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }
    next(err);
  }
};