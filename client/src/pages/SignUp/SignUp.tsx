import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Title,
  Text,
  Radio,
  Flex,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSignUpStyles } from './SignUp.style'
import { ChangeEvent } from 'react'
import { DateInput, DateValue } from '@mantine/dates'
import { upperFirst } from '@mantine/hooks'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export const SignUp = () => {
  const { classes } = useSignUpStyles()
  const { t } = useTranslation()

  const form = useForm({
    initialValues: {
      email: '',
      dateOfBirth: new Date(),
      gender: 'male',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      name: (val) => (val.length >= 3 ? null : 'Name should include at least 3 characters'),
      dateOfBirth: (val) => (val.getFullYear() === new Date().getFullYear() ? 'Please select a date' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  return (
    <Paper radius='md' p='xl' withBorder className={classes.wrapper}>
      <Title className={classes.title}>{t('signup')}</Title>

      <form
        onSubmit={form.onSubmit(() => {
          console.log(form.values)
        })}
        className={classes.form}
      >
        <Stack>
          <TextInput
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
            maxDate={dayjs(new Date()).add(1, 'month').toDate()}
          />

          <Text className={classes.text}>{t('gender')}</Text>
          <Group>
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

          <Checkbox
            label={t('accept_terms_conditions')}
            checked={form.values.terms}
            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
          />
        </Stack>

        <Flex align='center' justify='space-between' className={classes.flexDiv}>
          <Text>
            {t('already_have_account')}
            <Link to='/login' className={classes.link}>
              {t('login')}
            </Link>
          </Text>

          <Button type='submit' radius='sm'>
            {t('signup')}
          </Button>
        </Flex>

        <Link to='/termsAndConditions' className={classes.termsAndConditionsLink}>
          {t('terms_conditions')}
        </Link>
      </form>
    </Paper>
  )
}
