import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import { asyncWrapper } from '../middlewares/index.js'
import { PROVIDE_EMAIL } from '../utils/constants.js'
import { LoggedInUserInfo } from '../models/LoggedInUserInfo.js'
import { IUser, User } from '../models/User.js'
import { Food } from '../models/Food.js'

export const getLoggedInUserInfo = asyncWrapper(async (req: Request, res: Response) => {
  const email = req.query?.userEmail

  if (!email) {
    throw new BadRequestError(PROVIDE_EMAIL)
  }

  const user = await LoggedInUserInfo.findOne({ email })

  res.status(StatusCodes.OK).json({ success: true, data: user })
})

export const likePost = asyncWrapper(async (req: Request, res: Response) => {
  const { userId, foodId } = req.body

  const user = await User.findOne({ _id: userId })
  const likedPosts = user?.likedPosts as string[]

  if (likedPosts?.includes(foodId)) {
    const likedPostIndex = likedPosts.findIndex((post) => post === foodId)
    likedPosts.splice(likedPostIndex, 1)
  } else {
    likedPosts?.push(foodId)
  }

  await User.findOneAndUpdate({ _id: userId }, { likedPosts })
  const updatedUser = (await LoggedInUserInfo.findOneAndUpdate({ _id: userId }, { likedPosts })) as IUser
  updatedUser.likedPosts = likedPosts

  res.status(StatusCodes.OK).json({ success: true, data: updatedUser })
})

export const getLikedPosts = asyncWrapper(async (req: Request, res: Response) => {
  const likedPostIds = req.body
  const likedPosts = await Food.find({ _id: { $in: likedPostIds } })

  res.status(StatusCodes.OK).json({ success: true, data: likedPosts })
})
