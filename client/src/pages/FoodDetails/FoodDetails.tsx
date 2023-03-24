import React, { FormEvent, useEffect, useState } from 'react'
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
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { getFoodState } from '../../store/food/foodSelectors'
import { addComment, getFoodById } from '../../store/food/foodServices'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useFoodDetailsStyles } from './FoodDetails.style'
import { useFiltersList } from '../../components/Filter/useFiltersList'
import { getServiceType, formatPrice, getFoodType } from '../../utils'
import { getUserInfo } from '../../store/user/userSelectors'

export const FoodDetails = () => {
  const { t } = useTranslation()
  const { classes, cx } = useFoodDetailsStyles()
  const dispatch = useAppDispatch()

  const foodState = useAppSelector(getFoodState)
  const { loading, food, isAddingComment } = foodState
  const { foodId } = useParams()
  const { serviceTypeFilters, foodTypeFilters } = useFiltersList()
  const serviceType = getServiceType(serviceTypeFilters, food.serviceType)
  const foodType = getFoodType(foodTypeFilters, food.foodType)

  const user = useAppSelector(getUserInfo)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState(user.name ?? '')

  const onImageLoad = () => {
    setIsImageLoading(false)
  }

  const onAddComment = (event: FormEvent) => {
    event.preventDefault()
    const newComment = { foodId, userId: user?._id ?? null, userName, comment }

    dispatch(addComment(newComment))

    setComment('')
    setUserName('')
  }

  useEffect(() => {
    dispatch(getFoodById(foodId ?? ''))
  }, [])

  return (
    <Container className={cx(classes.wrapper, classes.relativePosition)}>
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

          <Divider className={classes.divider} size='sm' />

          <form onSubmit={onAddComment} className={classes.relativePosition}>
            <Textarea
              label={t('your_comment')}
              placeholder={t('your_opinion')!}
              minRows={4}
              value={comment}
              onChange={(event) => setComment(event.currentTarget.value)}
              withAsterisk
              autosize
            />
            {!user?._id && (
              <TextInput
                label={t('your_name')}
                placeholder={t('your_name')!}
                value={userName}
                onChange={(event) => setUserName(event.currentTarget.value)}
                radius='sm'
                mt='md'
                required
              />
            )}
            <Flex align='center' justify='flex-end'>
              <Button radius='sm' type='submit' mt='lg' disabled={!(comment.length && userName.length)}>
                {t('add_comment')}
              </Button>
            </Flex>
            <LoadingOverlay visible={isAddingComment} />
          </form>
        </>
      )}
      <LoadingOverlay visible={loading} />
    </Container>
  )
}
