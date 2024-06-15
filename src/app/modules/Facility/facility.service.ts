import { TFacility } from './facility.interface'
import { Facility } from './facility.model'

const createFacilityIntoDB = async (payload: TFacility) => {
  const facility = await Facility.create(payload)
  return facility
}

const getAllFacilityFromDB = async () => {
  const result = await Facility.find()
  return result
}

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const { ...updatedFields } = payload
  const result = await Facility.findByIdAndUpdate(id, updatedFields, {
    new: true,
  })
  return result
}

const deleteFacilityFromDB = async (id: string) => {
  const deleteFacilities = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  )

  if (!deleteFacilities) {
    throw new Error('Failed to delete facilities from database')
  }

  return deleteFacilities
}

export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilityFromDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
}
