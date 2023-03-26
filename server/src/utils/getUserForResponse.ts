import { IUser } from '../models/User.js'

export const getUserForResponse = ({
  _id,
  name,
  dateOfBirth,
  gender,
  email,
  likedPosts,
  savedPosts,
  followings,
  followers,
  reviews,
  notifications,
}: IUser) => {
  return {
    _id,
    name,
    dateOfBirth,
    gender,
    email,
    likedPosts,
    savedPosts,
    followings,
    followers,
    reviews,
    notifications,
  }
}
