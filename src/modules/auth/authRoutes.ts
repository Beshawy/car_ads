import { Router } from "express";
import passport from "passport";
import { AuthController } from "./authController";
import { validateMiddleware } from "../../shared/middleware/validateMiddleware";
import { authMiddleware } from "../../shared/middleware/authMiddleware";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyResetCodeSchema } from "./authValidator";

const router = Router();

router.post("/register", validateMiddleware(registerSchema), AuthController.register);
router.post("/login", validateMiddleware(loginSchema), AuthController.login);
router.post("/forgot-password", validateMiddleware(forgotPasswordSchema), AuthController.forgotPassword);
router.post("/verify-code", validateMiddleware(verifyResetCodeSchema), AuthController.verifyCode);
router.post("/reset-password", validateMiddleware(resetPasswordSchema), AuthController.resetPassword);
router.post("/logout", authMiddleware, AuthController.logout);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  AuthController.googleCallback
);

export default router;
