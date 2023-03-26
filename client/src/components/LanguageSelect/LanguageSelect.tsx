import { Select } from '@mantine/core'
import { IconLanguageHiragana } from '@tabler/icons-react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useLanguageSelectStyles } from './LanguageSelect.style'
import {
  availableLanguages,
  languagesShort,
  languagesLong,
  LongLanguagesType,
  ShortLanguagesType,
} from '../../configs/i18next'

interface LanguageSelectProps {
  show?: boolean
  onChangeCallback?: () => void
}

export const LanguageSelect = ({ show, onChangeCallback }: LanguageSelectProps) => {
  const { i18n } = useTranslation()
  const { classes, cx } = useLanguageSelectStyles()

  const onChange = (lng: string) => {
    const selectedLanguage = lng as LongLanguagesType
    i18n.changeLanguage(languagesShort[selectedLanguage])
    onChangeCallback?.()
  }

  const getDefaultLanguageValue = () => {
    const shortLangValue = i18next.resolvedLanguage as ShortLanguagesType
    return languagesLong[shortLangValue]
  }

  return (
    <Select
      defaultValue={getDefaultLanguageValue()}
      data={availableLanguages}
      onChange={onChange}
      icon={<IconLanguageHiragana size='1rem' />}
      className={cx(classes.item, classes.input, { [classes.hideOnMobile]: !show })}
    />
  )
}
