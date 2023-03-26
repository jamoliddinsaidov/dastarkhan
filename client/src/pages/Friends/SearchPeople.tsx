import { Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Person, SearchInput } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getPeople } from '../../store/user/userSelectors'
import { getAllUsers } from '../../store/user/userServices'
import { useFriendsStyles } from './Friends.style'

interface SearchPeopleProps {
  activeTab: string
}

export const SearchPeople = ({ activeTab }: SearchPeopleProps) => {
  const { t } = useTranslation()
  const { classes } = useFriendsStyles()
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useAppDispatch()
  const people = useAppSelector(getPeople)

  const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const onSearchClick = () => {
    dispatch(getAllUsers(searchValue))
  }

  useEffect(() => {
    if (activeTab === 'people') {
      dispatch(getAllUsers())
    }
  }, [activeTab])

  return (
    <>
      <Title size='h3' className={classes.titleH3}>
        {t('search_people')}
      </Title>
      <div className={classes.width60Container}>
        <SearchInput
          value={searchValue}
          onChange={onSearchValueChange}
          onClick={onSearchClick}
          placeholder='Search...'
        />
      </div>
      <div className={classes.width50Container}>
        {people.map((person) => (
          <Person key={person._id} activeTab={activeTab} {...person} />
        ))}
      </div>
    </>
  )
}
