import { Button, Flex, Paper, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getIsUserLoading, getUserInfo } from '../../store/user/userSelectors'
import { followToUser } from '../../store/user/userServices'
import { usePersonStyles } from './Person.style'
import { Link, useLocation } from 'react-router-dom'

interface PersonProps {
  name: string
  _id: string
  reviews: string[]
  followers: string[]
  activeTab: string
}

export const Person = ({ name, _id: userId, reviews, followers, activeTab }: PersonProps) => {
  const { t } = useTranslation()
  const { classes } = usePersonStyles()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  const isLoading = useAppSelector(getIsUserLoading)
  const currentUser = useAppSelector(getUserInfo)

  const reviewsCount = reviews.length
  const reviewsText = reviewsCount === 1 ? `1 ${t('review_text')}` : `${reviewsCount} ${t('reviews_text')}`

  const followersCount = followers.length
  const followersText = followersCount === 1 ? `1 ${t('follower_text')}` : `${followersCount} ${t('followers_text')}`

  const followText = currentUser.followings.includes(userId) ? t('unfollow') : t('follow')

  const onFollow = () => {
    dispatch(followToUser({ userId: currentUser._id, followingUserId: userId }))
  }

  const isFriendsPage = pathname.includes('friends')
  if (userId === currentUser._id && isFriendsPage) {
    return null
  }

  const isActiveTabFollowers = activeTab === 'followers'
  const isFollowing = currentUser.followings.includes(userId)

  return (
    <Paper withBorder radius='md' className={classes.wrapper}>
      <Flex align='center' justify='space-between'>
        <Flex direction='column'>
          <Link to={`/user/${userId}`} className={classes.userName}>
            {name}
          </Link>
          <Flex>
            <Text size='xs' color='dimmed' mt={4}>
              {reviewsText}
            </Text>
            <Text size='xs' color='dimmed' mt={4} ml={12}>
              {followersText}
            </Text>
          </Flex>
        </Flex>
        {isFriendsPage && (
          <>
            {!isActiveTabFollowers ? (
              <Button variant='outline' px='xl' onClick={onFollow} loading={isLoading}>
                {followText}
              </Button>
            ) : (
              <>
                {isFollowing ? (
                  <Button variant='default' px='xl' className={classes.disabledBtn}>
                    {t('following')}
                  </Button>
                ) : (
                  <Button variant='outline' px='xl' onClick={onFollow} loading={isLoading}>
                    {t('follow_back')}
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </Flex>
    </Paper>
  )
}
