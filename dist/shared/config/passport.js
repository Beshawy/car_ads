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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prisma_1 = __importDefault(require("../prisma"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = profile.emails && ((_a = profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value);
        if (!email) {
            return done(new Error('Google account does not have an email address'), undefined);
        }
        // Check if user already exists by googleId
        let user = yield prisma_1.default.user.findUnique({
            where: { googleId: profile.id },
        });
        if (user) {
            return done(null, user);
        }
        // Check if user exists by email
        user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (user) {
            // Link google account to existing user
            user = yield prisma_1.default.user.update({
                where: { id: user.id },
                data: { googleId: profile.id },
            });
            return done(null, user);
        }
        // Create new user if neither googleId nor email matches
        user = yield prisma_1.default.user.create({
            data: {
                name: profile.displayName || 'Google User',
                email: email,
                googleId: profile.id,
                // phone and password can remain null
            },
        });
        return done(null, user);
    }
    catch (error) {
        return done(error, undefined);
    }
})));
exports.default = passport_1.default;
