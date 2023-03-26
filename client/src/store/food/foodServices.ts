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

export interface IReview {
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

export interface IFood extends IReview {
  _id?: string
  comments: Comment[]
  likes: string[]
}

export interface Comment {
  _id: string
  createdAt: string
  comment: string
  user: {
    name: string
    userId: string | null
  }
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

export const addFoodReview = createAsyncThunk(
  'food/addFoodReview',
  async (foodReview: IReview, { rejectWithValue }) => {
    try {
      return await axios.post(addFoodReviewUrl.href, foodReview)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const uploadImage = createAsyncThunk('food/uploadImage', async (formData: FormData, { rejectWithValue }) => {
  try {
    return await axios.post(uploadImageUrl.href, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const getAllFoodReviews = createAsyncThunk('food/getAllFoodReviews', async (_, { rejectWithValue }) => {
  try {
    return await axios.get(getAllFoodReviewsUrl.href)
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const filterFoods = createAsyncThunk(
  'food/filterFoods',
  async (query: FoodFilterOptions, { rejectWithValue }) => {
    try {
      return await axios.post(getFilterFoodsUrl.href, query)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const searchFoods = createAsyncThunk('food/searchFoods', async (searchValue: string, { rejectWithValue }) => {
  try {
    return await axios.post(searchFoodsUrl.href, { search: searchValue })
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const getFoodById = createAsyncThunk('food/getFoodById', async (foodId: string, { rejectWithValue }) => {
  try {
    return await axios.get(getFoodReviewByIdUrl.href, { params: { foodId } })
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const addComment = createAsyncThunk('food/addComment', async (comment: CommentProps, { rejectWithValue }) => {
  try {
    return await axios.post(addCommentUrl.href, comment)
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})
