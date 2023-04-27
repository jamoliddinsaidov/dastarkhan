import { Router } from 'express'
import { contactUs } from '../controllers/contactController.js'

export const contactRouter = Router()

contactRouter.post('/contactUs', contactUs)
