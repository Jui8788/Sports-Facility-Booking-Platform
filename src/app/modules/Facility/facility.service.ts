import { TFacility } from './facility.interface'
import { Facility } from './facility.model'

const createFacilityIntoDB = async (payload: TFacility) => {
  const facility = await Facility.create(payload)
  return facility
}

export const FacilityServices = {
  createFacilityIntoDB,
}
