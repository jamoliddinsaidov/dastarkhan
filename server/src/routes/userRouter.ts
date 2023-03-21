import { Router } from 'express'
import { getLoggedInUserInfo, likePost } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.get('/getLoggedInUserInfo', getLoggedInUserInfo)
userRouter.post('/likePost', likePost)
