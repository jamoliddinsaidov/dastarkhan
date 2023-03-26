import { RootState } from '../hooks'

export const getUser = (state: RootState) => state.user
export const getIsUserLoggedIn = (state: RootState) => state.user.isLoggedIn
export const getUserInfo = (state: RootState) => state.user.user
export const getUserFoods = (state: RootState) => state.user.userFoods
export const getIsUserLoading = (state: RootState) => state.user.loading
export const getPeople = (state: RootState) => state.user.people
export const getNotifications = (state: RootState) => state.user.notifications
export const getUserStateError = (state: RootState) => state.user.error
