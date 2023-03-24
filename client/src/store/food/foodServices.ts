import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addFoodReviewUrl,
  getAllFoodReviewsUrl,
  uploadImageUrl,
  getFilterFoodsUrl,
  searchFoodsUrl,
  getFoodReviewByIdUrl,
  addCommentUrl,
} from '../../api/foodReview'

export interface IFood {
  _id?: string
  rating: number
  city: string
  foodName: string
  foodPlaceName: string
  review: string
  price: number
  foodType: string
  serviceType: string
  user: {
    userId: string
    name: string
  }
  image: string
}

export interface FoodFilterOptions {
  rating?: string
  price?: string
  foodType?: string
  serviceType?: string
  reviewed?: string
}

export interface CommentProps {
  foodId: string | undefined
  userId: string
  userName: string
  comment: string
}

export const addFoodReview = createAsyncThunk('food/addFoodReview', async (foodReview: IFood) => {
  return await axios.post(addFoodReviewUrl.href, foodReview)
})

export const uploadImage = createAsyncThunk('food/uploadImage', async (formData: FormData) => {
  return await axios.post(uploadImageUrl.href, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
})

export const getAllFoodReviews = createAsyncThunk('food/getAllFoodReviews', async () => {
  return await axios.get(getAllFoodReviewsUrl.href)
})

export const filterFoods = createAsyncThunk('food/filterFoods', async (query: FoodFilterOptions) => {
  return await axios.post(getFilterFoodsUrl.href, query)
})

export const searchFoods = createAsyncThunk('food/searchFoods', async (searchValue: string) => {
  return await axios.post(searchFoodsUrl.href, { search: searchValue })
})

export const getFoodById = createAsyncThunk('food/getFoodById', async (foodId: string) => {
  return await axios.get(getFoodReviewByIdUrl.href, { params: { foodId } })
})

export const addComment = createAsyncThunk('food/addComment', async (comment: CommentProps) => {
  return await axios.post(addCommentUrl.href, comment)
})
