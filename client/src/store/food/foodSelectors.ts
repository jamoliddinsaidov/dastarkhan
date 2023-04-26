import { RootState } from '../hooks'
import { IFood } from './foodServices'

export const getFoodReviewIsLoading = (state: RootState) => state.food.loading
export const getFoodState = (state: RootState) => state.food
export const getFoodsAndLoadingState = (state: RootState) => ({
  foods: state.food.foods as IFood[],
  isLoading: state.food.loading,
  success: state.food.success,
  error: state.food.error,
})
export const getIsAddingComment = (state: RootState) => state.food.isAddingComment
export const getIsDeletingComment = (state: RootState) => state.food.isDeletingComment
export const getAllFoods = (state: RootState) => state.food.foods as IFood[]
export const getIsFoodsLoading = (state: RootState) => state.food.loading
