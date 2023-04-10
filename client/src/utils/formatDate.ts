export const formatDate = (date: string | null) => {
  if (!date) {
    return 'Now'
  }
  const { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions()
  const dateObj = new Date(date)

  const fullDate = new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeZone: timeZone,
  }).format(dateObj)

  let hours: number | string = dateObj.getHours()
  hours = hours < 10 ? `0${hours}` : hours

  let minutes: number | string = dateObj.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : minutes

  return `${hours}:${minutes}, ${fullDate}`
}
