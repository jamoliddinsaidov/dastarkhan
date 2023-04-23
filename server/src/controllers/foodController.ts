import fs from 'fs'
import cloudinary from 'cloudinary'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { UploadedFile } from 'express-fileupload'
import { asyncWrapper } from '../middlewares/index.js'
import { CommentProps, Food, FoodFilterOptions, FoodRequestBody, IFood } from '../models/Food.js'
import { REVIEW_ADDED } from '../utils/constants.js'
import { parseRatingFilter } from '../utils/index.js'
import { NotificationType, User } from '../models/User.js'

export const addFoodReview = asyncWrapper(async (req: Request, res: Response) => {
  const foodReview: FoodRequestBody = req.body
  const food = await Food.create(foodReview)

  const userId = foodReview.user?.userId
  if (userId) {
    const user = await User.findOne({ _id: userId })
    user?.reviews?.push(food._id)
    await user?.save()
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

  const food = await Food.findOne({ _id: foodId })
  food?.comments.unshift(newComment)
  await food?.save()
  await setCommentNotification(food as unknown as IFood, foodId, userId, userName)

  res.status(StatusCodes.OK).json({ success: true, data: food })
})

export const deleteComment = asyncWrapper(async (req: Request, res: Response) => {
  const { foodId, commentId } = req.query

  const food = await Food.findOne({ _id: foodId })
  const commentIndex = food?.comments.findIndex((comment) => String(comment._id) === String(commentId))

  if (commentIndex !== undefined) {
    food?.comments.splice(commentIndex, 1)
    await food?.save()
  }

  res.status(StatusCodes.OK).json({ success: true, data: food })
})

export const editComment = asyncWrapper(async (req: Request, res: Response) => {
  const { foodId, commentId, editedComment } = req.body

  const food = await Food.findOne({ _id: foodId })
  const commentIndex = food?.comments.findIndex((comment) => String(comment._id) === String(commentId))

  if (commentIndex !== undefined && food?.comments) {
    food.comments[commentIndex]!.comment = editedComment
    await food?.save()
  }

  res.status(StatusCodes.OK).json({ success: true, data: food })
})

const setCommentNotification = async (
  food: IFood,
  foodId: string,
  commentedUserId: string,
  commentedUserName: string
) => {
  try {
    const foodCreatedUserId = food?.user?.userId

    if (foodCreatedUserId && commentedUserId !== foodCreatedUserId) {
      const notification = {
        age: 'new',
        type: NotificationType.COMMENTED,
        what: {
          name: 'comment',
          whatId: foodId,
        },
        user: {
          name: commentedUserName,
          userId: commentedUserId,
        },
      }

      const foodCreatedUser = await User.findOne({ _id: foodCreatedUserId })
      foodCreatedUser?.notifications?.unshift(notification)
      await foodCreatedUser?.save()
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
