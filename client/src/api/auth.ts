import { apiBaseUrl } from '.'

export const registerUrl = new URL('auth/register', apiBaseUrl)
export const loginUrl = new URL('auth/login', apiBaseUrl)
export const logoutUrl = new URL('auth/logout', apiBaseUrl)
export const forgotPasswordUrl = new URL('auth/forgotPassword', apiBaseUrl)
