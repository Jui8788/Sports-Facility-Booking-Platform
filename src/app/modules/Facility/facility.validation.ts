import { z } from 'zod'

// Validation schema for creating a new facility
const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).trim(),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .trim(),
    pricePerHour: z
      .number()
      .min(0, { message: 'Price per hour must be a positive number' }),
    location: z.string().min(1, { message: 'Location is required' }).trim(),
    isDeleted: z.boolean().optional().default(false),
  }),
})

// Validation schema for updating an existing facility
const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).trim().optional(),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .trim()
      .optional(),
    pricePerHour: z
      .number()
      .min(0, { message: 'Price per hour must be a positive number' })
      .optional(),
    location: z
      .string()
      .min(1, { message: 'Location is required' })
      .trim()
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
})

export const FacilityValidations = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
}
