import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { addFoodReviewUrl, uploadImageUrl } from '../../api/foodReview'

export interface IFood {
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
  photo?: File
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
