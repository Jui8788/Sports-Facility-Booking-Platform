// name: The name of the user.
// email: The contact email address.
// password: The account password (must be hashed).
// phone: The contact phone number.
// role: The role of the user (can be 'admin' or 'user').
// address: The physical address.

import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  name: string
  email: string
  password: string
  phone: string
  role: keyof typeof USER_ROLE
  address: string
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
