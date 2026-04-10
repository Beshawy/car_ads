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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authService_1 = require("./authService");
const token_1 = require("../../shared/utils/token");
class AuthController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.register = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, token } = yield authService_1.AuthService.register(req.body);
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.status(201).json({
        status: "success",
        token,
        data: { user: userWithoutPassword },
    });
}));
AuthController.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, token } = yield authService_1.AuthService.login(req.body);
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.status(200).json({
        status: "success",
        token,
        data: { user: userWithoutPassword },
    });
}));
AuthController.forgotPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService_1.AuthService.forgotPassword(req.body.email);
    res.status(200).json({
        status: "success",
        message: "Reset code sent to email",
    });
}));
AuthController.verifyCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService_1.AuthService.verifyResetCode(req.body);
    res.status(200).json({
        status: "success",
        message: "Reset code is valid",
    });
}));
AuthController.resetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, token } = yield authService_1.AuthService.resetPassword(req.body);
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    res.status(200).json({
        status: "success",
        token,
        data: { user: userWithoutPassword },
    });
}));
AuthController.logout = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // In stateless JWT implementations, the actual token deletion happens on the client side.
    // The server just confirms the route hit. The token is checked via authMiddleware.
    res.status(200).json({
        status: "success",
        message: "Logged out successfully. Please remove your token from local storage.",
    });
}));
AuthController.googleCallback = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ status: "fail", message: "Google authentication failed" });
        return;
    }
    const user = req.user;
    const token = (0, token_1.generateToken)({ id: user.id, email: user.email });
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    // Return the token as JSON. The user can copy setting it in Postman.
    res.status(200).json({
        status: "success",
        token,
        data: { user: userWithoutPassword },
    });
}));
