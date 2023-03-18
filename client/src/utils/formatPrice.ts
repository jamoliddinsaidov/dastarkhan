export const formatPrice = (price: number) => {
  if (price.toString().length === 3) {
    return price
  }

  const formatter = new Intl.NumberFormat('uz-UZ', { maximumSignificantDigits: 3 })
  return formatter.format(price)
}
