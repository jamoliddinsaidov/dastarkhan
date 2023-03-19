import { createSlice } from '@reduxjs/toolkit'
import { addFoodReview, getAllFoodReviews, uploadImage, filterFoods } from './foodServices'

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
    // addFoodReview
    builder.addCase(addFoodReview.pending, (state) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(addFoodReview.fulfilled, (state, action: any) => {
      state.loading = false
      state.success = true
      state.food = action.payload.data.data
      state.uploadedImageUrl = ''
    })
    builder.addCase(addFoodReview.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })

    // uploadImage
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

    // getAllFoodReviews
    builder.addCase(getAllFoodReviews.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAllFoodReviews.fulfilled, (state, action: any) => {
      state.loading = false
      state.foods = action.payload.data.data
    })
    builder.addCase(getAllFoodReviews.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })

    // filterFoods
    builder.addCase(filterFoods.pending, (state) => {
      state.loading = true
    })
    builder.addCase(filterFoods.fulfilled, (state, action: any) => {
      state.loading = false
      state.foods = action.payload.data.data
    })
    builder.addCase(filterFoods.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

export const foodReducer = foodSlice.reducer
