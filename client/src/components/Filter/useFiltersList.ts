import { useTranslation } from 'react-i18next'

export interface FiltresType {
  value: string
  label: string
}

export const useFiltersList = () => {
  const { t } = useTranslation()

  const ratingFilters = [
    { value: '5_stars', label: `5 ${t('stars')}` },
    { value: '4_stars', label: `4 ${t('stars')}` },
    { value: '3_stars', label: `3 ${t('stars')}` },
    { value: '2_stars', label: `2 ${t('stars')}` },
    { value: '1_star', label: `1 ${t('star')}` },
    { value: '0_stars', label: `0 ${t('stars')}` },
  ]

  const priceFilters = [
    { value: 'cheap_to_expensive', label: t('cheap_to_expensive') },
    { value: 'expensive_to_cheap', label: t('expensive_to_cheap') },
  ]

  const foodTypeFilters = [
    { value: 'national', label: t('national') },
    { value: 'fast_food', label: t('fast_food') },
    { value: 'asian', label: t('asian') },
    { value: 'european', label: t('european') },
    { value: 'dessert', label: t('dessert') },
    { value: 'drinks', label: t('drinks') },
  ]

  const serviceTypeFilters = [
    { value: 'fast_food_outlet', label: t('fast_food_outlet') },
    { value: 'restaurant', label: t('restaurant') },
    { value: 'cafe', label: t('cafe') },
    { value: 'street_food', label: t('street_food') },
    { value: 'delivery', label: t('delivery') },
  ]

  const reviewedFilters = [
    { value: 'mostReviewed', label: t('most_reviewed') },
    { value: 'leastReviewed', label: t('least_reviewed') },
  ]

  const allFilters = [...ratingFilters, ...priceFilters, ...foodTypeFilters, ...serviceTypeFilters, ...reviewedFilters]

  return { allFilters, ratingFilters, priceFilters, foodTypeFilters, serviceTypeFilters, reviewedFilters }
}
