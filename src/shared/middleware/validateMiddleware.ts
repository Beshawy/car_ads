import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { AppError } from "../errors/AppError";

export const validateMiddleware =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = (err as any).errors.map((e: any) => e.message).join(", ");
        return next(new AppError(`Validation Error: ${errors}`, 400));
      }
      next(err);
    }
  };