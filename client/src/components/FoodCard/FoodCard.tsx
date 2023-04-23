import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconCopy, IconHeart, IconMessage, IconStar } from '@tabler/icons-react'
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Flex, Skeleton, Tooltip } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useFoodCardStyles } from './FoodCard.style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUserInfo } from '../../store/user/userSelectors'
import { Toaster } from '../Toaster/Toaster'
import { likePost } from '../../store/user/userServices'

export interface FoodCardProps {
  id: string
  image: string
  title: string
  city: string
  description: string
  badges: string[]
  stars: number
  price: string | number
  onLikeCallback?: (likedPosts: string[]) => void
}

export const FoodCard = ({
  id,
  image,
  title,
  description,
  city,
  badges,
  stars,
  price,
  onLikeCallback,
}: FoodCardProps) => {
  const { classes, theme, cx } = useFoodCardStyles()
  const { t } = useTranslation()
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [toasterText, setToasterText] = useState('')
  const [isToasterOpened, setIsToasterOpened] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUserInfo)

  const onLoad = () => {
    setIsImageLoading(false)
  }

  const onShowDetailsClick = () => {
    navigate(`/browse/food/${id}`)
  }

  const onCopy = () => {
    const foodLink = `${window.location.origin}/browse/food/${id}`
    navigator.clipboard.writeText(foodLink)

    setToasterText(t('food_link_copied')!)
    handleToasterState()
  }

  const onLike = () => {
    dispatch(likePost({ userId: user._id, foodId: id }))

    if (onLikeCallback) {
      const likedPosts = [...user.likedPosts]

      if (likedPosts?.includes(id)) {
        const likedPostIndex = likedPosts.findIndex((post) => post === id)
        likedPosts.splice(likedPostIndex, 1)
      }

      onLikeCallback(likedPosts)
    }
  }

  const onComment = () => {
    navigate(`/browse/food/${id}`)
    const intervalId = setInterval(() => {
      const commentSection = document.querySelector('#comment_section')
      const bottomRect = commentSection?.getBoundingClientRect().bottom
      window.scrollTo({ top: bottomRect, behavior: 'smooth' })

      if (bottomRect) {
        clearInterval(intervalId)
      }
    }, 200)
  }

  const handleToasterState = () => {
    setIsToasterOpened(true)
    setTimeout(() => {
      setIsToasterOpened(false)
    }, 1500)
  }

  const features = badges.map((badge) => (
    <Badge color={theme.colorScheme === 'dark' ? 'dark' : 'gray'} key={badge}>
      {badge}
    </Badge>
  ))

  return (
    <Card withBorder radius='md' p='md' className={classes.card} shadow='md'>
      <Card.Section>
        <Skeleton visible={isImageLoading}>
          <Image src={image} alt={title} height={180} withPlaceholder onLoad={onLoad} />
        </Skeleton>
      </Card.Section>

      <Card.Section className={classes.section} mt='md'>
        <Group position='apart'>
          <Text fz='lg' fw={500}>
            {title}
          </Text>
          <Badge size='sm'>{city}</Badge>
        </Group>
        <Text fz='sm' mt='xs'>
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={7} mt={15}>
          {features}
        </Group>

        <Flex align='center' justify='space-between' mt={15}>
          <Badge color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}>
            <Flex align='center' justify='space-between'>
              <IconStar size='1.2rem' fill='orange' strokeOpacity={0} />
              <Text ml='xs' mb='0.1rem' size='lg'>
                {stars}
              </Text>
            </Flex>
          </Badge>

          <Badge>
            <Text size='xs'>{price} UZS</Text>
          </Badge>
        </Flex>
      </Card.Section>

      <Group mt='xs'>
        <Button radius='md' style={{ flex: 1 }} onClick={onShowDetailsClick}>
          {t('show_details')}
        </Button>
        <Tooltip label={t('copy_food_link')}>
          <ActionIcon variant='default' radius='md' size={36} onClick={onCopy}>
            <IconCopy size='1.1rem' className={classes.comment} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label={t('write_comment')}>
          <ActionIcon variant='default' radius='md' size={36} onClick={onComment}>
            <IconMessage size='1.1rem' className={classes.comment} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        {!!user._id && (
          <Tooltip label={t('add_to_likes')}>
            <ActionIcon variant='default' radius='md' size={36} onClick={onLike}>
              <IconHeart
                size='1.1rem'
                className={cx(classes.like, { [classes.liked]: user.likedPosts.includes(id) })}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>

      <Toaster opened={isToasterOpened} text={toasterText} />
    </Card>
  )
}
