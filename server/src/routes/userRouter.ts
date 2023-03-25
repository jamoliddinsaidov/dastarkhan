import { Router } from 'express'
import { getLikedPosts, getLoggedInUserInfo, likePost } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.get('/getLoggedInUserInfo', getLoggedInUserInfo)
userRouter.post('/likePost', likePost)
userRouter.post('/getLikedPosts', getLikedPosts)
