"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../User/user.constant");
const signUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'Name is required' }).trim(),
        email: zod_1.z
            .string()
            .email({ message: 'Invalid email format' })
            .min(1, { message: 'Email is required' })
            .trim(),
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
        phone: zod_1.z.string().min(1, { message: 'Phone number is required' }).trim(),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE).default(user_constant_1.USER_ROLE.admin),
        address: zod_1.z.string().min(1, { message: 'Address is required' }).trim(),
    }),
});
const loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: 'Invalid email format' })
            .min(1, { message: 'Email is required' })
            .trim(),
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
});
exports.AuthValidations = {
    signUpSchema,
    loginSchema,
};
