import { Title } from '@mantine/core'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Person } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getPeople, getUserInfo } from '../../store/user/userSelectors'
import { IUser, getFollowers } from '../../store/user/userServices'
import { useFriendsStyles } from './Friends.style'

interface FollowersProps {
  activeTab: string
  userDetails?: IUser
}

export const Followers = ({ activeTab, userDetails }: FollowersProps) => {
  const { t } = useTranslation()
  const { classes } = useFriendsStyles()
  const dispatch = useAppDispatch()
  const people = useAppSelector(getPeople)
  const user = useAppSelector(getUserInfo)

  useEffect(() => {
    if (activeTab === 'followers') {
      dispatch(getFollowers(userDetails ? userDetails.email : user.email))
    }
  }, [activeTab])

  return (
    <>
      <Title size='h3' className={classes.titleH3}>
        {!people.length ? t('no_followers') : t('followers')}
      </Title>
      <div className={classes.width50Container}>
        {people.map((person) => (
          <Person key={person._id} activeTab={activeTab} {...person} />
        ))}
      </div>
    </>
  )
}
