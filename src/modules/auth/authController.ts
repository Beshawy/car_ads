import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "./authService";
import { generateToken } from "../../shared/utils/token";

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

  static verifyCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await AuthService.verifyResetCode(req.body);
    res.status(200).json({
      status: "success",
      message: "Reset code is valid",
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

  static logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // In stateless JWT implementations, the actual token deletion happens on the client side.
    // The server just confirms the route hit. The token is checked via authMiddleware.
    res.status(200).json({
      status: "success",
      message: "Logged out successfully. Please remove your token from local storage.",
    });
  });

  static googleCallback = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ status: "fail", message: "Google authentication failed" });
      return;
    }
    
    const user = req.user as any;
    const token = generateToken({ id: user.id, email: user.email });
    const { password, ...userWithoutPassword } = user;

    // Return the token as JSON. The user can copy setting it in Postman.
    res.status(200).json({
      status: "success",
      token,
      data: { user: userWithoutPassword },
    });
  });
}
