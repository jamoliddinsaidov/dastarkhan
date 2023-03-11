import React from 'react'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { GeneralHeader } from './components/GeneralHeader/GeneralHeader'

export const App = () => {
  return (
    <MantineUiProvider>
      <GeneralHeader />
    </MantineUiProvider>
  )
}
