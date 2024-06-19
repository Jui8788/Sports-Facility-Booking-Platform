"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1, 'Name is required'),
        email: zod_1.z
            .string()
            .trim()
            .email('Invalid email format')
            .min(1, 'Email is required'),
        password: zod_1.z.string().min(1, 'Password is required'),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE).default(user_constant_1.USER_ROLE.admin),
        address: zod_1.z.string().trim().min(1, 'Address is required'),
    }),
});
exports.UserValidations = {
    createUserValidation,
};
