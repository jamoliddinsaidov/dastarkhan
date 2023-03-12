import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { GeneralHeader } from './components'
import { ForgotPassword, Home, Login, NotFound, SignUp, Browse, WriteReview } from './pages'

export const App = () => {
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
