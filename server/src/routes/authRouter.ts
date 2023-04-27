import { Router } from 'express'
import { login, register, logout, forgotPassword } from '../controllers/authController.js'

export const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/forgotPassword', forgotPassword)
