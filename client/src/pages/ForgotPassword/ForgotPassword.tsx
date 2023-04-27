import axios from 'axios'
import { useState } from 'react'
import { Paper, Title, Text, TextInput, Button, Container, Group, Center, Box, rem, Modal } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useForgotPasswordStyles } from './ForgotPassword.style'
import { forgotPasswordUrl } from '../../api/auth'
import { useForm } from '@mantine/form'
import { Toaster } from '../../components/Toaster/Toaster'

export const ForgotPassword = () => {
  const { t } = useTranslation()
  const { classes } = useForgotPasswordStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : t('invalid_email')),
    },
  })

  const onResetPassword = async () => {
    if (form.isTouched()) {
      try {
        setIsLoading(true)
        await axios.post(forgotPasswordUrl.href, form.values)
        setIsLoading(false)
        setIsSuccess(true)
      } catch (error: any) {
        setIsLoading(false)
        setError(error.message)
        setTimeout(() => {
          setError('')
        }, 1300)
      } finally {
        form.setFieldValue('email', '')
      }
    }
  }

  return (
    <Container size={560} my={30}>
      <Title className={classes.title} align='center'>
        {t('forgot_password')}
      </Title>
      <Text c='dimmed' fz='sm' ta='center' mt='md'>
        {t('enter_email_to_reset_password')}
      </Text>
      <Paper withBorder shadow='md' p={30} radius='md' mt='xl' className={classes.paper}>
        <TextInput
          label={t('email_addess')}
          placeholder='email@gmail.com'
          required
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
        />
        <Group position='apart' mt='lg' className={classes.controls}>
          <Link to='/login'>
            <Text color='dimmed' size='sm' className={classes.control}>
              <Center inline>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Box ml={5}>{t('back_to_login')}</Box>
              </Center>
            </Text>
          </Link>
          <Button className={classes.control} onClick={onResetPassword} loading={isLoading}>
            {t('reset_password')}
          </Button>
        </Group>
      </Paper>
      <Toaster opened={!!error} text={error} isError />
      <Modal opened={isSuccess} onClose={() => setIsSuccess(false)} title={t('forgot_password')} centered>
        <Text py='lg' px='md'>
          {t('reset_password_dialog', { email: form.values.email })}
        </Text>
      </Modal>
    </Container>
  )
}
