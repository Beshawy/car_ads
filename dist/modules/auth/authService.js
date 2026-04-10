"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const authRepositories_1 = require("./authRepositories");
const AppError_1 = require("../../shared/errors/AppError");
const hash_1 = require("../../shared/utils/hash");
const token_1 = require("../../shared/utils/token");
const emailService_1 = require("../../shared/services/emailService");
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield authRepositories_1.AuthRepository.findUserByEmail(data.email);
            if (existingUser) {
                throw new AppError_1.AppError("Email already in use", 400);
            }
            const hashedPassword = yield (0, hash_1.hashPassword)(data.password);
            const user = yield authRepositories_1.AuthRepository.createUser({
                name: data.name,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
            });
            const token = (0, token_1.generateToken)({ id: user.id, email: user.email });
            // Send Welcome Email
            try {
                const welcomeMessage = `Hello ${user.name},\n\nWelcome to CarAds! Your account has been successfully created.\nWe're thrilled to have you on board. Start browsing and posting your ads today.`;
                yield emailService_1.EmailService.sendEmail(user.email, "Welcome to CarAds!", welcomeMessage);
            }
            catch (err) {
                console.error("Welcome email could not be sent:", err);
                // We don't throw an error here because the user is already successfully registered
            }
            return { user, token };
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield authRepositories_1.AuthRepository.findUserByEmail(data.email);
            if (!user) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
            if (!user.password) {
                throw new AppError_1.AppError("Invalid credentials. If you signed up using Google, please login with Google.", 401);
            }
            const isMatch = yield (0, hash_1.comparePassword)(data.password, user.password);
            if (!isMatch) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
            const token = (0, token_1.generateToken)({ id: user.id, email: user.email });
            return { user, token };
        });
    }
    static forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield authRepositories_1.AuthRepository.findUserByEmail(email);
            if (!user) {
                throw new AppError_1.AppError("There is no user with that email address", 404);
            }
            // Generate a 6-digit code
            const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedResetCode = crypto_1.default.createHash("sha256").update(resetCode).digest("hex");
            const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
            yield authRepositories_1.AuthRepository.updateUser(user.id, {
                passwordResetCode: hashedResetCode,
                passwordResetExpires,
            });
            try {
                const message = `Your password reset code is: ${resetCode}\nThis code is valid for 10 minutes.`;
                yield emailService_1.EmailService.sendEmail(user.email, "Your Password Reset Code", message);
            }
            catch (err) {
                yield authRepositories_1.AuthRepository.updateUser(user.id, {
                    passwordResetCode: null,
                    passwordResetExpires: null,
                });
                throw new AppError_1.AppError("There was an error sending the email. Try again later", 500);
            }
        });
    }
    static verifyResetCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedResetCode = crypto_1.default.createHash("sha256").update(data.code).digest("hex");
            const user = yield authRepositories_1.AuthRepository.findUserByEmailAndResetCode(data.email, hashedResetCode);
            if (!user) {
                throw new AppError_1.AppError("Reset code is invalid or has expired", 400);
            }
            return true;
        });
    }
    static resetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedResetCode = crypto_1.default.createHash("sha256").update(data.code).digest("hex");
            // Find user with matching email and valid unexpired code
            const user = yield authRepositories_1.AuthRepository.findUserByEmailAndResetCode(data.email, hashedResetCode);
            if (!user) {
                throw new AppError_1.AppError("Token is invalid or has expired", 400);
            }
            const hashedPassword = yield (0, hash_1.hashPassword)(data.newPassword);
            // Update password and remove reset tokens
            const updatedUser = yield authRepositories_1.AuthRepository.updateUser(user.id, {
                password: hashedPassword,
                passwordResetCode: null,
                passwordResetExpires: null,
            });
            const token = (0, token_1.generateToken)({ id: updatedUser.id, email: updatedUser.email });
            return { user: updatedUser, token };
        });
    }
}
exports.AuthService = AuthService;
