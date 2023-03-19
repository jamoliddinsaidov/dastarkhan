export const parseRatingFilter = (key: string) => {
  const ratingFilters = [
    { key: '5_stars', value: 5 },
    { key: '4_stars', value: 4 },
    { key: '3_stars', value: 3 },
    { key: '2_stars', value: 2 },
    { key: '1_star', value: 1 },
    { key: '0_stars', value: 0 },
  ]

  const rating = ratingFilters.find((rate) => rate.key === key)!

  return rating.value
}
