import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ROUTE_DOESNT_EXIST } from '../utils/constants.js'

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: ROUTE_DOESNT_EXIST })
}
