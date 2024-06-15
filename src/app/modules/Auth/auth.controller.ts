import httpStatus from 'http-status'
import config from '../../config/config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body)

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully!',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body)

  const { accessToken, refreshToken, user } = result

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  })

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    token: accessToken,
    data: user,
  })
})

export const AuthControllers = {
  signup,
  login,
}
