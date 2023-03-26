import { Router } from 'express'
import {
  followToUser,
  getAllUsers,
  getFollowings,
  getLikedPosts,
  getLoggedInUserInfo,
  getReviewedPosts,
  likePost,
  getFollowers,
} from '../controllers/userController.js'

export const userRouter = Router()

userRouter.get('/getLoggedInUserInfo', getLoggedInUserInfo)
userRouter.post('/likePost', likePost)
userRouter.post('/getLikedPosts', getLikedPosts)
userRouter.get('/getReviewedPosts', getReviewedPosts)
userRouter.get('/getAllUsers', getAllUsers)
userRouter.post('/followToUser', followToUser)
userRouter.post('/getFollowings', getFollowings)
userRouter.get('/getFollowers', getFollowers)
