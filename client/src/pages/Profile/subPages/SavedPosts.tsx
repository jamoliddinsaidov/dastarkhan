import React from 'react'
import { Flex, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSubPagesStyles } from './SubPages.style'
import { UnderMaintenance } from '../../../components'

export const SavedPosts = () => {
  const { t } = useTranslation()
  const { classes } = useSubPagesStyles()

  return (
    <Flex align='center' justify='center' direction='column' className={classes.relativePosition}>
      <Title className={classes.titleh2}>{t('saved_posts')}</Title>
      <UnderMaintenance />
    </Flex>
  )
}
