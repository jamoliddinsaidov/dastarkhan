import { RootState } from '../hooks'
import { IFood } from './foodServices'

export const getFoodReviewIsLoading = (state: RootState) => state.food.loading
export const getFoodState = (state: RootState) => state.food
export const getFoodsAndLoadingState = (state: RootState) => ({
  foods: state.food.foods as IFood[],
  isLoading: state.food.loading,
  success: state.food.success,
})
