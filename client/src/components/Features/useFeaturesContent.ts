import { IconUserHeart, IconSunrise, IconCompass } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const useFeaturesContent = () => {
  const { t } = useTranslation()

  return [
    {
      title: t('feature_1_title'),
      description: t('feature_1_description'),
      icon: IconCompass,
    },
    {
      title: t('feature_2_title'),
      description: t('feature_2_description'),
      icon: IconUserHeart,
    },
    {
      title: t('feature_3_title'),
      description: t('feature_3_description'),
      icon: IconSunrise,
    },
  ]
}
