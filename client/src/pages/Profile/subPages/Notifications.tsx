import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Title } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getUserNotifications } from '../../../store/user/userServices'
import { getNotifications, getUserInfo } from '../../../store/user/userSelectors'
import { CustomNotification } from '../../../components'
import { useSubPagesStyles } from './SubPages.style'

export const Notifications = () => {
  const { t } = useTranslation()
  const { classes } = useSubPagesStyles()
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUserInfo)
  const notifications = useAppSelector(getNotifications)

  useEffect(() => {
    dispatch(getUserNotifications(user._id))
  }, [])

  return (
    <Flex direction='column' align='center' justify='center' className={classes.relativePosition}>
      <Title className={classes.titleh2}>{t('notifications')}</Title>
      <Flex direction='column' align='center' justify='center'>
        {notifications?.map((notification) => (
          <CustomNotification key={notification._id} {...notification} />
        ))}
      </Flex>
    </Flex>
  )
}
