import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './customApi.js'

interface IBadRequestError {
  message: string
  statusCode: number
}

export class BadRequestError extends CustomAPIError implements IBadRequestError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
