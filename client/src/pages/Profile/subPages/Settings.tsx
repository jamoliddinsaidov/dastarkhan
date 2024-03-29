import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useForm } from '@mantine/form'
import { DateInput, DateValue } from '@mantine/dates'
import { Flex, Group, Radio, TextInput, Title, Text, Button, Divider, Badge, PasswordInput } from '@mantine/core'
import { useSubPagesStyles } from './SubPages.style'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getUser } from '../../../store/user/userSelectors'
import { cleanUpChangePasswordValues, getUserBadgesInfo } from '../../../utils'
import { DeleteModal } from '../../../components'
import { changePassword, updateUserInfo } from '../../../store/user/userServices'
import { Toaster } from '../../../components/Toaster/Toaster'
import { emailRegex } from '../../../utils/constants'

export const Settings = () => {
  const { t } = useTranslation()
  const { classes } = useSubPagesStyles()
  const dispatch = useAppDispatch()

  const { user, loading, success } = useAppSelector(getUser)
  const profileBadges = getUserBadgesInfo(user, t)

  const form = useForm({
    initialValues: {
      email: user.email,
      dateOfBirth: new Date(user.dateOfBirth),
      gender: user.gender,
      name: user.name,
    },

    validate: {
      name: (val) => (val.length >= 3 ? null : t('name_error_message')),
      email: (val) => (emailRegex.test(val) ? null : t('invalid_email')),
    },
  })

  const passwordForm = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      oldPassword: (val) => (val.length <= 6 ? t('invalid_password') : null),
      newPassword: (val) => (val.length <= 6 ? t('invalid_password') : null),
      confirmPassword: (val) => {
        if (val.length <= 6) {
          return t('invalid_password')
        }

        if (val !== passwordForm.values.newPassword) {
          return t('password_dont_match')
        }
      },
    },
  })

  const onUpdateClick = () => {
    if (form.isTouched()) {
      dispatch(updateUserInfo({ id: user._id, ...form.values }))
    }
  }

  const onUpdatePasswordClick = () => {
    if (passwordForm.isTouched()) {
      dispatch(changePassword({ userId: user._id, ...passwordForm.values }))
      cleanUpChangePasswordValues(passwordForm)
    }
  }

  return (
    <Flex direction='column' className={classes.relativePosition}>
      <Title className={classes.titleh2}>{t('settings')}</Title>
      <form className={classes.customDiv} onSubmit={form.onSubmit(onUpdateClick)}>
        <Title className={classes.titleh3}>{t('profile')}</Title>
        <Divider />
        <Group py={16}>
          {profileBadges.map((profileBadge) => (
            <Badge variant='light' size='sm' key={profileBadge}>
              {profileBadge}
            </Badge>
          ))}
        </Group>
        <Divider />
        <TextInput
          required
          label={t('name')}
          placeholder={t('your_name')!}
          value={form.values.name}
          onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          error={form.errors?.name}
          radius='sm'
          mb={16}
          mt={8}
        />
        <DateInput
          required
          value={form.values.dateOfBirth}
          onChange={(event: DateValue) => form.setFieldValue('dateOfBirth', event ? event : new Date())}
          label={t('date_of_birth')}
          placeholder={t('date_of_birth')!}
          maxDate={dayjs(new Date()).subtract(16, 'year').toDate()}
          mb={16}
        />
        <Text component='label'>{t('gender')}</Text>
        <Group mb={16} mt={8}>
          <Radio
            label={t('male')}
            name='gender'
            defaultChecked={user.gender === 'male'}
            value='male'
            onChange={(event) => form.setFieldValue('gender', event.currentTarget.value)}
          />
          <Radio
            label={t('female')}
            name='gender'
            value='female'
            defaultChecked={user.gender === 'female'}
            onChange={(event) => form.setFieldValue('gender', event.currentTarget.value)}
          />
        </Group>
        <TextInput
          required
          label={t('email_addess')}
          placeholder='email@gmail.com'
          name='email'
          radius='sm'
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          error={form.errors?.email}
          mb={16}
        />
        <Button radius='sm' mt={8} loading={loading} type='submit'>
          {t('update')}
        </Button>
      </form>
      <form className={classes.customDiv} onSubmit={passwordForm.onSubmit(onUpdatePasswordClick)}>
        <Title className={classes.titleh3}>{t('change_password')}</Title>
        <Divider />
        <PasswordInput
          label={t('old_password')}
          placeholder={t('old_password')!}
          mt='md'
          size='md'
          name='old_password'
          radius='md'
          value={passwordForm.values.oldPassword}
          onChange={(event) => passwordForm.setFieldValue('oldPassword', event.currentTarget.value)}
          error={passwordForm.errors?.oldPassword}
          required
        />
        <PasswordInput
          label={t('new_password')}
          placeholder={t('new_password')!}
          mt='md'
          size='md'
          name='new_password'
          radius='md'
          value={passwordForm.values.newPassword}
          onChange={(event) => passwordForm.setFieldValue('newPassword', event.currentTarget.value)}
          error={passwordForm.errors?.newPassword}
          required
        />
        <PasswordInput
          label={t('confirm_password')}
          placeholder={t('confirm_password')!}
          mt='md'
          size='md'
          name='confirm_password'
          radius='md'
          value={passwordForm.values.confirmPassword}
          onChange={(event) => passwordForm.setFieldValue('confirmPassword', event.currentTarget.value)}
          error={passwordForm.errors?.confirmPassword}
          required
        />
        <Button radius='sm' mt={20} loading={loading} type='submit'>
          {t('update_password')}
        </Button>
      </form>
      <div className={classes.customDiv}>
        <Title className={classes.titleh3}>{t('delete_account_title')}</Title>
        <Divider />
        <Text mt={16} mb={8} color='red'>
          {t('delete_account_text_warning')}
        </Text>
        <DeleteModal />
      </div>
      <Toaster opened={success} text={t('profile_updated_text')} />
    </Flex>
  )
}
