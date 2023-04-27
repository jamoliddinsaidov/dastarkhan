import mongoose from 'mongoose'

export const userSubSchema = new mongoose.Schema({
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

const commentSubSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
  },
  user: userSubSchema,
})
commentSubSchema.set('timestamps', true)

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
  image: {
    type: String,
  },
  user: {
    type: userSubSchema,
  },
  comments: {
    type: [commentSubSchema],
    defaultValue: [],
  },
  likes: {
    type: Array,
    defaultValue: [],
  },
  ratings: {
    type: Array,
    defaultValue: [],
  },
})

FoodSchema.index({ '$**': 'text' })
FoodSchema.set('timestamps', true)

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
  price?: string
  foodType?: string
  serviceType?: string
  reviewed?: string
}

export interface IFood extends FoodRequestBody {
  _id: string
  comments: CommentProps[]
  likes: string[]
}

export interface CommentProps {
  user: {
    name: string
    userId: string | undefined | null
  }
  comment: string
}
