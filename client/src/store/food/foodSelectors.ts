import { RootState } from '../hooks'

export const getFoodReviewIsLoading = (state: RootState) => state.food.loading
export const getIsImageLoading = (state: RootState) => state.food.isUploadingImage
export const getFoodState = (state: RootState) => state.food
