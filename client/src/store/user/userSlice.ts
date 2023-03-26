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
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false
      state.success = true
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.error.message ?? ''
    })

    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      const user = action.payload?.data?.data
      setIsUserLoggedInToLocalStorage(user.email)

      state.user = user
      state.loading = false
      state.isLoggedIn = true
      state.success = true
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.error.message ?? ''
    })

    // logoutUser
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false
      state.isLoggedIn = false
      state.user = {} as IUser
      clearUserInfoFromLocalStorage()
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
      state.success = false
    })

    // getLoggedInUserInfo
    builder.addCase(getLoggedInUserInfo.pending, (state) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(getLoggedInUserInfo.fulfilled, (state, action: any) => {
      state.user = action.payload?.data?.data
      state.loading = false
    })
    builder.addCase(getLoggedInUserInfo.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.error.message ?? ''
    })

    // likePost
    builder.addCase(likePost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(likePost.fulfilled, (state, action: any) => {
      state.user = action.payload?.data?.data
      state.loading = false
    })
    builder.addCase(likePost.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })

    // getLikedPosts
    builder.addCase(getLikedPosts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getLikedPosts.fulfilled, (state, action: any) => {
      state.userFoods = action.payload?.data?.data
      state.loading = false
    })
    builder.addCase(getLikedPosts.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })

    // getReviewedPosts
    builder.addCase(getReviewedPosts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getReviewedPosts.fulfilled, (state, action: any) => {
      state.userFoods = action.payload?.data?.data
      state.loading = false
    })
    builder.addCase(getReviewedPosts.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })

    // getAllUsers
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAllUsers.fulfilled, (state, action: any) => {
      state.people = action.payload?.data?.data
      state.loading = false
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })

    // followToUser
    builder.addCase(followToUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(followToUser.fulfilled, (state, action: any) => {
      state.user = action.payload?.data?.data
      state.loading = false
    })
    builder.addCase(followToUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })

    // getFollowings
    builder.addCase(getFollowings.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getFollowings.fulfilled, (state, action: any) => {
      state.people = action.payload?.data?.data
      state.loading = false
    })
    builder.addCase(getFollowings.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })

    // getFollowers
    builder.addCase(getFollowers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getFollowers.fulfilled, (state, action: any) => {
      state.people = action.payload?.data?.data
      state.loading = false
    })
    builder.addCase(getFollowers.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

export const userReducer = userSlice.reducer
export const { changeUserSuccesStatus } = userSlice.actions
