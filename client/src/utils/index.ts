import { getPathnameWithoutSlash } from './getPathnameWithoutSlash'
import {
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  getUserEmailFromLocalStorage,
  clearUserInfoFromLocalStorage,
} from './localStorage'
import { mapFoodsArrayToComponentProps } from './mapFoodsArrayToComponentProps'
import { shortenString } from './shortenString'

export {
  getPathnameWithoutSlash,
  getIsUserLoggedInFromLocalStorage,
  setIsUserLoggedInToLocalStorage,
  getUserEmailFromLocalStorage,
  clearUserInfoFromLocalStorage,
  mapFoodsArrayToComponentProps,
  shortenString,
}
