/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/notFound'
import { BookingControllers } from './app/modules/Booking/booking.controller'
import path from 'path'

const app: Application = express()

//  parser
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'] }))

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

//  Application Routes
app.use('/api', router)

// Default Home Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Sports Facility Booking Platform !')
})

// Check-Availability Route
app.get('/api/check-availability', BookingControllers.checkAvailability)

//  Global Error Handler
app.use(globalErrorHandler)

// Not Found Route
app.use(NotFound)

export default app
