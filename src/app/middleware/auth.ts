import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import catchAsync from '../utils/catchAsync'
import config from '../config/config'
import { User } from '../modules/User/user.model'
import { TUserRole } from '../modules/User/user.interface'

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '')
    console.log(accessToken)

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

// export const auth = (...requiredRoles: TUserRole[]) => {
//   return catchAsync(async (req, res, next) => {
//     const tokenWithBearer = req.headers.authorization

//     if (!tokenWithBearer) {
//       throw new AppError(401, 'You are not authorized!')
//     }
//     if (tokenWithBearer) {
//       const token = tokenWithBearer.split(' ')[1]
//       console.log('after cut bearer', token)

//       if (!token) {
//         throw new AppError(401, 'You are not authorized!')
//       }

//       const verifiedToken = jwt.verify(
//         token as string,
//         config.jwt_access_secret as string
//       )
//       console.log(verifiedToken)

//       const { role, email } = verifiedToken as JwtPayload

//       // check user exist in database or not

//       const user = await User.findOne({ email })
//       if (!user) {
//         throw new AppError(404, 'User not found!')
//       }
//       console.log('required roles', requiredRoles)
//       console.log('roles', role)
//       // console.log(requiredRoles.includes(role))
//       // console.log(!requiredRoles.includes(role))

//       if (requiredRoles && !requiredRoles.includes(role)) {
//         throw new AppError(401, 'You are not authorized!')
//       }
//     }
//     next()
//   })
// }
