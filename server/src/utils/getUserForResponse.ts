import { IUser } from '../models/User.js'

export const getUserForResponse = ({
  name,
  dateOfBirth,
  gender,
  email,
  likedPosts,
  savedPosts,
  followings,
  followers,
  reviews,
}: IUser) => {
  return {
    name,
    dateOfBirth,
    gender,
    email,
    likedPosts,
    savedPosts,
    followings,
    followers,
    reviews,
  }
}
