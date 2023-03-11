import React from 'react'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { GeneralHeader } from './components/GeneralHeader/GeneralHeader'
import { HeroWithBackground } from './components/HeroWithBackground/HeroWithBackground'

export const App = () => {
  return (
    <MantineUiProvider>
      <GeneralHeader />
      <HeroWithBackground />
    </MantineUiProvider>
  )
}
