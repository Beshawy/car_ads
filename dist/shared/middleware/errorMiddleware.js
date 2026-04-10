"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const AppError_1 = require("../errors/AppError");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    // unknown error
    return res.status(500).json({
        status: "error",
        message: "Something went wrong",
    });
};
exports.errorMiddleware = errorMiddleware;
