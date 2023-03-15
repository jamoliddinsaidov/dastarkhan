import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { GeneralHeader } from './components'
import { ForgotPassword, Home, Login, NotFound, SignUp, Browse, WriteReview } from './pages'
import { useAppDispatch } from './store/hooks'
import { getIsUserLoggedInFromLocalStorage, getUserEmailFromLocalStorage } from './utils'
import { getLoggedInUserInfo } from './store/user/userServices'

export const App = () => {
  const dispatch = useAppDispatch()
  const isUserLoggedIn = getIsUserLoggedInFromLocalStorage()

  useEffect(() => {
    if (isUserLoggedIn) {
      const userEmail = getUserEmailFromLocalStorage()
      dispatch(getLoggedInUserInfo(userEmail))
    }
  }, [isUserLoggedIn])

  return (
    <MantineUiProvider>
      <GeneralHeader />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/writeReview' element={<WriteReview />} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MantineUiProvider>
  )
}
