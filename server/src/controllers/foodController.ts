import fs from 'fs'
import cloudinary from 'cloudinary'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { UploadedFile } from 'express-fileupload'
import { asyncWrapper } from '../middlewares/index.js'
import { Food, FoodFilterOptions, FoodRequestBody } from '../models/Food.js'
import { REVIEW_ADDED } from '../utils/constants.js'

export const addFoodReview = asyncWrapper(async (req: Request, res: Response) => {
  const foodReview: FoodRequestBody = req.body
  const food = await Food.create(foodReview)

  res.status(StatusCodes.CREATED).json({ success: true, data: food, message: REVIEW_ADDED })
})

export const getAllFoods = asyncWrapper(async (req: Request, res: Response) => {
  const foods = await Food.find()
  res.status(StatusCodes.OK).json({ success: true, data: foods })
})

export const filterFoods = asyncWrapper(async (req: Request, res: Response) => {
  const query: FoodFilterOptions = req.body
  const filter: FoodFilterOptions = {}

  for (const [k, value] of Object.entries(query)) {
    const key = k as keyof typeof filter
    filter[key] = value
  }

  const filteredFoods = await Food.find(filter)

  res.status(StatusCodes.OK).json({ success: true, data: filteredFoods })
})

export const uploadImage = asyncWrapper(async (req: Request, res: Response) => {
  const cloudinaryV2 = cloudinary.v2
  const image = req.files?.image as UploadedFile
  const imageLocalPath = image?.tempFilePath

  const result = await cloudinaryV2.uploader.upload(imageLocalPath, {
    use_filename: true,
    folder: 'dastarkhan_images',
  })

  fs.unlinkSync(imageLocalPath)

  res.status(StatusCodes.OK).json({ success: true, data: result.secure_url })
})
