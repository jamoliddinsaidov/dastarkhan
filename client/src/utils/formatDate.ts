export const formatDate = (date: string | null) => {
  if (!date) {
    return 'Now'
  }

  let [fullDate, time] = date.split('T')
  time = time?.split('.')[0]

  return `at ${time} on ${fullDate}`
}
