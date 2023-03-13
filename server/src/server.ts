import express from 'express'
import helmet from 'helmet'
import xss from 'xss-clean'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { rateLimiter, mongoSanitizer, logger, errorHandlerMiddleware, notFoundMiddleware } from './middlewares/index.js'
import { corsOptions, connectDb } from './configs/index.js'
import { DB_CONNECTED, DB_CONNECTION_FAILED, SERVER_IS_CLOSING, SERVER_IS_RUNNING } from './utils/constants.js'
import { authRouter } from './routes/index.js'

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

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDb()
    logger.info(DB_CONNECTED)

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => logger.info(`${SERVER_IS_RUNNING} ${PORT}`))
  } catch (error) {
    logger.error(`${DB_CONNECTION_FAILED} ${error}`)
    logger.warn(SERVER_IS_CLOSING)
    process.exit(-1)
  }
}

start()
