import mongoSanitize from 'express-mongo-sanitize'

export const mongoSanitizer = () =>
  mongoSanitize({
    allowDots: true, // to sanitize data that only contains $, without .(dot)
    replaceWith: '_', // to replace these prohibited characters with _
  })
