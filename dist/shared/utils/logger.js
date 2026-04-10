"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.logInfo = void 0;
const logInfo = (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
};
exports.logInfo = logInfo;
const logError = (message) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
};
exports.logError = logError;
