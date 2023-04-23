import { apiBaseUrl } from '.'

export const getLoggedInUserInforUrl = new URL('user/getLoggedInUserInfo', apiBaseUrl)
export const likePostUrl = new URL('user/likePost', apiBaseUrl)
export const getLikedPostsUrl = new URL('user/getLikedPosts', apiBaseUrl)
export const getReviewedPostsUrl = new URL('user/getReviewedPosts', apiBaseUrl)
export const getAllUsersUrl = new URL('user/getAllUsers', apiBaseUrl)
export const followToUserUrl = new URL('user/followToUser', apiBaseUrl)
export const getFollowingsUrl = new URL('user/getFollowings', apiBaseUrl)
export const getFollowersUrl = new URL('user/getFollowers', apiBaseUrl)
export const getUserNotificationsUrl = new URL('user/getUserNotifications', apiBaseUrl)
export const savePostUrl = new URL('user/savePost', apiBaseUrl)
