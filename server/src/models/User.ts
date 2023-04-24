import mongoose, { Types } from 'mongoose'
import { userSubSchema } from './Food.js'

export enum NotificationType {
  LIKED = 'liked',
  POSTED = 'posted',
  COMMENTED = 'commented',
  FOLLOWED = 'followed',
  RATED = 'rated',
  RECOMMENDED = 'recommended',
}
export type NotificationAge = 'new' | 'old'

export const notificationWhatSubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  whatId: {
    type: String,
    required: true,
  },
})

export const notificationSubSchema = new mongoose.Schema({
  age: {
    type: String,
    defaultValue: 'new',
  },
  type: {
    type: String,
    required: true,
  },
  what: notificationWhatSubSchema,
  user: userSubSchema,
})

notificationSubSchema.set('timestamps', true)

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
  notifications: {
    type: [notificationSubSchema],
    defaultValue: [],
  },
})

UserSchema.index({ '$**': 'text' })
UserSchema.set('timestamps', true)

export const User = mongoose.model('User', UserSchema)

export interface IUser {
  _id: Types.ObjectId
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
  notifications: any[]
  refreshToken?: string | undefined
}

export interface UserRequestBody {
  email: string
  dateOfBirth?: Date
  gender?: string
  name?: string
  password: string
}
