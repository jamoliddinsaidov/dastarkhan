import { IFood } from '../store/food/foodServices'
import { FiltresType } from '../components/Filter/useFiltersList'
import { FoodCardProps } from '../components/FoodCard/FoodCard'
import { shortenString } from './shortenString'
import { formatPrice } from './formatPrice'

export const mapFoodsArrayToComponentProps = (
  foods: IFood[],
  foodTypeFilters: FiltresType[],
  serviceTypeFilters: FiltresType[]
) => {
  if (!foods.length) {
    return []
  }

  const mappedFoods: FoodCardProps[] = foods.map(
    ({ _id, foodName, city, image, review, foodType, price, rating, serviceType, user }) => {
      const badges: string[] = []

      const foodTypeBadge = getFoodType(foodTypeFilters, foodType)
      if (foodTypeBadge) {
        badges.push(foodTypeBadge)
      }

      const serviceTypeBadge = getServiceType(serviceTypeFilters, serviceType)
      if (serviceTypeBadge) {
        badges.push(serviceTypeBadge)
      }

      return {
        id: _id!,
        title: shortenString(foodName, 20),
        stars: rating,
        description: shortenString(review, 90),
        price: formatPrice(price),
        image,
        city,
        badges,
      }
    }
  )

  return mappedFoods
}

export const getServiceType = (serviceTypeFilters: FiltresType[], serviceType: string) => {
  const serviceTypeLabel = serviceTypeFilters.find((sType) => sType.value === serviceType)?.label
  return serviceTypeLabel
}

export const getFoodType = (foodTypeFilters: FiltresType[], foodType: string) => {
  const foodTypeLabel = foodTypeFilters.find((fType) => fType.value === foodType)?.label
  return foodTypeLabel
}
