"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("./authController");
const validateMiddleware_1 = require("../../shared/middleware/validateMiddleware");
const authMiddleware_1 = require("../../shared/middleware/authMiddleware");
const authValidator_1 = require("./authValidator");
const router = (0, express_1.Router)();
router.post("/register", (0, validateMiddleware_1.validateMiddleware)(authValidator_1.registerSchema), authController_1.AuthController.register);
router.post("/login", (0, validateMiddleware_1.validateMiddleware)(authValidator_1.loginSchema), authController_1.AuthController.login);
router.post("/forgot-password", (0, validateMiddleware_1.validateMiddleware)(authValidator_1.forgotPasswordSchema), authController_1.AuthController.forgotPassword);
router.post("/verify-code", (0, validateMiddleware_1.validateMiddleware)(authValidator_1.verifyResetCodeSchema), authController_1.AuthController.verifyCode);
router.post("/reset-password", (0, validateMiddleware_1.validateMiddleware)(authValidator_1.resetPasswordSchema), authController_1.AuthController.resetPassword);
router.post("/logout", authMiddleware_1.authMiddleware, authController_1.AuthController.logout);
// Google OAuth routes
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { session: false }), authController_1.AuthController.googleCallback);
exports.default = router;
