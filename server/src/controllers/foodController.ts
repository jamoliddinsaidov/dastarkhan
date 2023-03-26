import fs from 'fs'
import cloudinary from 'cloudinary'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { UploadedFile } from 'express-fileupload'
import { asyncWrapper } from '../middlewares/index.js'
import { CommentProps, Food, FoodFilterOptions, FoodRequestBody, IFood } from '../models/Food.js'
import { REVIEW_ADDED } from '../utils/constants.js'
import { parseRatingFilter } from '../utils/index.js'
import { User } from '../models/User.js'

export const addFoodReview = asyncWrapper(async (req: Request, res: Response) => {
  const foodReview: FoodRequestBody = req.body
  const food = await Food.create(foodReview)

  const userId = foodReview.user?.userId
  if (userId) {
    const user = await User.findOne({ _id: userId })
    const userReviews = user?.reviews
    userReviews?.push(food._id)
    await User.findOneAndUpdate({ _id: userId }, { reviews: userReviews })
  }

  res.status(StatusCodes.CREATED).json({ success: true, data: food, message: REVIEW_ADDED })
})

export const getAllFoods = asyncWrapper(async (req: Request, res: Response) => {
  const foods = await Food.find()
  res.status(StatusCodes.OK).json({ success: true, data: foods })
})

export const filterFoods = asyncWrapper(async (req: Request, res: Response) => {
  const query: FoodFilterOptions = req.body

  const queryForDb: FoodFilterOptions = {}
  const queryForDbFilterKeys = ['foodType', 'serviceType']

  for (const [k, value] of Object.entries(query)) {
    const key = k as keyof typeof queryForDb
    if (value && queryForDbFilterKeys.includes(key)) {
      queryForDb[key] = value
    }
  }

  let filteredFoods = await Food.find(queryForDb)

  const customFilters: FoodFilterOptions = {}
  const customFilterKeys = ['rating', 'price', 'reviewed']

  for (const [k, value] of Object.entries(query)) {
    const key = k as keyof typeof customFilters
    if (value && customFilterKeys.includes(key)) {
      customFilters[key] = value
    }
  }

  if (customFilters?.rating) {
    filteredFoods = filteredFoods
      .filter((food) => {
        const foodRating = Number(food.rating)
        const filterRating = parseRatingFilter(customFilters.rating!)
        return foodRating <= filterRating && foodRating >= filterRating - 1
      })
      .sort((a, b) => Number(b.rating) - Number(a.rating))
  }

  if (customFilters?.price) {
    const cheapToExpensive = 'cheap_to_expensive'
    filteredFoods = filteredFoods.sort((a, b) => {
      if (customFilters.price === cheapToExpensive) {
        return a.price - b.price
      }

      return b.price - a.price
    })
  }

  res.status(StatusCodes.OK).json({ success: true, data: filteredFoods })
})

export const searchFoods = asyncWrapper(async (req: Request, res: Response) => {
  const searchValue = req.body.search

  const searchedFoods = await Food.find({ $text: { $search: searchValue } })

  res.status(StatusCodes.OK).json({ success: true, data: searchedFoods })
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

export const getFoodById = asyncWrapper(async (req: Request, res: Response) => {
  const { foodId } = req.query
  const food = await Food.find({ _id: foodId })
  res.status(StatusCodes.OK).json({ success: true, data: food?.[0] })
})

export const addComment = asyncWrapper(async (req: Request, res: Response) => {
  const { foodId, userId, userName, comment } = req.body
  const newComment: CommentProps = {
    user: {
      name: userName,
      userId,
    },
    comment,
  }

  const food = (await Food.findOne({ _id: foodId })) as IFood

  const comments = food.comments
  comments.push(newComment)

  const updatedFood = (await Food.findOneAndUpdate({ _id: foodId }, { comments })) as IFood
  updatedFood.comments = comments

  res.status(StatusCodes.OK).json({ success: true, data: updatedFood })
})
