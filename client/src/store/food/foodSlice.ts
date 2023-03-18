import { createSlice } from '@reduxjs/toolkit'
import { addFoodReview, uploadImage } from './foodServices'

const initialState = {
  loading: false,
  success: false,
  isUploadingImage: false,
  uploadedImageUrl: '',
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
    builder.addCase(addFoodReview.fulfilled, (state, action: any) => {
      state.loading = false
      state.success = true
      state.food = action.payload.data.data
      state.uploadedImageUrl = ''

      console.log(action)
    })
    builder.addCase(addFoodReview.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
    builder.addCase(uploadImage.pending, (state) => {
      state.isUploadingImage = true
    })
    builder.addCase(uploadImage.fulfilled, (state, action: any) => {
      state.isUploadingImage = false
      state.uploadedImageUrl = action.payload.data.data
    })
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.isUploadingImage = false
      state.error = action.error.message ?? ''
    })
  },
})

export const foodReducer = foodSlice.reducer
