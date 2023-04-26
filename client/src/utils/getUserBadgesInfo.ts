import { TFunction } from 'i18next'
import { IUser } from '../store/user/userServices'

const badgeIds = ['reviews', 'followers', 'followings', 'likedPosts', 'savedPosts']

export const getUserBadgesInfo = (user: IUser, t: TFunction) => {
  const badges: string[] = []

  Object.entries(user).forEach(([key, value]) => {
    if (badgeIds.includes(key) && Array.isArray(value)) {
      badges.push(`${value.length} ${t(key)}`)
    }
  })

  return badges
}
