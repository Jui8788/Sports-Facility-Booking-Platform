/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/notFound'
import { BookingControllers } from './app/modules/Booking/booking.controller'

const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'] }))

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/api/check-availability', BookingControllers.checkAvailability)

// notFound handler
app.use(NotFound)

// Global error handler
app.use(globalErrorHandler)

export default app
