import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import { USER_ROLE } from './user.constant'
import config from '../../config/config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    select: 0,
  },

  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: Object.keys(USER_ROLE),
  },

  phone: { type: String, required: [true, 'Contact number is required'] },

  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
})

userSchema.pre('save', async function (next) {
  const user = this

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )

  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''

  next()
})

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password')
}

// Define a static method to check if the password is correct
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<TUser, UserModel>('User', userSchema)
