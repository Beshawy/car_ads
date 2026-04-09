import { AuthRepository } from "./authRepositories";
import { AppError } from "../../shared/errors/AppError";
import { hashPassword, comparePassword } from "../../shared/utils/hash";
import { generateToken } from "../../shared/utils/token";
import { EmailService } from "../../shared/services/emailService";
import crypto from "crypto";

export class AuthService {
  static async register(data: any) {
    const existingUser = await AuthRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await AuthRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
    });

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  }

  static async login(data: any) {
    const user = await AuthRepository.findUserByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  }

  static async forgotPassword(email: string) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError("There is no user with that email address", 404);
    }

    // Generate a 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto.createHash("sha256").update(resetCode).digest("hex");
    
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await AuthRepository.updateUser(user.id, {
      passwordResetCode: hashedResetCode,
      passwordResetExpires,
    });

    try {
      const message = `Your password reset code is: ${resetCode}\nThis code is valid for 10 minutes.`;
      await EmailService.sendEmail(user.email, "Your Password Reset Code", message);
    } catch (err) {
      await AuthRepository.updateUser(user.id, {
        passwordResetCode: null,
        passwordResetExpires: null,
      });
      throw new AppError("There was an error sending the email. Try again later", 500);
    }
  }

  static async resetPassword(data: any) {
    const hashedResetCode = crypto.createHash("sha256").update(data.code).digest("hex");
    
    // Find user with valid and unexpired code
    const user = await AuthRepository.findUserByResetCode(hashedResetCode);
    if (!user) {
      throw new AppError("Token is invalid or has expired", 400);
    }

    const hashedPassword = await hashPassword(data.newPassword);
    
    // Update password and remove reset tokens
    const updatedUser = await AuthRepository.updateUser(user.id, {
      password: hashedPassword,
      passwordResetCode: null,
      passwordResetExpires: null,
    });

    const token = generateToken({ id: updatedUser.id, email: updatedUser.email });
    return { user: updatedUser, token };
  }
}
