import { BookingServices } from './booking.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/AppError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config/config'
import { User } from '../User/user.model'

const checkAvailability = catchAsync(async (req, res) => {
  const date = req.query.date ? new Date(req.query.date as string) : new Date()
  const result = await BookingServices.checkAvailabilityFromDB(
    date.toISOString().split('T')[0]
  )

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  })
})

const createBooking = catchAsync(async (req, res) => {
  // Extract token and verify user
  const tokenWithBearer = req.headers.authorization
  if (!tokenWithBearer) {
    throw new AppError(401, 'Unauthorized users!')
  }

  const token = tokenWithBearer.split(' ')[1]
  const verifiedToken = jwt.verify(token, config.jwt_access_secret as string)
  const { email } = verifiedToken as JwtPayload

  // Find user by email
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError(401, 'User not found')
  }

  // Add user ID to request body
  req.body.user = user._id

  const result = await BookingServices.createBookingIntoDB(req.body)

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  })
})

const getAllBookings = catchAsync(async (req, res) => {
  try {
    const result = await BookingServices.getAllBookingsFromDB()

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
      data: result,
    })
  } catch (error) {
    // send response
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    })
  }
})

const getUserBookings = catchAsync(async (req, res) => {
  try {
    const userId = req.params.userId
    const result = await BookingServices.getUserBookingsFromDB(userId)

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User bookings retrieved successfully',
      data: result,
    })
  } catch (error) {
    // send response
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    })
  }
})

const cancelBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.cancelBookingFromDB(req.params.id)

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking canceled successfully',
    data: result,
  })
})

export const BookingControllers = {
  checkAvailability,
  createBooking,
  getAllBookings,
  getUserBookings,
  cancelBooking,
}
