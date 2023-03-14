import { configureStore } from '@reduxjs/toolkit'
import { activeLinkReducer } from './activeLink/activeLinkSlice'
import { userReducer } from './user/userSlice'

export const store = configureStore({
  reducer: {
    activeLink: activeLinkReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
