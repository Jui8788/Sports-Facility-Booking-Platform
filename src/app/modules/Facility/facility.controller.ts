import catchAsync from '../../utils/catchAsync'
import { FacilityServices } from './facility.service'

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body)

  res.status(200).json({
    success: true,
    message: 'Facility added successfully',
    data: result,
  })
})

const getAllFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilityFromDB()

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'All Facilities retrieved Successfully',
    data: result,
  })
})

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: ' Facilities updated Successfully',
    data: result,
  })
})

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacilityServices.deleteFacilityFromDB(id)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: ' Facilities Deleted Successfully',
    data: result,
  })
})

export const FacilityControllers = {
  createFacility,
  getAllFacility,
  updateFacility,
  deleteFacility,
}
