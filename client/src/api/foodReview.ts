import { apiBaseUrl } from '.'

export const addFoodReviewUrl = new URL('food/addFoodReview', apiBaseUrl)
export const uploadImageUrl = new URL('food/uploadImage', apiBaseUrl)
export const getAllFoodReviewsUrl = new URL('food/getAllFoods', apiBaseUrl)
export const getFilterFoodsUrl = new URL('food/filterFoods', apiBaseUrl)
export const searchFoodsUrl = new URL('food/searchFoods', apiBaseUrl)
export const getFoodReviewByIdUrl = new URL('food/getFoodById', apiBaseUrl)
