import { getPathnameWithoutSlash } from './getPathnameWithoutSlash'
import {
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  getUserEmailFromLocalStorage,
  clearUserInfoFromLocalStorage,
} from './localStorage'
import { mapFoodsArrayToComponentProps, getFoodType, getServiceType } from './mapFoodsArrayToComponentProps'
import { shortenString } from './shortenString'
import { cleanUpReviewInputValues } from './cleanUpReviewInputValues'
import { formatPrice } from './formatPrice'
import { formatDate } from './formatDate'
import { cleanUpSignUpValues } from './cleanUpSignUpValues'

export {
  getPathnameWithoutSlash,
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  getUserEmailFromLocalStorage,
  clearUserInfoFromLocalStorage,
  mapFoodsArrayToComponentProps,
  shortenString,
  cleanUpReviewInputValues,
  formatPrice,
  getServiceType,
  getFoodType,
  formatDate,
  cleanUpSignUpValues,
}
