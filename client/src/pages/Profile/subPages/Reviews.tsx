import React, { useEffect, useMemo } from 'react'
import { Flex, LoadingOverlay, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSubPagesStyles } from './SubPages.style'
import { FoodsList } from '../../../components'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getIsUserLoading, getUserFoods, getUserInfo } from '../../../store/user/userSelectors'
import { getLikedPosts, getReviewedPosts } from '../../../store/user/userServices'
import { useFiltersList } from '../../../components/Filter/useFiltersList'
import { mapFoodsArrayToComponentProps } from '../../../utils'

export const Reviews = () => {
  const { t } = useTranslation()
  const { classes } = useSubPagesStyles()
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(getIsUserLoading)
  const user = useAppSelector(getUserInfo)
  const reviewedFoods = useAppSelector(getUserFoods)
  const { foodTypeFilters, serviceTypeFilters } = useFiltersList()
  const mappedFoods = useMemo(
    () => mapFoodsArrayToComponentProps(reviewedFoods, foodTypeFilters, serviceTypeFilters),
    [reviewedFoods]
  )

  useEffect(() => {
    dispatch(getReviewedPosts(user._id))
  }, [])

  return (
    <Flex direction='column' align='center' justify='center' pos='relative'>
      <Title className={classes.title}>{!mappedFoods.length ? t('no_your_reviews') : t('your_reviews')}</Title>
      <div className={classes.containerMargin}>
        <FoodsList foods={mappedFoods} />
      </div>
      <LoadingOverlay visible={isLoading} overlayBlur={1} />
    </Flex>
  )
}
