import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, Container } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { ContactIconsList } from './ContactIcons'
import { useContactUsStyles } from './ContactUs.style'

export const ContactUs = () => {
  const { t } = useTranslation()
  const { classes } = useContactUsStyles()

  return (
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
              <TextInput label={t('your_name')} placeholder={t('your_name')!} required />
              <TextInput label={t('email_addess')} placeholder='joh@gmail.com' required />
            </SimpleGrid>
            <TextInput mt='md' label={t('subject')} placeholder={t('subject')!} required />
            <Textarea mt='md' label={t('your_message')} placeholder={t('relevant_info')!} minRows={3} required />
            <Group position='right' mt='md'>
              <Button type='submit' className={classes.control}>
                {t('send_message')}
              </Button>
            </Group>
          </div>
        </form>
      </Container>
    </Paper>
  )
}
