"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpecs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Car Ads API',
            version: '1.0.0',
            description: 'API documentation for the Car Ads platform',
        },
        servers: [
            {
                url: 'http://localhost:7000',
                description: 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    // Path to the API docs (it checks comments in these files)
    apis: ['./src/modules/**/*.ts', './src/app.ts'],
};
exports.swaggerSpecs = (0, swagger_jsdoc_1.default)(options);
