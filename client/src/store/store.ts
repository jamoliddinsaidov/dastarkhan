import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { activeLinkReducer } from './activeLink/activeLinkSlice'
import { userReducer } from './user/userSlice'
import { foodReducer } from './food/foodSlice'

export const store = configureStore({
  reducer: {
    activeLink: activeLinkReducer,
    user: userReducer,
    food: foodReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
})
