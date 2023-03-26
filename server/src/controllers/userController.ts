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

export const getReviewedPosts = asyncWrapper(async (req: Request, res: Response) => {
  const { userId } = req.query
  const reviewedPosts = await Food.find({ 'user.userId': userId })

  res.status(StatusCodes.OK).json({ success: true, data: reviewedPosts })
})

export const getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
  const users = await User.find({}).select('_id name reviews followers')

  res.status(StatusCodes.OK).json({ success: true, data: users })
})

export const followToUser = asyncWrapper(async (req: Request, res: Response) => {
  const { userId, followingUserId } = req.body

  // update followingUser's followings list
  const followingUser = (await User.findOne({ _id: userId })) as IUser
  const followings = followingUser?.followings

  if (followings?.includes(followingUserId)) {
    const followingUserIndex = followings.findIndex((personId) => personId === followingUserId)
    followings.splice(followingUserIndex, 1)
  } else {
    followings?.push(followingUserId)
  }

  await User.findOneAndUpdate({ _id: followingUser._id }, { followings })

  // update followedUser's followers list
  const followedUser = (await User.findOne({ _id: followingUserId })) as IUser
  const followers = followedUser.followers

  if (followers?.includes(userId)) {
    const followeredUserIndex = followers.findIndex((personId) => personId === userId)
    followers.splice(followeredUserIndex, 1)
  } else {
    followers?.push(userId)
  }

  await User.findOneAndUpdate({ _id: followedUser._id }, { followers })
  await LoggedInUserInfo.findOneAndUpdate({ _id: followedUser._id }, { followers })

  // update the followingUser for response
  const updatedFollowingUser = (await LoggedInUserInfo.findOneAndUpdate(
    { _id: followingUser._id },
    { followings }
  )) as IUser
  updatedFollowingUser.followings = followings

  res.status(StatusCodes.OK).json({ success: true, data: updatedFollowingUser })
})

export const getFollowings = asyncWrapper(async (req: Request, res: Response) => {
  const followingUserIds = req.body
  const followingUsers = await User.find({ _id: { $in: followingUserIds } }).select('_id name reviews followers')

  res.status(StatusCodes.OK).json({ success: true, data: followingUsers })
})

export const getFollowers = asyncWrapper(async (req: Request, res: Response) => {
  const { email } = req.query

  const user = await User.findOne({ email })
  const followerIds = user?.followers

  const followers = await User.find({ _id: { $in: followerIds } }).select('_id name reviews followers')

  res.status(StatusCodes.OK).json({ success: true, data: followers })
})
