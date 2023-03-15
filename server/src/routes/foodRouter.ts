import { Router } from 'express'
import { addFoodReview } from '../controllers/foodController.js'

export const foodRouter = Router()

foodRouter.post('/addFoodReview', addFoodReview)
