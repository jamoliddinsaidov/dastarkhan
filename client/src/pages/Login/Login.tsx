import { Paper, TextInput, PasswordInput, Flex, Button, Title, Text } from '@mantine/core'
import { IconLock, IconMail } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLoginStyles } from './Login.style'

export const Login = () => {
  const { classes } = useLoginStyles()
  const { t } = useTranslation()

  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' })

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const { name, value } = target
    setLoginDetails((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta='center' mt='md' mb={50}>
          {t('welcome_back')}
        </Title>

        <TextInput
          label={t('email_addess')}
          placeholder='email@gmail.com'
          size='md'
          name='email'
          value={loginDetails.email}
          onChange={onChange}
          icon={<IconMail />}
        />
        <PasswordInput
          label={t('password')}
          placeholder={t('your_password')!}
          mt='md'
          size='md'
          name='password'
          value={loginDetails.password}
          onChange={onChange}
          icon={<IconLock />}
        />
        <Button mt='xl' size='sm' fullWidth>
          {t('login')}
        </Button>

        <Text ta='center' mt='md'>
          {t('dont_have_account')}
          <Link to='/signup' className={classes.link}>
            {t('signup')}
          </Link>
        </Text>

        <Link to='/forgotPassword' className={classes.forgotPasswordLink}>
          {t('forgot_password')}
        </Link>
      </Paper>
    </div>
  )
}
