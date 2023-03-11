import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { GeneralHeader } from './components/GeneralHeader/GeneralHeader'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'

export const App = () => {
  return (
    <MantineUiProvider>
      <GeneralHeader />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Navigate to='/home' />} />
      </Routes>
    </MantineUiProvider>
  )
}
