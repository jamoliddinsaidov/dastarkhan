import { IUser } from '../store/user/userServices'

export const getIsUserLoggedInFromLocalStorage = () => {
  return localStorage.getItem('isLoggedIn') ?? false
}

export const getUserInfoFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) ?? {}
}

export const setIsUserLoggedInToLocalStorage = (user: IUser) => {
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('user', JSON.stringify(user))
}

export const clearUserInfoFromLocalStorage = () => {
  localStorage.clear()
}
