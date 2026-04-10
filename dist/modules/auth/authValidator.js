"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.verifyResetCodeSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: zod_1.z.string(),
    phone: zod_1.z.string().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
});
exports.verifyResetCodeSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    code: zod_1.z.string().min(1, "Reset code is required"),
});
exports.resetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    code: zod_1.z.string().min(1, "Reset code is required"),
    newPassword: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: zod_1.z.string(),
}).refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
});
