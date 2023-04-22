import { Title, Text, Button, Container, Group } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { useNotFoundStyles } from './NotFound.style'

export const NotFound = () => {
  const { classes } = useNotFoundStyles()
  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onClick = () => {
    navigate('home')
  }

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>{t('404_title')}</Title>
      <Text color='dimmed' size='lg' align='center' className={classes.description}>
        {t('404_description')}
      </Text>
      <Group position='center'>
        <Button size='md' onClick={onClick}>
          {t('404_button')}
        </Button>
      </Group>
    </Container>
  )
}
