// import catchAsync from '../utils/catchAsync'
// import AppError from '../errors/AppError'
// import httpStatus from 'http-status'
// import jwt, { JwtPayload } from 'jsonwebtoken'
// import { NextFunction, Request, Response } from 'express'
// import { USER_ROLE } from '../modules/User/user.constant'
// import { User } from '../modules/User/user.model'
// import config from '../config/config'

// const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '')

//     // check if the token is sent from the client
//     if (!token) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
//     }

//     // checking if the given token is valid
//     const decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string
//     ) as JwtPayload

//     const { role, userEmail, iat } = decoded

//     // checking if the user is exist
//     const user = await User.isUserExistsByEmail(userEmail)

//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
//     }
//     // checking if the user is already deleted

//     const isDeleted = user?.isDeleted

//     if (isDeleted) {
//       throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
//     }

//     // checking if the user is blocked
//     const userStatus = user?.status

//     if (userStatus === 'blocked') {
//       throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
//     }

//     if (
//       user.passwordChangedAt &&
//       User.isJWTIssuedBeforePasswordChanged(
//         user.passwordChangedAt,
//         iat as number
//       )
//     ) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
//     }

//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
//     }

//     req.user = decoded as JwtPayload
//     next()
//   })
// }
// export default auth

import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import catchAsync from '../utils/catchAsync'
import config from '../config/config'
import { USER_ROLE } from '../modules/User/user.constant'
import { User } from '../modules/User/user.model'

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.headers.authorization

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

export default auth
