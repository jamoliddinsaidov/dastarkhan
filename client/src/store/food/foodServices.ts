import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { addFoodReviewUrl, getAllFoodReviewsUrl, uploadImageUrl, getFilterFoodsUrl } from '../../api/foodReview'

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
