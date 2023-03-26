import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerUrl, loginUrl, logoutUrl } from '../../api/auth'
import {
  likePostUrl,
  getLoggedInUserInforUrl,
  getLikedPostsUrl,
  getReviewedPostsUrl,
  getAllUsersUrl,
  followToUserUrl,
  getFollowingsUrl,
  getFollowersUrl,
} from '../../api/user'

export interface IUser {
  _id: string
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
}

export interface UserRequestBody {
  email: string
  dateOfBirth?: Date
  gender?: string
  name?: string
  password: string
}

export interface LikePostInfoProps {
  userId: string
  foodId: string
}

export interface FollowToUserProps {
  userId: string
  followingUserId: string
}

export const registerUser = createAsyncThunk('user/registerUser', async (user: UserRequestBody) => {
  return await axios.post(registerUrl.href, user)
})

export const loginUser = createAsyncThunk('user/loginUser', async (user: UserRequestBody) => {
  return await axios.post(loginUrl.href, user)
})

export const logoutUser = createAsyncThunk('user/logoutUser', async (userEmail: string) => {
  return await axios.post(logoutUrl.href, { email: userEmail })
})

export const getLoggedInUserInfo = createAsyncThunk('user/getLoggedInUserInfo', async (userEmail: string) => {
  return await axios.get(getLoggedInUserInforUrl.href, { params: { userEmail } })
})

export const likePost = createAsyncThunk('user/likePost', async (likePostInfo: LikePostInfoProps) => {
  return await axios.post(likePostUrl.href, likePostInfo)
})

export const getLikedPosts = createAsyncThunk('user/getLikedPosts', async (likedPostsId: string[]) => {
  return await axios.post(getLikedPostsUrl.href, likedPostsId)
})

export const getReviewedPosts = createAsyncThunk('user/getReviewedPosts', async (userId: string) => {
  return await axios.get(getReviewedPostsUrl.href, { params: { userId } })
})

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  return await axios.get(getAllUsersUrl.href)
})

export const followToUser = createAsyncThunk('user/followToUser', async (followToUserInfo: FollowToUserProps) => {
  return await axios.post(followToUserUrl.href, followToUserInfo)
})

export const getFollowings = createAsyncThunk('user/getFollowings', async (userIds: string[]) => {
  return await axios.post(getFollowingsUrl.href, userIds)
})

export const getFollowers = createAsyncThunk('user/getFollwers', async (userEmail: string) => {
  return await axios.get(getFollowersUrl.href, { params: { email: userEmail } })
})
