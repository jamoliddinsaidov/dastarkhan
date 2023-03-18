import { getPathnameWithoutSlash } from './getPathnameWithoutSlash'
import {
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  getUserEmailFromLocalStorage,
  clearUserInfoFromLocalStorage,
} from './localStorage'
import { mapFoodsArrayToComponentProps } from './mapFoodsArrayToComponentProps'
import { shortenString } from './shortenString'
import { cleanUpInputValues } from './cleanUpInputValues'
import { formatPrice } from './formatPrice'

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
}
