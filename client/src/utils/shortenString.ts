const textLength = 90

export const shortenString = (text: string) => {
  return text.length <= textLength ? text : `${text.substring(0, textLength)}...`
}
