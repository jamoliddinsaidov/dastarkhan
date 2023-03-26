import { Alert, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useCustomNotificationStyles } from './CustomNotification.style'
import { useNotificationInfoToProcess } from './useNotificationInfoToProcess'
import { NotificationProps } from '../../store/user/userServices'
import { formatDate } from '../../utils'

export const CustomNotification = ({ age, type, createdAt, user, what }: NotificationProps) => {
  const { t } = useTranslation()
  const { classes } = useCustomNotificationStyles()
  const { title, color, body, icon } = useNotificationInfoToProcess(type, user, what, t)

  return (
    <Alert icon={icon} title={title} color={color} className={classes.wrapper}>
      <Text>{body}</Text>
      <Text size='xs' color='dimmed' mt={4}>
        {formatDate(createdAt)}
      </Text>
    </Alert>
  )
}
