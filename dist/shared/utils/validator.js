"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordStrong = exports.isEmailValid = void 0;
const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
exports.isEmailValid = isEmailValid;
const isPasswordStrong = (password) => {
    return password.length >= 6;
};
exports.isPasswordStrong = isPasswordStrong;
