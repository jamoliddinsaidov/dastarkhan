import { useEffect, useMemo } from 'react'
import { Flex, LoadingOverlay, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSubPagesStyles } from './SubPages.style'
import { FoodsList } from '../../../components'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getIsUserLoading, getUserFoods, getUserInfo } from '../../../store/user/userSelectors'
import { getReviewedPosts } from '../../../store/user/userServices'
import { useFiltersList } from '../../../components/Filter/useFiltersList'
import { mapFoodsArrayToComponentProps } from '../../../utils'

interface ReviewsProps {
  userId?: string
}

export const Reviews = ({ userId }: ReviewsProps) => {
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
    dispatch(getReviewedPosts(userId ? userId : user._id))
  }, [])

  const reviewTitle = !mappedFoods.length ? t('no_your_reviews') : t('your_reviews')

  return (
    <Flex direction='column' align='center' justify='center' pos='relative'>
      <Title className={classes.title}>{userId ? t('reviews') : reviewTitle}</Title>
      <div className={classes.containerMargin}>
        <FoodsList foods={mappedFoods} />
      </div>
      <LoadingOverlay visible={isLoading} overlayBlur={1} />
    </Flex>
  )
}
