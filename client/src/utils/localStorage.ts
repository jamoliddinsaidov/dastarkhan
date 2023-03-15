export const getIsUserLoggedInFromLocalStorage = () => {
  return localStorage.getItem('isLoggedIn') === 'true'
}

export const getUserEmailFromLocalStorage = () => {
  return localStorage.getItem('userEmail') ?? ''
}

export const setIsUserLoggedInToLocalStorage = (userEmail: 'string') => {
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userEmail', userEmail)
}

export const clearUserInfoFromLocalStorage = () => {
  localStorage.clear()
}
