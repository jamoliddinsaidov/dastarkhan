import { rateLimit } from 'express-rate-limit'

export const rateLimiter = () =>
  rateLimit({
    windowMs: 900000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
