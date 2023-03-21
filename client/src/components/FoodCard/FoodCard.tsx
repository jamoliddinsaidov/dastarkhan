import { IconCopy, IconHeart, IconMessage, IconStar, IconStarFilled } from '@tabler/icons-react'
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Flex, Skeleton } from '@mantine/core'
import { useFoodCardStyles } from './FoodCard.style'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../store/hooks'
import { getUserInfo } from '../../store/user/userSelectors'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export interface FoodCardProps {
  id: string
  image: string
  title: string
  city: string
  description: string
  badges: string[]
  stars: number
  price: string | number
}

export const FoodCard = ({ id, image, title, description, city, badges, stars, price }: FoodCardProps) => {
  const { classes, theme } = useFoodCardStyles()
  const { t } = useTranslation()
  const [isImageLoading, setIsImageLoading] = useState(true)
  const navigate = useNavigate()
  const user = useAppSelector(getUserInfo)

  const features = badges.map((badge) => (
    <Badge color={theme.colorScheme === 'dark' ? 'dark' : 'gray'} key={badge}>
      {badge}
    </Badge>
  ))

  const onShowDetailsClick = () => {
    navigate(`food/${id}`)
  }

  const onLoad = () => {
    setIsImageLoading(false)
  }

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
        <ActionIcon variant='default' radius='md' size={36}>
          <IconCopy size='1.1rem' className={classes.comment} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant='default' radius='md' size={36}>
          <IconMessage size='1.1rem' className={classes.comment} stroke={1.5} />
        </ActionIcon>
        {!!user._id && (
          <ActionIcon variant='default' radius='md' size={36}>
            <IconHeart size='1.1rem' className={classes.like} stroke={1.5} />
          </ActionIcon>
        )}
      </Group>
    </Card>
  )
}
