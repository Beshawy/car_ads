import { Router } from "express";
import { AuthController } from "./authController";
import { validateMiddleware } from "../../shared/middleware/validateMiddleware";
import { authMiddleware } from "../../shared/middleware/authMiddleware";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "./authValidator";

const router = Router();

router.post("/register", validateMiddleware(registerSchema), AuthController.register);
router.post("/login", validateMiddleware(loginSchema), AuthController.login);
router.post("/forgot-password", validateMiddleware(forgotPasswordSchema), AuthController.forgotPassword);
router.post("/reset-password", validateMiddleware(resetPasswordSchema), AuthController.resetPassword);
router.post("/logout", authMiddleware, AuthController.logout);

export default router;
