import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconBread, IconHome, IconMoneybag, IconStar, IconUser } from '@tabler/icons-react'
import { Container, Flex, Image, LoadingOverlay, Skeleton, Text, Title } from '@mantine/core'
import { getFoodState } from '../../store/food/foodSelectors'
import { getFoodById } from '../../store/food/foodServices'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useFoodDetailsStyles } from './FoodDetails.style'
import { useFiltersList } from '../../components/Filter/useFiltersList'
import { getServiceType, formatPrice, getFoodType } from '../../utils'

export const FoodDetails = () => {
  const dispatch = useAppDispatch()
  const foodState = useAppSelector(getFoodState)
  const { t } = useTranslation()
  const { loading, food } = foodState
  const { foodId } = useParams()
  const { classes, cx } = useFoodDetailsStyles()
  const [isImageLoading, setIsImageLoading] = useState(true)
  const { serviceTypeFilters, foodTypeFilters } = useFiltersList()
  const serviceType = getServiceType(serviceTypeFilters, food.serviceType)
  const foodType = getFoodType(foodTypeFilters, food.foodType)

  const onImageLoad = () => {
    setIsImageLoading(false)
  }

  useEffect(() => {
    dispatch(getFoodById(foodId ?? ''))
  }, [])

  return (
    <Container className={classes.wrapper}>
      {food._id && (
        <>
          <Title className={classes.title}>{food.foodName}</Title>
          <Flex justify='flex-start' mb={16} className={classes.flexColumn}>
            <Skeleton visible={isImageLoading} className={cx(classes.halfWidth, classes.skeleton)}>
              <Image src={food.image} alt={food.foodName} height={300} onLoad={onImageLoad} withPlaceholder />
            </Skeleton>
            <div className={classes.halfWidth}>
              <Flex className={classes.marginBottom} align='center'>
                <IconHome color='orange' />
                <Text className={cx(classes.label, classes.marginLeft)}>{t('food_place')}:</Text>
                <Text className={classes.marginLeft}>
                  {food.foodPlaceName} ({serviceType}), {food.city}
                </Text>
              </Flex>
              <Flex className={classes.marginBottom} align='center'>
                <IconBread color='orange' />
                <Text className={cx(classes.label, classes.marginLeft)}>{t('food_type')}:</Text>
                <Text className={classes.marginLeft}>{foodType}</Text>
              </Flex>
              <Flex className={classes.marginBottom} align='center'>
                <IconMoneybag color='orange' />
                <Text className={cx(classes.label, classes.marginLeft)}>{t('price')}:</Text>
                <Text className={classes.marginLeft}>{formatPrice(food.price)} UZS</Text>
              </Flex>
              <Flex className={classes.marginBottom} align='center'>
                <IconStar color='orange' />
                <Text className={cx(classes.label, classes.marginLeft)}>{t('rating')}:</Text>
                <Text className={classes.marginLeft}>{food.rating} </Text>
              </Flex>
              <Flex className={classes.marginBottom} align='center'>
                <IconUser color='orange' />
                <Text className={cx(classes.label, classes.marginLeft)}>{t('created_by')}:</Text>
                {!!food.user.userId ? (
                  <Link to={`/user/${food.user.userId}`} className={classes.link}>
                    {food.user.name}
                  </Link>
                ) : (
                  <Text className={classes.marginLeft}>{food.user.name}</Text>
                )}
              </Flex>
            </div>
          </Flex>
          <section className={classes.marginBottom}>
            <Text className={classes.label}>{t('review')}:</Text>
            <Text>{food.review}</Text>
          </section>
        </>
      )}
      <LoadingOverlay visible={loading} />
    </Container>
  )
}
