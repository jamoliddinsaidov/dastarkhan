export const getPathnameWithoutSlash = (pathname: string) => {
  return pathname.split('/')[1] ?? 'home'
}
