import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { asyncWrapper } from '../middlewares/index.js'
import { User } from '../models/User.js'
import { BadRequestError } from '../errors/badRequest.js'
import {
  EMAIL_ALREADY_EXISTS,
  INVALID_CREDENTIALS,
  LOGGED_OUT,
  NO_EMAIL_PASSWORD,
  USER_CREATED,
  USER_LOGGED_IN,
} from '../utils/constants.js'
import { UnauthenticatedError } from '../errors/unauthenticated.js'
import { getUserForResponse } from '../utils/index.js'

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password, name, dateOfBirth, gender } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new BadRequestError(EMAIL_ALREADY_EXISTS)
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await User.create({ email, name, dateOfBirth, gender, password: hashedPassword })

  res.status(StatusCodes.CREATED).json({ success: true, message: USER_CREATED })
})

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError(NO_EMAIL_PASSWORD)
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError(INVALID_CREDENTIALS)
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(INVALID_CREDENTIALS)
  }

  const accessToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '2h' })
  const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1d' })

  await User.findOneAndUpdate({ _id: user._id }, { refreshToken })

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    signed: true,
    sameSite: 'none',
    expires: new Date(Date.now() + 86400000), // 1 day
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    signed: true,
    sameSite: 'none',
    expires: new Date(Date.now() + 259200000), // 3 days
  })

  res.status(StatusCodes.OK).json({ succes: true, message: USER_LOGGED_IN, data: getUserForResponse(user) })
})

export const logout = asyncWrapper(async (req: Request, res: Response) => {
  const { email } = req.body

  await User.findOneAndUpdate({ email }, { refreshToken: null })

  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now()),
  })
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now()),
  })

  res.status(StatusCodes.OK).json({ success: true, message: LOGGED_OUT })
})
