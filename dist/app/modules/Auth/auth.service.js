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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config/config"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = require("./auth.utils");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //user existence check
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new Error('User already exists');
    }
    //set user role
    // payload.role = USER_ROLE.admin
    //create user
    const newUser = yield user_model_1.User.create(payload);
    const { _id, name, email, role, phone, address } = newUser;
    return {
        data: {
            _id,
            name,
            email,
            role,
            phone,
            address,
        },
    };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }
    const passwordMatch = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!passwordMatch) {
        throw new Error('Password not matched');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        data: {
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
        },
    };
});
exports.AuthServices = {
    signup,
    login,
};
