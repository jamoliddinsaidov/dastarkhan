export const shortenString = (text: string, textLength: number) => {
  return text.length <= textLength ? text : `${text.substring(0, textLength)}...`
}
