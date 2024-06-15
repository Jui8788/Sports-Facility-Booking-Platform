import { z } from 'zod'
import { USER_ROLE } from './user.constant'

const createUserValidation = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z
      .string()
      .trim()
      .email('Invalid email format')
      .min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    role: z.nativeEnum(USER_ROLE).default(USER_ROLE.admin),
    address: z.string().trim().min(1, 'Address is required'),
  }),
})

export const UserValidations = {
  createUserValidation,
}
