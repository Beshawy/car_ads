"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../errors/AppError");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError_1.AppError("Unauthorized: No token provided", 401);
        }
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new AppError_1.AppError("JWT secret not defined", 500);
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    }
    catch (err) {
        if (err.name === "JsonWebTokenError") {
            return next(new AppError_1.AppError("Invalid token", 401));
        }
        next(err);
    }
};
exports.authMiddleware = authMiddleware;
