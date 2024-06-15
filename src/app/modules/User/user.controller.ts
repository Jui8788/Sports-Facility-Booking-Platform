import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body)

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Create Successfully',
    data: result,
  })
})

const getAllUser = catchAsync(async (req, res) => {
  try {
    const result = await UserServices.getAllUserFromDB()

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Retrieve Successfully',
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

export const UserControllers = {
  createUser,
  getAllUser,
}
