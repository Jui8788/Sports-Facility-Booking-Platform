import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/notFound'
import { AuthRoutes } from './app/modules/Auth/auth.route'
import cookieParser from 'cookie-parser'
import router from './app/routes'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'] }))

// application routes
app.use('/api', router)

// globalErrorHandler
app.use(globalErrorHandler)

// Not Found Route
app.use(NotFound)

export default app
