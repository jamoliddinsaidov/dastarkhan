import { Request, Response } from 'express'
import { BadRequestError } from '../errors/index.js'
import { asyncWrapper } from '../middlewares/index.js'
import { PROVIDE_EMAIL } from '../utils/constants.js'
import { LoggedInUserInfo } from '../models/LoggedInUserInfo.js'
import { StatusCodes } from 'http-status-codes'

export const getLoggedInUserInfo = asyncWrapper(async (req: Request, res: Response) => {
  const email = req.query?.userEmail

  if (!email) {
    throw new BadRequestError(PROVIDE_EMAIL)
  }

  const user = await LoggedInUserInfo.findOne({ email })

  res.status(StatusCodes.OK).json({ success: true, data: user })
})
