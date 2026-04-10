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
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("./shared/prisma"));
dotenv_1.default.config();
const PORT = process.env.PORT || 7000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // database connection
            yield prisma_1.default.$connect();
            console.log(' Database connection established successfully');
            app_1.default.listen(PORT, () => {
                console.log(` Server is listening on port ${PORT}`);
            });
        }
        catch (error) {
            console.error(' Failed to connect to the database:', error);
            process.exit(1);
        }
    });
}
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION!  Shutting down...');
    console.log(err);
    process.exit(1);
});
startServer();
