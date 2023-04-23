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
  getUserNotifications,
  savePost,
  getSavedPosts,
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
userRouter.get('/getUserNotifications', getUserNotifications)
userRouter.post('/savePost', savePost)
userRouter.post('/getSavedPosts', getSavedPosts)
