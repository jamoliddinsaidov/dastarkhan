import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { asyncWrapper } from '../middlewares/index.js'
import { Food, FoodRequestBody } from '../models/Food.js'
import { REVIEW_ADDED } from '../utils/constants.js'

export const addFoodReview = asyncWrapper(async (req: Request, res: Response) => {
  const foodReview: FoodRequestBody = req.body

  const food = await Food.create(foodReview)

  res.status(StatusCodes.CREATED).json({ success: true, data: food, message: REVIEW_ADDED })
})
