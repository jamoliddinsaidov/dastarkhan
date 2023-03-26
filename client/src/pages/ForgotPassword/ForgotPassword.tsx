import { Paper, Title, Text, TextInput, Button, Container, Group, Center, Box, rem } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { UnderMaintenance } from '../../components'
import { useForgotPasswordStyles } from './ForgotPassword.style'

export const ForgotPassword = () => {
  const { classes } = useForgotPasswordStyles()
  const { t } = useTranslation()

  return (
    <Container size={560} my={30}>
      <Title className={classes.title} align='center'>
        {t('forgot_password')}
      </Title>
      <Text c='dimmed' fz='sm' ta='center' mt='md'>
        {t('enter_email_to_reset_password')}
      </Text>

      <Paper withBorder shadow='md' p={30} radius='md' mt='xl' className={classes.paper}>
        <TextInput label={t('email_addess')} placeholder='email@gmail.com' required />
        <Group position='apart' mt='lg' className={classes.controls}>
          <Link to='/login'>
            <Text color='dimmed' size='sm' className={classes.control}>
              <Center inline>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Box ml={5}>{t('back_to_login')}</Box>
              </Center>
            </Text>
          </Link>
          <Button className={classes.control} disabled>
            {t('reset_password')}
          </Button>
        </Group>
      </Paper>

      <UnderMaintenance />
    </Container>
  )
}
