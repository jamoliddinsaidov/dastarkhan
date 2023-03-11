import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  activeLink: string
}

const initialState: InitialState = {
  activeLink: 'home',
}

const activeLinkSlice = createSlice({
  name: 'activeLink',
  initialState,
  reducers: {
    changeLink: (state, action: PayloadAction<string>) => {
      state.activeLink = action.payload
    },
  },
})

export const activeLinkReducer = activeLinkSlice.reducer
export const { changeLink } = activeLinkSlice.actions
