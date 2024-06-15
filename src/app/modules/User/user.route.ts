import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { UserValidations } from './user.validation'
import { UserControllers } from './user.controller'
const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidation),
  UserControllers.createUser
)
router.get('/', UserControllers.getAllUser)

export const UserRoutes = router
