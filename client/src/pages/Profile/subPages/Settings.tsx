import React from 'react'
import { Flex, Title } from '@mantine/core'
import { UnderMaintenance } from '../../../components'
import { useSubPagesStyles } from './SubPages.style'
import { useTranslation } from 'react-i18next'

export const Settings = () => {
  const { t } = useTranslation()
  const { classes } = useSubPagesStyles()

  return (
    <Flex align='center' justify='center' direction='column' className={classes.relativePosition}>
      <Title className={classes.titleh2}>{t('settings')}</Title>
      <UnderMaintenance />
    </Flex>
  )
}
