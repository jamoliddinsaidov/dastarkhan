import { Badge, Group, Title, Text, Card, SimpleGrid, Container, rem } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useFeaturesStyles } from './Features.style'
import { useFeaturesContent } from './useFeaturesContent'

export const Features = () => {
  const { t } = useTranslation()
  const { classes, theme } = useFeaturesStyles()
  const featuresContent = useFeaturesContent()

  const features = featuresContent.map((feature) => (
    <Card key={feature.title} shadow='md' radius='md' className={classes.card} padding='xl'>
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz='lg' fw={500} className={classes.cardTitle} mt='md'>
        {feature.title}
      </Text>
      <Text fz='sm' c='dimmed' mt='sm'>
        {feature.description}
      </Text>
    </Card>
  ))

  return (
    <Container size='lg' py='xl' className={classes.wrapper}>
      <Group position='center'>
        <Badge variant='filled' size='lg'>
          {t('about')} Dastarkhan
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta='center' my={rem(28)}>
        {t('motto_features')}
      </Title>

      <Text c='dimmed' className={classes.description} ta='center' mt='md'>
        {t('motto_description')}
      </Text>

      <SimpleGrid cols={3} spacing='xl' mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  )
}
