import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { GeneralHeader } from './components'
import {
  ForgotPassword,
  Home,
  Login,
  NotFound,
  SignUp,
  Browse,
  WriteReview,
  FoodDetails,
  Profile,
  Friends,
  UserDetails,
} from './pages'
import { LikedPosts, SavedPosts, Settings, Notifications, Reviews } from './pages/Profile/subPages'
import { getIsUserLoggedInFromLocalStorage, getUserEmailFromLocalStorage } from './utils'
import { getLoggedInUserInfo } from './store/user/userServices'
import { useAppDispatch } from './store/hooks'
import { getAllFoodReviews } from './store/food/foodServices'

export const App = () => {
  const dispatch = useAppDispatch()
  const isUserLoggedIn = getIsUserLoggedInFromLocalStorage()

  useEffect(() => {
    dispatch(getAllFoodReviews())
  }, [])

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
        <Route path='/browse/food/:foodId' element={<FoodDetails />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/writeReview' element={<WriteReview />} />
        <Route path='/user/profile' element={<Profile />}>
          <Route path='likedPosts' element={<LikedPosts />} />
          <Route path='savedPosts' element={<SavedPosts />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='friends' element={<Friends />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='/user/:userId' element={<UserDetails />} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MantineUiProvider>
  )
}
