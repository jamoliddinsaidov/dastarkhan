import { useEffect, useMemo } from 'react'
import { Flex, LoadingOverlay, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSubPagesStyles } from './SubPages.style'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getIsUserLoading, getUserFoods, getUserInfo } from '../../../store/user/userSelectors'
import { useFiltersList } from '../../../components/Filter/useFiltersList'
import { mapFoodsArrayToComponentProps } from '../../../utils'
import { FoodsList } from '../../../components'
import { getSavedPosts } from '../../../store/user/userServices'

export const SavedPosts = () => {
  const { t } = useTranslation()
  const { classes } = useSubPagesStyles()
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(getIsUserLoading)
  const user = useAppSelector(getUserInfo)
  const savedFoods = useAppSelector(getUserFoods)
  const { foodTypeFilters, serviceTypeFilters } = useFiltersList()
  const mappedFoods = useMemo(
    () => mapFoodsArrayToComponentProps(savedFoods, foodTypeFilters, serviceTypeFilters),
    [savedFoods]
  )

  useEffect(() => {
    dispatch(getSavedPosts(user.savedPosts))
  }, [])

  return (
    <Flex align='center' justify='center' direction='column' className={classes.relativePosition}>
      <Title className={classes.titleh2}>{t('saved_posts')}</Title>
      <div className={classes.containerMargin}>
        <FoodsList foods={mappedFoods} />
      </div>
      <LoadingOverlay visible={isLoading} overlayBlur={1} />
    </Flex>
  )
}
