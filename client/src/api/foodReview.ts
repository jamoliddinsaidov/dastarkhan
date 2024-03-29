import { apiBaseUrl } from '.'

export const addFoodReviewUrl = new URL('food/addFoodReview', apiBaseUrl)
export const uploadImageUrl = new URL('food/uploadImage', apiBaseUrl)
export const getAllFoodReviewsUrl = new URL('food/getAllFoods', apiBaseUrl)
export const getFilterFoodsUrl = new URL('food/filterFoods', apiBaseUrl)
export const searchFoodsUrl = new URL('food/searchFoods', apiBaseUrl)
export const getFoodReviewByIdUrl = new URL('food/getFoodById', apiBaseUrl)
export const addCommentUrl = new URL('food/addComment', apiBaseUrl)
export const deleteCommentUrl = new URL('food/deleteComment', apiBaseUrl)
export const editCommentUrl = new URL('food/editComment', apiBaseUrl)
export const rateFoodUrl = new URL('food/rateFood', apiBaseUrl)
