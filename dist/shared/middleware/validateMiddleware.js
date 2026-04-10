"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = void 0;
const zod_1 = require("zod");
const AppError_1 = require("../errors/AppError");
const validateMiddleware = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const errors = err.errors.map((e) => e.message).join(", ");
            return next(new AppError_1.AppError(`Validation Error: ${errors}`, 400));
        }
        next(err);
    }
};
exports.validateMiddleware = validateMiddleware;
