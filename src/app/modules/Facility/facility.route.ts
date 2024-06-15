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

// router.put(
//   "/:userId",
//   auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
//   validateRequest(UserValidations.updateUserValidations),
//   UserControllers.updateUser
// );

// router.put(
//   "/me",
//   auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
//   validateRequest(UserValidations.updateUserValidations),
//   UserControllers.updateUser
// );

export const FacilityRoutes = router
