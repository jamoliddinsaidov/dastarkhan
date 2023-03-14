import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerUrl } from '../../api/auth'

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
