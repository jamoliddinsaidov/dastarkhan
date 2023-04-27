import axios from 'axios'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, Container, Title, Badge } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { ContactIconsList } from './ContactIcons'
import { useContactUsStyles } from './ContactUs.style'
import { cleanUpContactUsValues } from '../../utils'
import { concactUsUrl } from '../../api/contact'
import { Toaster } from '../Toaster/Toaster'

export const ContactUs = () => {
  const { t } = useTranslation()
  const { classes } = useContactUsStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : t('invalid_email')),
    },
  })

  const onSendMessageClick = async () => {
    if (form.isTouched()) {
      try {
        setIsLoading(true)
        await axios.post(concactUsUrl.href, form.values)
        setIsLoading(false)
        setIsSuccess(true)
      } catch (error: any) {
        setIsLoading(false)
        setError(error.message)
      } finally {
        cleanUpContactUsValues(form)
        setTimeout(() => {
          setIsSuccess(false)
          setError('')
        }, 1300)
      }
    }
  }

  return (
    <>
      <Group position='center'>
        <Badge variant='filled' size='lg' mt='lg'>
          {t('contact_us')}
        </Badge>
      </Group>
      <Paper pb={8}>
        <Container className={classes.wrapper}>
          <div className={classes.contacts}>
            <Text fz='lg' fw={700} className={classes.title}>
              {t('contact_information')}
            </Text>

            <ContactIconsList />
          </div>

          <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
            <Text fz='lg' fw={700} className={classes.title}>
              {t('get_in_touch')}
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                  label={t('your_name')}
                  placeholder={t('your_name')!}
                  required
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                />
                <TextInput
                  label={t('email_addess')}
                  placeholder='john@gmail.com'
                  required
                  value={form.values.email}
                  onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                />
              </SimpleGrid>
              <TextInput
                mt='md'
                label={t('subject')}
                placeholder={t('subject')!}
                required
                value={form.values.subject}
                onChange={(event) => form.setFieldValue('subject', event.currentTarget.value)}
              />
              <Textarea
                mt='md'
                label={t('your_message')}
                placeholder={t('relevant_info')!}
                minRows={3}
                required
                value={form.values.message}
                onChange={(event) => form.setFieldValue('message', event.currentTarget.value)}
              />
              <Group position='right' mt='md'>
                <Button className={classes.control} onClick={onSendMessageClick} loading={isLoading}>
                  {t('send_message')}
                </Button>
              </Group>
            </div>
          </form>
        </Container>
        <Toaster opened={!!error || isSuccess} text={error || t('email_sent')} isError={!!error} />
      </Paper>
    </>
  )
}
