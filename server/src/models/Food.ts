import mongoose from 'mongoose'

const userSubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    defaultValue: null,
  },
})

const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
    trim: true,
  },
  foodPlaceName: {
    type: String,
    required: true,
    trim: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
    trim: true,
  },
  serviceType: {
    type: String,
    required: true,
    trim: true,
  },
  // image: {

  // }
  user: {
    type: userSubSchema,
  },
})

export const Food = mongoose.model('Food', FoodSchema)

export interface FoodRequestBody {
  name: string
  place: string
  review: string
  city: string
  rating: string
  price: number
  foodType: string
  serviceType: string
  user: {
    name: string
    userId?: string
  }
}

export interface FoodFilterOptions {
  rating?: string
  price?: string,
  foodType?: string,
  serviceType?: string,
  reviewed?: string
}