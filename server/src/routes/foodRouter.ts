import { Router } from 'express'
import { addFoodReview, filterFoods, getAllFoods } from '../controllers/foodController.js'

export const foodRouter = Router()

foodRouter.post('/addFoodReview', addFoodReview)
foodRouter.get('/getAllFoods', getAllFoods)
foodRouter.get('/filterFoods', filterFoods)