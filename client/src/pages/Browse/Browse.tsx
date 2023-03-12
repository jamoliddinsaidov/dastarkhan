import React, { useState } from 'react'
import { ActionIcon, Container, Flex, Grid, Paper, Transition } from '@mantine/core'
import { IconAdjustments } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import { useBrowseStyles } from './Browse.style'
import { Filter, FoodCard, SearchInput } from '../../components'

const mockCardContent = {
  image:
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  title: 'Verudela Beach',
  city: 'Tashkent',
  description:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, dignissimos maiores eaque qui eum incidunt!',
  badges: ['National', 'Restaurant'],
  stars: 4,
  price: '36,500',
}

export const Browse = () => {
  const { t } = useTranslation()
  const { classes } = useBrowseStyles()
  const [opened, handlers] = useDisclosure(false)
  const [searchValue, setSearchValue] = useState('')

  const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const onSearchClick = () => {
    console.log(searchValue)
  }

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
        <Grid.Col span={4}>
          <FoodCard {...mockCardContent} />
        </Grid.Col>
        <Grid.Col span={4}>
          <FoodCard {...mockCardContent} />
        </Grid.Col>
        <Grid.Col span={4}>
          <FoodCard {...mockCardContent} />
        </Grid.Col>
        <Grid.Col span={4}>
          <FoodCard {...mockCardContent} />
        </Grid.Col>
        <Grid.Col span={4}>
          <FoodCard {...mockCardContent} />
        </Grid.Col>
        <Grid.Col span={4}>
          <FoodCard {...mockCardContent} />
        </Grid.Col>
        <Grid.Col span={4}>
          <FoodCard {...mockCardContent} />
        </Grid.Col>
      </Grid>
    </Container>
  )
}
