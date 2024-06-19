import { Router } from 'express'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { FacilityRoutes } from '../modules/Facility/facility.route'
import { BookingRoutes } from '../modules/Booking/booking.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/facility',
    route: FacilityRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/bookings',
    route: BookingRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
