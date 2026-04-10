import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirm: z.string(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const verifyResetCodeSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(1, "Reset code is required"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(1, "Reset code is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirm: z.string(),
}).refine((data) => data.newPassword === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});
