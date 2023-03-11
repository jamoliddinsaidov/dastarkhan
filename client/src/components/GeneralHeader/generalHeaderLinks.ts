import { useTranslation } from 'react-i18next'

export const useGeneralHeaderLinks = () => {
  const { t } = useTranslation()
  const links = [
    {
      link: 'writeReview',
      label: t('write_a_review'),
    },
    {
      link: 'about',
      label: t('about'),
    },
    {
      link: 'login',
      label: t('login'),
    },
    {
      link: 'signup',
      label: t('signup'),
    },
  ]

  return links
}
