import { TFunction } from 'i18next'
import { IconHeart, IconUserHeart, IconMessage, IconStar, IconWriting, IconMailForward } from '@tabler/icons-react'
import { NotificationType } from '../../store/user/userServices'
import { useAppSelector } from '../../store/hooks'
import { getAllFoods } from '../../store/food/foodSelectors'
import { Link } from 'react-router-dom'

export const useNotificationInfoToProcess = (
  type: NotificationType,
  user: {
    name: string
    userId: string
  },
  what: {
    name: string
    whatId: string
    whatValue: string | number
  },
  t: TFunction
) => {
  const foods = useAppSelector(getAllFoods)

  const foodLink = `/browse/food/${what.whatId}`
  const foodName = foods.find((food) => food._id === what.whatId)?.foodName

  const userLink = `/user/${user.userId}`
  const userName = user.name

  switch (type) {
    case 'liked': {
      const title = t('someone_liked_your_review')
      const color = 'pink'
      const icon = <IconHeart size='1rem' />
      const body = (
        <>
          <Link to={userLink}>{userName}</Link> {t('liked_your_review_about')} <Link to={foodLink}>{foodName}</Link>
        </>
      )

      return { title, color, icon, body }
    }
    case 'followed': {
      const title = t('someone_followed_you')
      const color = 'blue'
      const icon = <IconUserHeart size='1rem' />
      const body = (
        <>
          <Link to={userLink}>{userName}</Link> {t('started_following_you')}
        </>
      )
      return { title, color, icon, body }
    }
    case 'commented': {
      const title = t('someone_commented_on_your_review')
      const color = 'indigo'
      const icon = <IconMessage size='1rem' />
      const body = (
        <>
          <Link to={userLink}>{userName}</Link> {t('commented_on_your_review')} <Link to={foodLink}>{foodName}</Link>
        </>
      )
      return { title, color, icon, body }
    }
    case 'posted': {
      const title = t('someone_posted')
      const color = 'lime'
      const icon = <IconWriting />
      const body = ''
      return { title, color, icon, body }
    }
    case 'rated': {
      console.log(what)
      const title = t('someone_rated_your_review')
      const color = 'yellow'
      const icon = <IconStar />
      const body = (
        <>
          <Link to={userLink}>{userName}</Link> {t('rated_your_review', { rating: what.whatValue })}{' '}
          <Link to={foodLink}>{foodName}</Link>
        </>
      )
      return { title, color, icon, body }
    }
    case 'recommended': {
      const title = t('someone_recommended')
      const color = 'grape'
      const icon = <IconMailForward />
      const body = (
        <>
          <Link to={userLink}>{userName}</Link> {t('recommended_you_text')} <Link to={foodLink}>{foodName}</Link>
        </>
      )
      return { title, color, icon, body }
    }
  }
}
