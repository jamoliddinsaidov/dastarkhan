import React, { useState, useEffect, useMemo } from 'react'
import { ActionIcon, Container, Flex, Grid, LoadingOverlay, Paper, Title, Transition } from '@mantine/core'
import { IconAdjustments } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import { useBrowseStyles } from './Browse.style'
import { Filter, FoodCard, SearchInput } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getAllFoodReviews, searchFoods } from '../../store/food/foodServices'
import { getFoodsAndLoadingState } from '../../store/food/foodSelectors'
import { mapFoodsArrayToComponentProps } from '../../utils'
import { useFiltersList } from '../../components/Filter/useFiltersList'
import { Link } from 'react-router-dom'
import { changeLink } from '../../store/activeLink/activeLinkSlice'

export const Browse = () => {
  const { t } = useTranslation()
  const { classes } = useBrowseStyles()
  const [opened, handlers] = useDisclosure(false)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useAppDispatch()
  const { foods, isLoading } = useAppSelector(getFoodsAndLoadingState)
  const { foodTypeFilters, serviceTypeFilters } = useFiltersList()
  const mappedFoods = useMemo(() => mapFoodsArrayToComponentProps(foods, foodTypeFilters, serviceTypeFilters), [foods])

  const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const onSearchClick = () => {
    if (searchValue) {
      dispatch(searchFoods(searchValue.trim()))
    }
  }

  const onChangeLink = (url: string) => {
    dispatch(changeLink(url))
  }

  useEffect(() => {
    dispatch(getAllFoodReviews())
  }, [])

  return (
    <Container className={classes.wrapper}>
      <Flex align='center' justify='space-between' className={classes.searchBox}>
        <SearchInput
          value={searchValue}
          onChange={onSearchValueChange}
          onClick={onSearchClick}
          placeholder={t('search')}
          width='90%'
        />
        <ActionIcon onClick={handlers.toggle} size='lg' className={classes.filterIcon}>
          <IconAdjustments />
        </ActionIcon>
      </Flex>
      <Transition transition='slide-down' duration={200} mounted={opened}>
        {(styles) => (
          <Paper withBorder style={styles} shadow='md' className={classes.filterBox}>
            <Filter />
          </Paper>
        )}
      </Transition>

      <Grid gutter='xl' grow className={classes.cards}>
        {!!mappedFoods.length ? (
          <>
            {mappedFoods.map((food) => (
              <Grid.Col span={4} key={food.id}>
                <FoodCard {...food} />
              </Grid.Col>
            ))}
          </>
        ) : (
          <Grid.Col span={4}>
            <Title align='center'>{t('nothing_found_search')}</Title>
            <Link to='/writeReview' className={classes.link} onClick={() => onChangeLink('writeReview')}>
              {t('try_adding_review')}
            </Link>
          </Grid.Col>
        )}
      </Grid>

      <LoadingOverlay visible={isLoading} overlayBlur={1} />
    </Container>
  )
}
