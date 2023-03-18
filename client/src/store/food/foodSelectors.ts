import { RootState } from '../hooks'
import { IFood } from './foodServices'

export const getFoodReviewIsLoading = (state: RootState) => state.food.loading
export const getIsImageLoading = (state: RootState) => state.food.isUploadingImage
export const getFoodState = (state: RootState) => state.food
export const getFoodsAndLoadingState = (state: RootState) => ({
  foods: state.food.foods as IFood[],
  isLoading: state.food.loading,
})
