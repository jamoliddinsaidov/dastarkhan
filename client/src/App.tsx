import React from 'react'
import { MantineUiProvider } from './hoc/MantineUiProvider'

export const App = () => {
  return (
    <MantineUiProvider>
      <div>Client Application</div>
    </MantineUiProvider>
  )
}
