import { configureStore } from '@reduxjs/toolkit'
import { activeLinkReducer } from './activeLink/activeLinkSlice'

export const store = configureStore({
  reducer: {
    activeLink: activeLinkReducer,
  },
})
