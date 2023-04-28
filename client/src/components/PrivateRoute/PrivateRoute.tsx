import React from 'react'
import { Navigate } from 'react-router-dom'
import { getIsUserLoggedInFromLocalStorage } from '../../utils'

interface PrivateRouteProps {
  children: React.ReactNode
  isLoginRelatedPage?: boolean
}

export const PrivateRoute = ({ children, isLoginRelatedPage = false }: PrivateRouteProps) => {
  const isUserLoggedIn = getIsUserLoggedInFromLocalStorage()

  if (!isUserLoggedIn && isLoginRelatedPage) {
    return <>{children}</>
  }

  if (!isUserLoggedIn) {
    return <Navigate to='/home' />
  }

  return <>{children}</>
}
