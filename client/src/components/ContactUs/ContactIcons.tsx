import { Text, Box, Stack } from '@mantine/core'
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useContactIconsStyles } from './ContactIcons.style'

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: React.FC<any>
  title: React.ReactNode
  description: React.ReactNode
}

const ContactIcon = ({ icon: Icon, title, description }: ContactIconProps) => {
  const { classes } = useContactIconsStyles()
  return (
    <div className={classes.wrapper}>
      <Box mr='md'>
        <Icon size='1.5rem' />
      </Box>

      <div>
        <Text size='xs' className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  )
}

export const ContactIconsList = () => {
  const { t } = useTranslation()

  const contactData = [
    { title: t('email_addess'), description: '00009987js@gmail.com', icon: IconAt },
    { title: t('phone_number'), description: '+998 968 01 78', icon: IconPhone },
    { title: t('address'), description: '12 Istikbol Street, Tashkent ', icon: IconMapPin },
    { title: t('working_hours'), description: '09:00 – 18:00', icon: IconSun },
  ]
  const items = contactData.map((item, index) => <ContactIcon key={index} {...item} />)
  return <Stack>{items}</Stack>
}
