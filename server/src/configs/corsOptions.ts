import { CorsOptions } from 'cors'
import { NOT_ALLOWED_BY_CORS } from '../utils/constants.js'

export const allowedOrigins = ['https://www.production_site.com', 'http://127.0.0.1:5173']

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin!) || process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      callback(new Error(NOT_ALLOWED_BY_CORS))
    }
  },
  optionsSuccessStatus: 200,
}
