import mongoose from 'mongoose'

const LoggedInUserInfoSchema = new mongoose.Schema({
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

export const LoggedInUserInfo = mongoose.model('LoggedInUserInfo', LoggedInUserInfoSchema)
