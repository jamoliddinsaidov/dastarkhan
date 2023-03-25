import { Grid, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { changeLink } from '../../store/activeLink/activeLinkSlice'
import { useAppDispatch } from '../../store/hooks'
import { FoodCard } from '../FoodCard/FoodCard'
import { useFoodsListStyles } from './FoodsList.style'

interface Foods {
  id: string
  image: string
  title: string
  city: string
  description: string
  badges: string[]
  stars: number
  price: string | number
}

interface FoodsListProps {
  foods: Foods[]
  success?: boolean
  onLikeCallback?: (likedPosts: string[]) => void
}

export const FoodsList = ({ foods, success = false, onLikeCallback }: FoodsListProps) => {
  const { t } = useTranslation()
  const { classes } = useFoodsListStyles()
  const dispatch = useAppDispatch()

  const onChangeLink = (url: string) => {
    dispatch(changeLink(url))
  }

  return (
    <Grid gutter='xl' grow className={classes.cards}>
      {!!foods.length ? (
        <>
          {foods.map((food) => (
            <Grid.Col span={4} key={food.id}>
              <FoodCard {...food} onLikeCallback={onLikeCallback} />
            </Grid.Col>
          ))}
        </>
      ) : (
        <Grid.Col span={4}>
          {success && (
            <>
              <Title align='center'>{t('nothing_found_search')}</Title>
              <Link to='/writeReview' className={classes.link} onClick={() => onChangeLink('writeReview')}>
                {t('try_adding_review')}
              </Link>
            </>
          )}
        </Grid.Col>
      )}
    </Grid>
  )
}
