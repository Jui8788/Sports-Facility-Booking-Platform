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

export const FacilityControllers = {
  createFacility,
}
