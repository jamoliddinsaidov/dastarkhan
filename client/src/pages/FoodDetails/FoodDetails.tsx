import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconBread, IconHome, IconMoneybag, IconStar, IconUser } from '@tabler/icons-react'
import {
  Button,
  Container,
  Divider,
  Flex,
  Image,
  LoadingOverlay,
  Skeleton,
  Slider,
  Text,
  Title,
  rem,
} from '@mantine/core'
import { getFoodState, getIsDeletingComment } from '../../store/food/foodSelectors'
import { getFoodById, rateFood } from '../../store/food/foodServices'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useFoodDetailsStyles } from './FoodDetails.style'
import { useFiltersList } from '../../components/Filter/useFiltersList'
import { getServiceType, formatPrice, getFoodType } from '../../utils'
import { AddComment, Comment, FollowingsModal } from '../../components'
import { Toaster } from '../../components/Toaster/Toaster'
import { getIsUserLoading, getUserInfo } from '../../store/user/userSelectors'
import { savePost } from '../../store/user/userServices'

export const FoodDetails = () => {
  const { t } = useTranslation()
  const { classes, cx } = useFoodDetailsStyles()
  const dispatch = useAppDispatch()

  const foodState = useAppSelector(getFoodState)
  const { loading, food, error } = foodState
  const { foodId } = useParams()
  const { serviceTypeFilters, foodTypeFilters } = useFiltersList()
  const [userRating, setUserRating] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isRecommended, setIsRecommended] = useState(false)
  const user = useAppSelector(getUserInfo)
  const serviceType = getServiceType(serviceTypeFilters, food.serviceType)
  const foodType = getFoodType(foodTypeFilters, food.foodType)
  const isDeletingComment = useAppSelector(getIsDeletingComment)
  const isUserLoading = useAppSelector(getIsUserLoading)
  const isFoodSaved = user?.savedPosts?.includes(foodId!)
  const isUserAlreadyRated = food?.ratings?.find((rating) => rating?.userId === user?._id)

  const onImageLoad = () => {
    setIsImageLoading(false)
  }

  const onSaveFood = () => {
    if (foodId) {
      dispatch(savePost({ foodId, userId: user._id }))
    }
  }

  const onRateFood = () => {
    if (foodId) {
      dispatch(rateFood({ foodId, rating: userRating, ratedUserId: user._id }))
    }
  }

  useEffect(() => {
    dispatch(getFoodById(foodId ?? ''))
  }, [])

  return (
    <Container className={cx(classes.wrapper, classes.relativePosition)}>
      {food?._id && (
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
              <Flex className={classes.marginBottom} align='center'>
                <Slider
                  labelTransition='skew-down'
                  labelTransitionDuration={150}
                  labelTransitionTimingFunction='ease'
                  min={0}
                  max={5}
                  step={0.5}
                  size='xl'
                  w={rem(280)}
                  value={userRating}
                  onChange={(value) => setUserRating(value)}
                  disabled={!!isUserAlreadyRated}
                />
                <Button ml={rem(16)} radius='lg' onClick={onRateFood} disabled={!!isUserAlreadyRated}>
                  {!!isUserAlreadyRated ? t('rated') : t('rate')}
                </Button>
              </Flex>
            </div>
          </Flex>
          <section className={classes.marginBottom}>
            <Text className={classes.label}>{t('review')}:</Text>
            <Text>{food.review}</Text>
          </section>
          <Flex align='center' justify='flex-end'>
            <Button onClick={onSaveFood} loading={isUserLoading} mr={rem(8)}>
              {isFoodSaved ? t('saved') : t('save')}
            </Button>
            <FollowingsModal foodId={food._id} foodName={food.foodName} setIsRecommended={setIsRecommended} />
          </Flex>
          <Divider className={classes.divider} size='sm' />
          <AddComment foodId={foodId ?? ''} />
          {!!food.comments.length && (
            <div className={classes.relativePosition}>
              <Divider className={classes.divider} size='sm' />
              {food.comments.map((comment) => (
                <Comment key={comment._id} foodId={foodId ?? ''} commentId={comment._id} {...comment} />
              ))}
              <LoadingOverlay visible={isDeletingComment} />
            </div>
          )}
        </>
      )}
      <LoadingOverlay visible={loading} />
      <Toaster opened={!!error} text={t('food_doesnt_exist')} isError />
      <Toaster opened={isRecommended} text={t('food_has_been_recommended')} />
    </Container>
  )
}
