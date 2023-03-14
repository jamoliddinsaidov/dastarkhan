import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../store/hooks'
import { getIsUserLoggedIn } from '../../store/user/userSelectors'

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

  const isUserLoggedIn = useAppSelector(getIsUserLoggedIn)
  if (isUserLoggedIn) {
    links.length = 2
  }

  return links
}
