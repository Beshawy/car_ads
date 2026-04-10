"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const errorMiddleware_1 = require("./shared/middleware/errorMiddleware");
const authRoutes_1 = __importDefault(require("./modules/auth/authRoutes"));
const passport_1 = __importDefault(require("./shared/config/passport"));
app.use(passport_1.default.initialize());
const swagger_1 = require("./shared/config/swagger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running successfully' });
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpecs));
app.use('/api/v1/auth', authRoutes_1.default);
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;
