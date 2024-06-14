import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/notFound'
import { AuthRoutes } from './app/modules/Auth/auth.route'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/auth', AuthRoutes)

// globalErrorHandler
app.use(globalErrorHandler)

// Not Found Route
app.use(NotFound)

export default app
