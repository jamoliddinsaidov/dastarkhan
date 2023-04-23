import { Router } from 'express'
import {
  addFoodReview,
  filterFoods,
  getAllFoods,
  searchFoods,
  uploadImage,
  getFoodById,
  addComment,
  deleteComment,
} from '../controllers/foodController.js'

export const foodRouter = Router()

foodRouter.post('/addFoodReview', addFoodReview)
foodRouter.get('/getAllFoods', getAllFoods)
foodRouter.post('/filterFoods', filterFoods)
foodRouter.post('/uploadImage', uploadImage)
foodRouter.post('/searchFoods', searchFoods)
foodRouter.get('/getFoodById', getFoodById)
foodRouter.post('/addComment', addComment)
foodRouter.delete('/deleteComment', deleteComment)
