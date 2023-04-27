import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useForm } from '@mantine/form'
import { DateInput, DateValue } from '@mantine/dates'
import { Flex, Group, Radio, TextInput, Title, Text, Button, Divider, Badge, Notification } from '@mantine/core'
import { useSubPagesStyles } from './SubPages.style'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getUser } from '../../../store/user/userSelectors'
import { getUserBadgesInfo } from '../../../utils'
import { DeleteModal } from '../../../components'
import { updateUserInfo } from '../../../store/user/userServices'
import { Toaster } from '../../../components/Toaster/Toaster'

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
      email: (val) => (/^\S+@\S+$/.test(val) ? null : t('invalid_email')),
    },
  })

  const onUpdateClick = () => {
    if (form.isTouched()) {
      dispatch(updateUserInfo({ id: user._id, ...form.values }))
    }
  }

  return (
    <Flex direction='column' className={classes.relativePosition}>
      <Title className={classes.titleh2}>{t('settings')}</Title>
      <form className={classes.customDiv}>
        <Title className={classes.titleh3}>Profile</Title>
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
          error={form.errors?.dateOfBirth}
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
            defaultChecked
            value='male'
            onSelect={(event) => form.setFieldValue('gender', event.currentTarget.value)}
          />
          <Radio
            label={t('female')}
            name='gender'
            value='female'
            onSelect={(event) => form.setFieldValue('gender', event.currentTarget.value)}
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
        <Button radius='sm' mt={8} loading={loading} onClick={onUpdateClick}>
          {t('update')}
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
      <Toaster opened={success} text={'✔ Your profile has been updated'} />
    </Flex>
  )
}
