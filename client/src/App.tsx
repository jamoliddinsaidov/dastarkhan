import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { GeneralHeader } from './components/GeneralHeader/GeneralHeader'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { SignUp } from './pages/SignUp/SignUp'

export const App = () => {
  return (
    <MantineUiProvider>
      <GeneralHeader />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Navigate to='/home' />} />
      </Routes>
    </MantineUiProvider>
  )
}
