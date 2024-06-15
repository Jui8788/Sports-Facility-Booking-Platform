import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacilityServices } from './facility.service'

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body)

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  })
})

const getAllFacility = catchAsync(async (req, res) => {
  try {
    const result = await FacilityServices.getAllFacilityFromDB()

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Facilities retrieved Successfully',
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

const updateFacility = catchAsync(async (req, res) => {
  try {
    const { id } = req.params
    const result = await FacilityServices.updateFacilityIntoDB(id, req.body)

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facilities updated Successfully',
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

const deleteFacility = catchAsync(async (req, res) => {
  try {
    const { id } = req.params
    const result = await FacilityServices.deleteFacilityFromDB(id)

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facilities Deleted Successfully',
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

export const FacilityControllers = {
  createFacility,
  getAllFacility,
  updateFacility,
  deleteFacility,
}
