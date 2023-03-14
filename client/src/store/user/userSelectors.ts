import { RootState } from '../hooks'

export const getUser = (state: RootState) => state.user
export const getIsUserLoggedIn = (state: RootState) => state.user.isLoggedIn
export const getUserInfo = (state: RootState) => state.user.user
