import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerUrl, loginUrl, logoutUrl } from '../../api/auth'

export interface UserRequestBody {
  email: string
  dateOfBirth?: Date
  gender?: string
  name?: string
  password: string
}

export const registerUser = createAsyncThunk('user/registerUser', async (user: UserRequestBody) => {
  return await axios.post(registerUrl.href, user)
})

export const loginUser = createAsyncThunk('user/loginUser', async (user: UserRequestBody) => {
  return await axios.post(loginUrl.href, user)
})

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  return await axios.post(logoutUrl.href)
})
