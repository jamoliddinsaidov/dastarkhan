import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '../errors/index.js'
import { SOMETHING_WENT_WRONG } from '../utils/constants.js'
import { logger } from './logger.js'

export const errorHandlerMiddleware = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err?.message || SOMETHING_WENT_WRONG

  logger.error(err)
  return res.status(statusCode).json({ message: message, success: false })
}
