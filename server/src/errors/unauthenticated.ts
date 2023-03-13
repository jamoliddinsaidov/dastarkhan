import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './customApi.js'

interface IUnauthenticatedError {
  message: string
  statusCode: number
}

export class UnauthenticatedError extends CustomAPIError implements IUnauthenticatedError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
