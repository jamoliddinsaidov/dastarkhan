import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addFoodReview } from './foodServices'

const initialState = {
  loading: false,
  success: false,
  isAdmin: false,
  foods: [],
  food: {},
  error: '',
}

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFoodReview.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addFoodReview.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(addFoodReview.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

export const foodReducer = foodSlice.reducer
