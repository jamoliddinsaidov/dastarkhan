import { IFood } from '../store/food/foodServices'
import { FiltresType } from '../components/Filter/useFiltersList'
import { FoodCardProps } from '../components/FoodCard/FoodCard'
import { shortenString } from './shortenString'

export const mapFoodsArrayToComponentProps = (
  foods: IFood[],
  foodTypeFilters: FiltresType[],
  serviceTypeFilters: FiltresType[]
) => {
  if (!foods.length) {
    return []
  }

  const mappedFoods = foods.map(({ _id, foodName, city, image, review, foodType, price, rating, serviceType }) => {
    const badges: string[] = []

    const foodTypeBadge = foodTypeFilters.find((fType) => fType.value === foodType)?.label
    if (foodTypeBadge) {
      badges.push(foodTypeBadge)
    }

    const serviceTypeBadge = serviceTypeFilters.find((sType) => sType.value === serviceType)?.label
    if (serviceTypeBadge) {
      badges.push(serviceTypeBadge)
    }

    return {
      id: _id,
      title: foodName,
      description: shortenString(review),
      stars: rating,
      image,
      price,
      city,
      badges,
    }
  })

  return mappedFoods as FoodCardProps[]
}
