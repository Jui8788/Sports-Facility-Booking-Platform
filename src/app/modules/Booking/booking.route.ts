import express from 'express'
import { BookingControllers } from './booking.controller'
import validateRequest from '../../middleware/validateRequest'
import { BookingValidations } from './booking.validation'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()

router.post(
  '/',
  validateRequest(BookingValidations.createBookingValidation),
  auth(USER_ROLE.user),
  BookingControllers.createBooking
)
router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings)
router.get('/:userId', auth(USER_ROLE.user), BookingControllers.getUserBookings)
router.delete('/:id', auth(USER_ROLE.user), BookingControllers.cancelBooking)

export const BookingRoutes = router
