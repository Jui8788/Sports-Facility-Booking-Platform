"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidations = void 0;
const zod_1 = require("zod");
// Validation schema for creating a new facility
const createFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'Name is required' }).trim(),
        description: zod_1.z
            .string()
            .min(1, { message: 'Description is required' })
            .trim(),
        pricePerHour: zod_1.z
            .number()
            .min(0, { message: 'Price per hour must be a positive number' }),
        location: zod_1.z.string().min(1, { message: 'Location is required' }).trim(),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
// Validation schema for updating an existing facility
const updateFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'Name is required' }).trim().optional(),
        description: zod_1.z
            .string()
            .min(1, { message: 'Description is required' })
            .trim()
            .optional(),
        pricePerHour: zod_1.z
            .number()
            .min(0, { message: 'Price per hour must be a positive number' })
            .optional(),
        location: zod_1.z
            .string()
            .min(1, { message: 'Location is required' })
            .trim()
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.FacilityValidations = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema,
};
