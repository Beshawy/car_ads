"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.formatDate = void 0;
const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};
exports.formatDate = formatDate;
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
exports.capitalize = capitalize;
