import React from 'react'
import { MantineUiProvider } from './hoc/MantineUiProvider'
import { useTranslation } from 'react-i18next'
import { languages } from './configs/i18next'

export const App = () => {
  const { t, i18n } = useTranslation()
  return (
    <MantineUiProvider>
      <div>
        {Object.entries(languages).map(([lng, value]) => (
          <button key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>
            {value.nativeName}
          </button>
        ))}
      </div>

      <div>{t('greeting')}</div>
    </MantineUiProvider>
  )
}
