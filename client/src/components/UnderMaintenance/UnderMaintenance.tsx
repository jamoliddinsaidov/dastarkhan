import { Container, Title, Text, Button, Group, rem, Flex } from '@mantine/core'
import { IconTool } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useUnderMaintenanceStyles } from './UnderMaintenance.style'
import { changeLink } from '../../store/activeLink/activeLinkSlice'
import { useAppDispatch } from '../../store/hooks'
import { useTranslation } from 'react-i18next'

export const UnderMaintenance = () => {
  const { t } = useTranslation()
  const { classes } = useUnderMaintenanceStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onClick = () => {
    navigate('/home')
    dispatch(changeLink('home'))
  }
  return (
    <Container mb={16}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Flex direction='column' align='center' justify='center'>
            <IconTool size='10rem' className={classes.icon} />
            <Title className={classes.title}>Under Maintenance</Title>
          </Flex>
          <Text color='dimmed' size='lg' align='center' className={classes.description}>
            The page you are trying to use is currently under maintenance and will be working properly soon.
          </Text>
          <Group position='center'>
            <Button size='md' onClick={onClick}>
              {t('404_button')}
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  )
}
