import React, { useState } from 'react'
import { Text, Divider, Flex, MultiSelect, Select, Button } from '@mantine/core'
import { useFilterStyles } from './Filter.style'
import { useFiltersList } from './useFiltersList'
import { IconAdjustments } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../store/hooks'
import { filterFoods } from '../../store/food/foodServices'

export const Filter = () => {
  const { classes } = useFilterStyles()
  const { t } = useTranslation()
  const { allFilters, priceFilters, ratingFilters, foodTypeFilters, serviceTypeFilters, reviewedFilters } =
    useFiltersList()
  const dispatch = useAppDispatch()

  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([])
  const [selectedValues, setSelectedValues] = useState({
    rating: '',
    price: '',
    foodType: '',
    serviceType: '',
    reviewed: '',
  })

  const onSelectChange = (value: string | null, filterName: string) => {
    setSelectedValues((prev) => ({ ...prev, [filterName]: value }))

    if (value) {
      const newMultiSelectValues = [...multiSelectValues, value]
      const existingValue = selectedValues[filterName as keyof typeof selectedValues]
      const isValueAmongMultiSelectValues = multiSelectValues.includes(existingValue)

      if (isValueAmongMultiSelectValues) {
        const existingValueIndex = multiSelectValues.findIndex((value) => value === existingValue)
        newMultiSelectValues.splice(existingValueIndex, 1)
      }

      setMultiSelectValues(newMultiSelectValues)
    }
  }

  const onClickFilter = () => {
    dispatch(filterFoods(selectedValues))
  }

  return (
    <div className={classes.wrapper}>
      <Flex direction='column'>
        <MultiSelect
          data={allFilters}
          label={t('filters_you_selected')}
          placeholder={t('pick_you_like')!}
          value={multiSelectValues}
          readOnly
        />
        <Button variant='outline' className={classes.applyBtn} onClick={onClickFilter}>
          {t('apply_filters')}
        </Button>
      </Flex>

      <Divider
        mt='lg'
        mb='md'
        variant='dashed'
        className={classes.filtersLabel}
        label={
          <>
            <IconAdjustments size={16} />
            <Text ml={5} size='md'>
              {t('filters')}
            </Text>
          </>
        }
      />

      <Flex className={classes.filtersBox}>
        <Select
          label={t('rating')}
          placeholder={t('pick_one')!}
          nothingFound={t('no_options')}
          data={ratingFilters}
          onChange={(value) => onSelectChange(value, 'rating')}
          dropdownPosition='top'
          searchable
        />
        <Select
          label={t('price')}
          placeholder={t('pick_one')!}
          nothingFound={t('no_options')}
          data={priceFilters}
          onChange={(value) => onSelectChange(value, 'price')}
          dropdownPosition='top'
          searchable
        />
        <Select
          label={t('food_type')}
          placeholder={t('pick_one')!}
          nothingFound={t('no_options')}
          data={foodTypeFilters}
          onChange={(value) => onSelectChange(value, 'foodType')}
          dropdownPosition='top'
          searchable
        />
        <Select
          label={t('service_type')}
          placeholder={t('pick_one')!}
          nothingFound={t('no_options')}
          data={serviceTypeFilters}
          onChange={(value) => onSelectChange(value, 'serviceType')}
          dropdownPosition='top'
          searchable
        />
        <Select
          label={t('reviewed')}
          placeholder={t('pick_one')!}
          nothingFound={t('no_options')}
          data={reviewedFilters}
          onChange={(value) => onSelectChange(value, 'reviewed')}
          dropdownPosition='top'
          searchable
        />
      </Flex>
    </div>
  )
}
