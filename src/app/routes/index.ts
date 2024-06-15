import { Router } from 'express'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { FacilityRoutes } from '../modules/Facility/facility.route'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
