import React, { useEffect, useMemo } from 'react'
import { Flex, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSubPagesStyles } from './SubPages.style'
import { FoodsList } from '../../../components'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getUserFoods, getUserInfo } from '../../../store/user/userSelectors'
import { getLikedPosts } from '../../../store/user/userServices'
import { useFiltersList } from '../../../components/Filter/useFiltersList'
import { mapFoodsArrayToComponentProps } from '../../../utils'

export const LikedPosts = () => {
  const { t } = useTranslation()
  const { classes } = useSubPagesStyles()
  const dispatch = useAppDispatch()

  const user = useAppSelector(getUserInfo)
  const likedFoods = useAppSelector(getUserFoods)
  const { foodTypeFilters, serviceTypeFilters } = useFiltersList()
  const mappedFoods = useMemo(
    () => mapFoodsArrayToComponentProps(likedFoods, foodTypeFilters, serviceTypeFilters),
    [likedFoods]
  )

  const handleGetLikedPosts = (likedPosts = user.likedPosts) => {
    dispatch(getLikedPosts(likedPosts))
  }

  useEffect(() => {
    handleGetLikedPosts()
  }, [])

  return (
    <Flex direction='column' align='center' justify='center'>
      <Title className={classes.title}>{!mappedFoods.length ? t('no_liked_posts') : t('liked_posts')}</Title>
      <div className={classes.containerMargin}>
        <FoodsList foods={mappedFoods} onLikeCallback={handleGetLikedPosts} />
      </div>
    </Flex>
  )
}
