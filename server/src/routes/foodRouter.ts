import { Router } from 'express'
import { addFoodReview, filterFoods, getAllFoods, uploadImage } from '../controllers/foodController.js'

export const foodRouter = Router()

foodRouter.post('/addFoodReview', addFoodReview)
foodRouter.get('/getAllFoods', getAllFoods)
foodRouter.post('/filterFoods', filterFoods)
foodRouter.post('/uploadImage', uploadImage)
