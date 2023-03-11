import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { GeneralHeader } from './components/GeneralHeader/GeneralHeader'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { SignUp } from './pages/SignUp/SignUp'
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword'
import { NotFound } from './pages/NotFound/NotFound'

export const App = () => {
  return (
    <MantineUiProvider>
      <GeneralHeader />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MantineUiProvider>
  )
}
