import { apiBaseUrl } from '.'

export const getLoggedInUserInforUrl = new URL('user/getLoggedInUserInfo', apiBaseUrl)
export const likePostUrl = new URL('user/likePost', apiBaseUrl)
