import dayjs from 'dayjs'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Stack,
  Title,
  Text,
  Radio,
  Flex,
  Dialog,
  LoadingOverlay,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { DateInput, DateValue } from '@mantine/dates'
import { Link, useNavigate } from 'react-router-dom'
import { useSignUpStyles } from './SignUp.style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeLink } from '../../store/activeLink/activeLinkSlice'
import { registerUser } from '../../store/user/userServices'
import { getUser } from '../../store/user/userSelectors'
import { changeUserSuccesStatus } from '../../store/user/userSlice'
import { Toaster } from '../../components/Toaster/Toaster'
import { cleanUpSignUpValues } from '../../utils'

export const SignUp = () => {
  const { classes } = useSignUpStyles()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(getUser)
  const maxAgeDate = dayjs(new Date()).subtract(16, 'year').toDate()

  const form = useForm({
    initialValues: {
      email: '',
      dateOfBirth: maxAgeDate,
      gender: 'male',
      name: '',
      password: '',
    },

    validate: {
      name: (val) => (val.length >= 3 ? null : t('name_error_message')),
      dateOfBirth: (val) => (val === maxAgeDate ? t('dob_error_message') : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : t('invalid_email')),
      password: (val) => (val.length <= 6 ? t('invalid_password') : null),
    },
  })

  const onLinkClick = (link: string) => {
    dispatch(changeLink(link))
  }

  const navigateToLogin = () => {
    navigate('/login')
    dispatch(changeLink('/login'))
    dispatch(changeUserSuccesStatus())
  }

  const onSubmit = () => {
    dispatch(registerUser(form.values))
    cleanUpSignUpValues(form)
  }

  return (
    <Paper radius='md' p='xl' shadow='md' withBorder className={classes.wrapper}>
      <Title className={classes.title}>{t('signup')}</Title>

      <form onSubmit={form.onSubmit(onSubmit)} className={classes.form}>
        <Stack>
          <TextInput
            required
            label={t('name')}
            placeholder={t('your_name')!}
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            error={form.errors?.name}
            radius='md'
          />

          <DateInput
            value={form.values.dateOfBirth}
            onChange={(event: DateValue) => form.setFieldValue('dateOfBirth', event ? event : new Date())}
            error={form.errors?.dateOfBirth}
            label={t('date_of_birth')}
            placeholder={t('date_of_birth')!}
            maxDate={maxAgeDate}
          />

          <Text className={classes.text}>{t('gender')}</Text>
          <Group>
            <Radio
              label={t('male')}
              name='gender'
              defaultChecked
              value='male'
              onChange={(event) => form.setFieldValue('gender', event.currentTarget.value)}
            />
            <Radio
              label={t('female')}
              name='gender'
              value='female'
              onChange={(event) => form.setFieldValue('gender', event.currentTarget.value)}
            />
          </Group>

          <TextInput
            required
            label={t('email_addess')}
            placeholder='email@gmail.com'
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors?.email}
            radius='md'
          />

          <PasswordInput
            required
            label={t('password')}
            placeholder={t('your_password')!}
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors?.password}
            radius='md'
          />
        </Stack>

        <Flex align='center' justify='space-between' className={classes.flexDiv}>
          <Text>
            {t('already_have_account')}
            <Link to='/login' className={classes.link} onClick={() => onLinkClick('login')}>
              {t('login')}
            </Link>
          </Text>

          <Button type='submit' radius='sm'>
            {t('signup')}
          </Button>
        </Flex>
      </form>

      <LoadingOverlay visible={user.loading} overlayBlur={1} />

      <Dialog
        opened={user.success}
        size='lg'
        radius='md'
        shadow='xl'
        withBorder
        transition='slide-left'
        transitionDuration={300}
        transitionTimingFunction='ease'
      >
        <Flex align='center' justify='space-between'>
          <Text size='sm' mb='xs' weight={500}>
            {t('your_account_created')}
          </Text>

          <Button onClick={navigateToLogin}>{t('login')}</Button>
        </Flex>
      </Dialog>
      <Toaster opened={!!user.error} text={user.error} isError />
    </Paper>
  )
}
