// name: The name of the user.
// email: The contact email address.
// password: The account password (must be hashed).
// phone: The contact phone number.
// role: The role of the user (can be 'admin' or 'user').
// address: The physical address.

import { USER_ROLE } from './user.constant'

export type TUser = {
  name: string
  email: string
  password: string
  phone: string
  role: keyof typeof USER_ROLE
  address: string
}
