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
  getUserNotificationsUrl,
  savePostUrl,
  getSavedPostsUrl,
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
  notifications: string[]
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

export type NotificationType = 'liked' | 'posted' | 'commented' | 'followed' | 'rated'
export type NotificationAge = 'new' | 'old'

export interface NotificationProps {
  _id: string
  age: NotificationAge
  type: NotificationType
  user: {
    name: string
    userId: string
  }
  what: {
    name: string
    whatId: string
  }
  createdAt: string
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: UserRequestBody, { rejectWithValue }) => {
    try {
      return await axios.post(registerUrl.href, user)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const loginUser = createAsyncThunk('user/loginUser', async (user: UserRequestBody, { rejectWithValue }) => {
  try {
    return await axios.post(loginUrl.href, user)
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const logoutUser = createAsyncThunk('user/logoutUser', async (userEmail: string, { rejectWithValue }) => {
  try {
    return await axios.post(logoutUrl.href, { email: userEmail })
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const getLoggedInUserInfo = createAsyncThunk(
  'user/getLoggedInUserInfo',
  async (userEmail: string, { rejectWithValue }) => {
    try {
      return await axios.get(getLoggedInUserInforUrl.href, { params: { userEmail } })
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const likePost = createAsyncThunk(
  'user/likePost',
  async (likePostInfo: LikePostInfoProps, { rejectWithValue }) => {
    try {
      return await axios.post(likePostUrl.href, likePostInfo)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getLikedPosts = createAsyncThunk(
  'user/getLikedPosts',
  async (likedPostsId: string[], { rejectWithValue }) => {
    try {
      return await axios.post(getLikedPostsUrl.href, likedPostsId)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getReviewedPosts = createAsyncThunk(
  'user/getReviewedPosts',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await axios.get(getReviewedPostsUrl.href, { params: { userId } })
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (searchQuery: string, { rejectWithValue }) => {
  try {
    return await axios.get(getAllUsersUrl.href, { params: { searchQuery } })
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const followToUser = createAsyncThunk(
  'user/followToUser',
  async (followToUserInfo: FollowToUserProps, { rejectWithValue }) => {
    try {
      return await axios.post(followToUserUrl.href, followToUserInfo)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getFollowings = createAsyncThunk('user/getFollowings', async (userIds: string[], { rejectWithValue }) => {
  try {
    return await axios.post(getFollowingsUrl.href, userIds)
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const getFollowers = createAsyncThunk('user/getFollwers', async (userEmail: string, { rejectWithValue }) => {
  try {
    return await axios.get(getFollowersUrl.href, { params: { email: userEmail } })
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
})

export const getUserNotifications = createAsyncThunk(
  'user/getUserNotifications',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await axios.get(getUserNotificationsUrl.href, { params: { userId } })
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const savePost = createAsyncThunk(
  'user/savePost',
  async (savePostInfo: LikePostInfoProps, { rejectWithValue }) => {
    try {
      return await axios.post(savePostUrl.href, savePostInfo)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getSavedPosts = createAsyncThunk(
  'user/getSavedPosts',
  async (savedPostsId: string[], { rejectWithValue }) => {
    try {
      return await axios.post(getSavedPostsUrl.href, savedPostsId)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
