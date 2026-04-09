import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "./authService";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user, token } = await AuthService.register(req.body);
    const { password, ...userWithoutPassword } = user;
    
    res.status(201).json({
      status: "success",
      token,
      data: { user: userWithoutPassword },
    });
  });

  static login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user, token } = await AuthService.login(req.body);
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      status: "success",
      token,
      data: { user: userWithoutPassword },
    });
  });

  static forgotPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await AuthService.forgotPassword(req.body.email);
    res.status(200).json({
      status: "success",
      message: "Reset code sent to email",
    });
  });

  static resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user, token } = await AuthService.resetPassword(req.body);
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      status: "success",
      token,
      data: { user: userWithoutPassword },
    });
  });
}
