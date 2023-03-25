import { Router } from 'express'
import { getLikedPosts, getLoggedInUserInfo, getReviewedPosts, likePost } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.get('/getLoggedInUserInfo', getLoggedInUserInfo)
userRouter.post('/likePost', likePost)
userRouter.post('/getLikedPosts', getLikedPosts)
userRouter.get('/getReviewedPosts', getReviewedPosts)
