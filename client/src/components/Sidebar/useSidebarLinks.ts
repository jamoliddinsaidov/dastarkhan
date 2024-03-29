import { IconBellRinging, IconSettings, IconHeart, IconBookmark, IconUserHeart, IconWriting } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const useSidebarLinks = () => {
  const { t } = useTranslation()

  const navigations = [
    { link: 'notifications', label: t('notifications'), icon: IconBellRinging },
    { link: 'likedPosts', label: t('liked_posts'), icon: IconHeart },
    { link: 'savedPosts', label: t('saved_posts'), icon: IconBookmark },
    { link: 'friends', label: t('friends'), icon: IconUserHeart },
    { link: 'reviews', label: t('reviews'), icon: IconWriting },
    { link: 'settings', label: t('settings'), icon: IconSettings },
  ]

  return navigations
}
