export const getIsUserLoggedInFromLocalStorage = () => {
  return localStorage.getItem('isLoggedIn') ?? false
}

export const setIsUserLoggedInToLocalStorage = () => {
  localStorage.setItem('isLoggedIn', 'true')
}
