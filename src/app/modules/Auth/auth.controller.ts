import config from '../../config/config'
import catchAsync from '../../utils/catchAsync'
import { AuthServices } from './auth.service'

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body)

  res.status(200).json({
    success: true,
    message: 'User registered successfully!',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthServices.login(req.body)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  })

  res.status(200).json({
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken,
    },
  })
})

export const AuthControllers = {
  signup,
  login,
}
