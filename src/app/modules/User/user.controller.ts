import catchAsync from '../../utils/catchAsync'
import { UserServices } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body)

  res.status(200).json({
    success: true,
    message: 'User Create Successfully',
    data: result,
  })
})

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB()

  res.status(200).json({
    success: true,
    message: 'User Retrieve Successfully',
    data: result,
  })
})

export const UserControllers = {
  createUser,
  getAllUser,
}
