import express from 'express'
import helmet from 'helmet'
import xss from 'xss-clean'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { rateLimiter, mongoSanitizer } from './middlewares/index.js'
import { corsOptions, connectDb } from './configs/index.js'

const app = express()
dotenv.config()

// middlewares
app.use(rateLimiter())
app.use(helmet())
app.use(cors(corsOptions))
app.use(xss())
app.use(mongoSanitizer())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

const start = async () => {
  try {
    await connectDb()
    console.log('Connected to the DB')

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
