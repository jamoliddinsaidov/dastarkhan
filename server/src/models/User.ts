import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  refreshToken: {
    type: String,
    defaultValue: null,
  },
  likedPosts: {
    type: Array,
    defaultValue: [],
  },
  savedPosts: {
    type: Array,
    defaultValue: [],
  },
  followings: {
    type: Array,
    defaultValue: [],
  },
  followers: {
    type: Array,
    defaultValue: [],
  },
  reviews: {
    type: Array,
    defaultValue: [],
  },
})

export const User = mongoose.model('User', UserSchema)

export interface IUser {
  name: string
  dateOfBirth: Date
  gender: string
  email: string
  password: string
  likedPosts: string[]
  savedPosts: string[]
  followings: string[]
  followers: string[]
  reviews: string[]
  refreshToken?: string | undefined
}

export interface UserRequestBody {
  email: string
  dateOfBirth?: Date
  gender?: string
  name?: string
  password: string
}
