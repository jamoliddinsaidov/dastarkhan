import { useEffect } from 'react'
import { Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { Person } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getPeople, getUserInfo } from '../../store/user/userSelectors'
import { getFollowings } from '../../store/user/userServices'
import { useFriendsStyles } from './Friends.style'

interface FollowingsProps {
  activeTab: string
}

export const Followings = ({ activeTab }: FollowingsProps) => {
  const { t } = useTranslation()
  const { classes } = useFriendsStyles()
  const dispatch = useAppDispatch()
  const people = useAppSelector(getPeople)
  const user = useAppSelector(getUserInfo)

  useEffect(() => {
    if (activeTab === 'followings') {
      dispatch(getFollowings(user.followings))
    }
  }, [activeTab])

  return (
    <>
      <Title size='h3' className={classes.titleH3}>
        {!people.length ? t('no_followings') : t('followings')}
      </Title>
      <div className={classes.width50Container}>
        {people.map((person) => (
          <Person key={person._id} activeTab={activeTab} {...person} />
        ))}
      </div>
    </>
  )
}
