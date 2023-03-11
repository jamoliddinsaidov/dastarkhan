import { Title, Text, Container, Button, Overlay, rem } from '@mantine/core'
import { IconSearch, IconWriting } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useHroWithBackgroundStyle } from './HeroWithBackground.style'

export function HeroWithBackground() {
  const { classes, cx } = useHroWithBackgroundStyle()
  const { t } = useTranslation()

  return (
    <div className={classes.wrapper}>
      <Overlay color='#000' opacity={0.7} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          {t('hero_title_1')}{' '}
          <Text component='span' inherit variant='gradient' gradient={{ from: '#FFE53B', to: '#FF2525' }}>
            {t('hero_title_2')}
          </Text>
        </Title>

        <Container size={640}>
          <Text size='lg' className={classes.description}>
            {t('hero_description')}
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            variant='gradient'
            gradient={{ to: '#FFE53B', from: '#FF2525' }}
            size='lg'
            leftIcon={<IconSearch size={rem(16)} />}
          >
            {t('browse')}
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size='lg'
            leftIcon={<IconWriting size={rem(16)} />}
          >
            {t('write_a_review')}
          </Button>
        </div>
      </div>
    </div>
  )
}
