import { useTranslation } from 'react-i18next'

export const useGeneralHeaderLinks = () => {
  const { t } = useTranslation()
  const links = [
    {
      link: 'browse',
      label: t('browse'),
    },
    {
      link: 'writeReview',
      label: t('write_a_review'),
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

  // TODO: update the following when the server is ready
  const isUserLoggedIn = false
  if (isUserLoggedIn) {
    links.length = 2
  }

  return links
}
