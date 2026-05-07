import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middleware/errorHandler'
import collegesRouter from './routes/colleges'
import coursesRouter from './routes/courses'
import reviewsRouter from './routes/reviews'
import savedRouter from './routes/saved'
import authRouter from './routes/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Collevo API is running', timestamp: new Date() })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/colleges', collegesRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/saved', savedRouter)

// Error handling
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Collevo API running on port ${PORT}`)
})

export default app
