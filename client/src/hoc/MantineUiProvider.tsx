import React from 'react'
import { ColorScheme, ColorSchemeProvider, LoadingOverlay, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

const THEME_KEY = 'mantine-color-scheme'

interface MantineUiProviderProps {
  children: React.ReactNode
}

export const MantineUiProvider = ({ children }: MantineUiProviderProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme, primaryColor: 'orange' }}>
        <React.Suspense fallback={<LoadingOverlay visible overlayBlur={1} loaderProps={{ size: 'xl' }} />}>
          {children}
        </React.Suspense>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
