import { createSlice } from '@reduxjs/toolkit'
import {
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  clearUserInfoFromLocalStorage,
} from '../../utils'
import { IFood } from '../food/foodServices'
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUserInfo,
  IUser,
  likePost,
  getLikedPosts,
  getReviewedPosts,
  getAllUsers,
  followToUser,
  getFollowings,
  getFollowers,
  getUserNotifications,
  NotificationProps,
  savePost,
} from './userServices'

const initialState = {
  loading: false,
  success: false,
  isAdmin: false,
  isLoggedIn: getIsUserLoggedInFromLocalStorage(),
  user: {} as IUser,
  error: '',
  userFoods: [] as IFood[],
  people: [] as IUser[],
  notifications: [] as NotificationProps[],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserSuccesStatus: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    // registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.success = false
      state.error = ''
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false
      state.success = true
      state.error = ''
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.success = false
      state.error = ''
    })
    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      const user = action.payload?.data?.data
      setIsUserLoggedInToLocalStorage(user.email)

      state.user = user
      state.loading = false
      state.isLoggedIn = true
      state.success = true
      state.error = ''
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // logoutUser
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true
      state.success = false
      state.error = ''
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false
      state.isLoggedIn = false
      state.user = {} as IUser
      clearUserInfoFromLocalStorage()
      state.error = ''
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // getLoggedInUserInfo
    builder.addCase(getLoggedInUserInfo.pending, (state) => {
      state.loading = true
      state.success = false
      state.error = ''
    })
    builder.addCase(getLoggedInUserInfo.fulfilled, (state, action: any) => {
      state.user = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(getLoggedInUserInfo.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // likePost
    builder.addCase(likePost.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(likePost.fulfilled, (state, action: any) => {
      state.user = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(likePost.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // getLikedPosts
    builder.addCase(getLikedPosts.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getLikedPosts.fulfilled, (state, action: any) => {
      state.userFoods = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(getLikedPosts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // getReviewedPosts
    builder.addCase(getReviewedPosts.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getReviewedPosts.fulfilled, (state, action: any) => {
      state.userFoods = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(getReviewedPosts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // getAllUsers
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getAllUsers.fulfilled, (state, action: any) => {
      state.people = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // followToUser
    builder.addCase(followToUser.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(followToUser.fulfilled, (state, action: any) => {
      state.user = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(followToUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // getFollowings
    builder.addCase(getFollowings.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getFollowings.fulfilled, (state, action: any) => {
      state.people = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(getFollowings.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // getFollowers
    builder.addCase(getFollowers.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getFollowers.fulfilled, (state, action: any) => {
      state.people = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(getFollowers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // getUserNotifications
    builder.addCase(getUserNotifications.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getUserNotifications.fulfilled, (state, action: any) => {
      state.notifications = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(getUserNotifications.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // savePost
    builder.addCase(savePost.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(savePost.fulfilled, (state, action: any) => {
      state.user = action.payload?.data?.data
      state.loading = false
      state.error = ''
    })
    builder.addCase(savePost.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const userReducer = userSlice.reducer
export const { changeUserSuccesStatus } = userSlice.actions
