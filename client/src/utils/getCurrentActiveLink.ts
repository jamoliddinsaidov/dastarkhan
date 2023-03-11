export const getCurrentActiveLink = (pathname: string) => {
  return pathname.split('/')[1] ?? 'home'
}
