import { Title, Text, Container, Button, Overlay, rem } from '@mantine/core'
import { IconSearch, IconWriting } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useHeroWithBackgroundStyles } from './HeroWithBackground.style'
import { useAppDispatch } from '../../store/hooks'
import { changeLink } from '../../store/activeLink/activeLinkSlice'

export function HeroWithBackground() {
  const { t } = useTranslation()
  const { classes, cx } = useHeroWithBackgroundStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onNavigate = (pathname: string) => {
    navigate(pathname)
    dispatch(changeLink(pathname))
  }

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
            leftIcon={<IconSearch size={rem(16)} />}
            onClick={() => onNavigate('/browse')}
            size='lg'
          >
            {t('browse')}
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            leftIcon={<IconWriting size={rem(16)} />}
            onClick={() => onNavigate('/writeReview')}
            size='lg'
          >
            {t('write_a_review')}
          </Button>
        </div>
      </div>
    </div>
  )
}
