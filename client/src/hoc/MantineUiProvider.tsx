import React from 'react'
import { MantineProvider } from '@mantine/core'

interface MantineUiProviderProps {
  children: React.ReactNode
}

export const MantineUiProvider = ({ children }: MantineUiProviderProps) => {
  const themeColorScheme = 'light'

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: themeColorScheme }}>
      {children}
    </MantineProvider>
  )
}
