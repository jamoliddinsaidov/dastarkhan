import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './customApi.js'

interface INotFoundError {
  message: string
  statusCode: number
}

export class NotFoundError extends CustomAPIError implements INotFoundError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}
