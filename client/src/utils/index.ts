import { getPathnameWithoutSlash } from './getPathnameWithoutSlash'
import {
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  getUserEmailFromLocalStorage,
  clearUserInfoFromLocalStorage,
} from './localStorage'
import { mapFoodsArrayToComponentProps, getFoodType, getServiceType } from './mapFoodsArrayToComponentProps'
import { shortenString } from './shortenString'
import { cleanUpInputValues } from './cleanUpInputValues'
import { formatPrice } from './formatPrice'
import { formatDate } from './formatDate'

export {
  getPathnameWithoutSlash,
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  getUserEmailFromLocalStorage,
  clearUserInfoFromLocalStorage,
  mapFoodsArrayToComponentProps,
  shortenString,
  cleanUpInputValues,
  formatPrice,
  getServiceType,
  getFoodType,
  formatDate,
}
