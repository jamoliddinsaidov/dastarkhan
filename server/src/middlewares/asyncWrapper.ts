import { Request, Response, NextFunction } from 'express'

type callbackType = (req: Request, res: Response, next?: NextFunction) => Promise<void>

export const asyncWrapper = (callback: callbackType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
