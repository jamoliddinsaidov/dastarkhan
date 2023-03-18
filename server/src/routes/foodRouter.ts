import { Router } from 'express'
import bodyParser from 'body-parser'
import { addFoodReview, filterFoods, getAllFoods, uploadImage } from '../controllers/foodController.js'

export const foodRouter = Router()

foodRouter.post('/addFoodReview', addFoodReview)
foodRouter.get('/getAllFoods', getAllFoods)
foodRouter.get('/filterFoods', filterFoods)
foodRouter.post('/uploadImage', uploadImage)
