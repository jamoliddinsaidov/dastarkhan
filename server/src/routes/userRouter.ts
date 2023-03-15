import { Router } from 'express'
import { getLoggedInUserInfo } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.get('/getLoggedInUserInfo', getLoggedInUserInfo)
