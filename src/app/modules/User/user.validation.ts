import { z } from 'zod'

const signUpSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).trim(),
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' })
      .trim(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    phone: z.string().min(1, { message: 'Phone number is required' }).trim(),
    role: z.enum(['admin', 'user']),
    address: z.string().min(1, { message: 'Address is required' }).trim(),
  }),
})

const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' })
      .trim(),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
})

export const UserValidations = {
  signUpSchema,
  loginSchema,
}
