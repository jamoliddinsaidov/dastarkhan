import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/unauthenticated.js'
import { AUTHORIZATION_TOKEN_INVALID } from '../utils/constants.js'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.signedCookies
  const isAccessTokenValid = jwt.verify(accessToken, process.env.JWT_SECRET!)

  if (accessToken && isAccessTokenValid) {
    return next()
  }

  throw new UnauthenticatedError(AUTHORIZATION_TOKEN_INVALID)
}
