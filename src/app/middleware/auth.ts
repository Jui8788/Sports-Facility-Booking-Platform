import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import catchAsync from '../utils/catchAsync'
import config from '../config/config'
import { User } from '../modules/User/user.model'
import { TUserRole } from '../modules/User/user.interface'

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '')

    if (!accessToken) {
      throw new AppError(401, 'You are not authorized to access this route')
    }

    const verifiedToken = jwt.verify(
      accessToken as string,
      config.jwt_access_secret as string
    )

    const { role, email } = verifiedToken as JwtPayload

    const user = await User.findOne({ email })

    if (!user) {
      throw new AppError(401, 'User not found')
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized to access this route')
    }

    next()
  })
}
