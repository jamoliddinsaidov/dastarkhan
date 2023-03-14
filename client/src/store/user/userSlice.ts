import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from './userServices'

const initialState = {
  loading: false,
  user: {},
  error: '',
  success: false,
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
  },
})

export const userReducer = userSlice.reducer
export const { changeUserSuccesStatus } = userSlice.actions
