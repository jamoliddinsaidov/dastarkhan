import { createSlice } from '@reduxjs/toolkit'
import {
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  clearUserInfoFromLocalStorage,
  getUserInfoFromLocalStorage,
} from '../../utils'
import { registerUser, loginUser, logoutUser, IUser } from './userServices'

const initialState = {
  loading: false,
  success: false,
  isAdmin: false,
  isLoggedIn: getIsUserLoggedInFromLocalStorage(),
  user: getUserInfoFromLocalStorage() as IUser,
  error: '',
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
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false
      state.success = true
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      const user = action.payload?.data?.data
      setIsUserLoggedInToLocalStorage(user)

      state.user = user
      state.loading = false
      state.isLoggedIn = true
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false
      state.isLoggedIn = false
      clearUserInfoFromLocalStorage()
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

export const userReducer = userSlice.reducer
export const { changeUserSuccesStatus } = userSlice.actions
