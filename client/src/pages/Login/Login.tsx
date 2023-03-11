import { Paper, TextInput, PasswordInput, Flex, Button, Title, Text } from '@mantine/core'
import { IconLock, IconMail } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLoginStyles } from './Login.style'
import { useAppDispatch } from '../../store/hooks'
import { changeLink } from '../../store/activeLink/activeLinkSlice'
import { useForm } from '@mantine/form'

export const Login = () => {
  const { classes } = useLoginStyles()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  const onLinkClick = (link: string) => {
    dispatch(changeLink(link))
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
          radius='md'
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          error={form.errors?.email}
          icon={<IconMail />}
        />
        <PasswordInput
          label={t('password')}
          placeholder={t('your_password')!}
          mt='md'
          size='md'
          name='password'
          radius='md'
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          error={form.errors?.password}
          icon={<IconLock />}
        />
        <Button mt='xl' size='sm' fullWidth radius='md'>
          {t('login')}
        </Button>

        <Text ta='center' mt='md'>
          {t('dont_have_account')}
          <Link to='/signup' className={classes.link} onClick={() => onLinkClick('signup')}>
            {t('signup')}
          </Link>
        </Text>

        <Link to='/forgotPassword' className={classes.forgotPasswordLink} onClick={() => onLinkClick('forgotPassword')}>
          {t('forgot_password')}
        </Link>
      </Paper>
    </div>
  )
}
