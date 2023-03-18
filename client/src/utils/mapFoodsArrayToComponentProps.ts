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
      title: shortenString(foodName, 20),
      stars: rating,
      description: shortenString(review, 90),
      price: formatPrice(price),
      image,
      city,
      badges,
    }
  })

  return mappedFoods as FoodCardProps[]
}
