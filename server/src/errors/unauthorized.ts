import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './customApi.js'

interface IUnauthorizedError {
  message: string
  statusCode: number
}

export class UnauthorizedError extends CustomAPIError implements IUnauthorizedError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
