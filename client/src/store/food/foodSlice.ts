import { createSlice } from '@reduxjs/toolkit'
import {
  addFoodReview,
  getAllFoodReviews,
  uploadImage,
  filterFoods,
  searchFoods,
  getFoodById,
  addComment,
  IFood,
  deleteComment,
} from './foodServices'

const initialState = {
  loading: false,
  success: false,
  isUploadingImage: false,
  isAddingComment: false,
  isDeletingComment: false,
  uploadedImageUrl: '',
  foods: [],
  food: {} as IFood,
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
      state.error = ''
    })
    builder.addCase(addFoodReview.fulfilled, (state, action: any) => {
      state.loading = false
      state.success = true
      state.food = action.payload.data.data
      state.uploadedImageUrl = ''
      state.error = ''
    })
    builder.addCase(addFoodReview.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // uploadImage
    builder.addCase(uploadImage.pending, (state) => {
      state.isUploadingImage = true
      state.success = false
      state.error = ''
    })
    builder.addCase(uploadImage.fulfilled, (state, action: any) => {
      state.isUploadingImage = false
      state.uploadedImageUrl = action.payload.data.data
      state.error = ''
    })
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.isUploadingImage = false
      state.success = false
      state.error = action.payload as string
    })

    // getAllFoodReviews
    builder.addCase(getAllFoodReviews.pending, (state) => {
      state.loading = true
      state.success = false
      state.error = ''
    })
    builder.addCase(getAllFoodReviews.fulfilled, (state, action: any) => {
      state.loading = false
      state.foods = action.payload.data.data
      state.error = ''
    })
    builder.addCase(getAllFoodReviews.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // filterFoods
    builder.addCase(filterFoods.pending, (state) => {
      state.loading = true
      state.success = false
      state.error = ''
    })
    builder.addCase(filterFoods.fulfilled, (state, action: any) => {
      state.loading = false
      state.foods = action.payload.data.data
      state.error = ''
    })
    builder.addCase(filterFoods.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // searchFoods
    builder.addCase(searchFoods.pending, (state) => {
      state.loading = true
      state.success = false
      state.error = ''
    })
    builder.addCase(searchFoods.fulfilled, (state, action: any) => {
      state.loading = false
      state.success = true
      state.foods = action.payload.data.data
      state.error = ''
    })
    builder.addCase(searchFoods.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // getFoodById
    builder.addCase(getFoodById.pending, (state) => {
      state.loading = true
      state.success = false
      state.error = ''
    })
    builder.addCase(getFoodById.fulfilled, (state, action: any) => {
      state.loading = false
      state.food = action.payload.data.data
      state.error = ''
    })
    builder.addCase(getFoodById.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload as string
    })

    // addComment
    builder.addCase(addComment.pending, (state) => {
      state.isAddingComment = true
      state.success = false
      state.error = ''
    })
    builder.addCase(addComment.fulfilled, (state, action: any) => {
      state.isAddingComment = false
      state.food = action.payload.data.data
      state.error = ''
    })
    builder.addCase(addComment.rejected, (state, action) => {
      state.isAddingComment = false
      state.success = false
      state.error = action.payload as string
    })

    // deleteComment
    builder.addCase(deleteComment.pending, (state) => {
      state.isDeletingComment = true
      state.success = false
      state.error = ''
    })
    builder.addCase(deleteComment.fulfilled, (state, action: any) => {
      state.isDeletingComment = false
      state.food = action.payload.data.data
      state.error = ''
    })
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isDeletingComment = false
      state.success = false
      state.error = action.payload as string
    })
  },
})

export const foodReducer = foodSlice.reducer
