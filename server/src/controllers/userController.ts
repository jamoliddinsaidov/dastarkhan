import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import { asyncWrapper } from '../middlewares/index.js'
import { NO_USER_FOUND, PROVIDE_EMAIL } from '../utils/constants.js'
import { LoggedInUserInfo } from '../models/LoggedInUserInfo.js'
import { IUser, NotificationType, User } from '../models/User.js'
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
    await setLikePostNotification(foodId, user as IUser)
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
  const searchQuery = req.query?.searchQuery
  let filter = {}

  if (searchQuery) {
    filter = { $text: { $search: searchQuery } }
  }

  const users = await User.find(filter).select('_id name reviews followers')

  res.status(StatusCodes.OK).json({ success: true, data: users })
})

export const followToUser = asyncWrapper(async (req: Request, res: Response) => {
  const { userId, followingUserId } = req.body

  // update followingUser's followings list
  const followingUser = await User.findOne({ _id: userId })
  if (!followingUser) {
    throw new BadRequestError(NO_USER_FOUND)
  }

  const followings = [...followingUser.followings]
  if (followings.includes(followingUserId)) {
    const followingUserIndex = followings.findIndex((personId) => personId === followingUserId)
    followings.splice(followingUserIndex, 1)
  } else {
    followings.push(followingUserId)
  }

  followingUser.followings = followings
  await followingUser.save()

  // update followedUser's followers list
  const followedUser = await User.findOne({ _id: followingUserId })!
  if (!followedUser) {
    throw new BadRequestError(NO_USER_FOUND)
  }

  const followers = [...followedUser.followers]
  if (followers.includes(userId)) {
    const followeredUserIndex = followers.findIndex((personId) => personId === userId)
    followers.splice(followeredUserIndex, 1)
  } else {
    followers.push(userId)
  }
  followedUser.followers = followers

  const followedNotification = getFollowedNotification(followingUser.name, String(followingUser._id))
  followedUser.notifications.unshift(followedNotification)

  await followedUser.save()
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

export const getUserNotifications = asyncWrapper(async (req: Request, res: Response) => {
  const { userId } = req.query
  const user = await User.findOne({ _id: userId })

  res.status(StatusCodes.OK).json({ succes: true, data: user?.notifications ?? [] })
})

const setLikePostNotification = async (foodId: string, user: IUser) => {
  try {
    const food = await Food.findOne({ _id: foodId })
    const foodCreatedUserId = food?.user?.userId

    if (foodCreatedUserId) {
      const foodCreatedUser = await User.findOne({ _id: foodCreatedUserId })
      const foodCreatedUserNotifications = foodCreatedUser?.notifications
      const isAlreadyNotified = foodCreatedUserNotifications?.find(
        (notification) => notification.what?.whatId === foodId && String(notification.user?.userId) === String(user._id)
      )
      const isCreatedUserLikeTheirOwnPost = foodCreatedUserId === String(user._id)

      if (!isAlreadyNotified && !isCreatedUserLikeTheirOwnPost) {
        const notification = {
          age: 'new',
          type: NotificationType.LIKED,
          what: {
            name: 'food',
            whatId: foodId,
          },
          user: {
            name: user.name,
            userId: user._id,
          },
        }
        foodCreatedUser?.notifications?.unshift(notification)
        await foodCreatedUser?.save()
      }
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const getFollowedNotification = (followingUserName: string, followingUserId: string) => {
  const notification = {
    age: 'new',
    type: NotificationType.FOLLOWED,
    what: {
      name: 'follower',
      whatId: followingUserId,
    },
    user: {
      name: followingUserName,
      userId: followingUserId,
    },
  }

  return notification
}
