import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { auth } from '../../middleware/auth'
import { FacilityValidations } from '../Facility/facility.validation'
import { USER_ROLE } from '../User/user.constant'
import { FacilityControllers } from './facility.controller'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility
)
router.get('/', FacilityControllers.getAllFacility)
router.put('/:id', auth(USER_ROLE.admin), FacilityControllers.updateFacility)
router.delete('/:id', auth(USER_ROLE.admin), FacilityControllers.deleteFacility)

export const FacilityRoutes = router
