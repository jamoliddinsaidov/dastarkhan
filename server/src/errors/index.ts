import { UnauthenticatedError } from './unauthenticated.js'
import { UnauthorizedError } from './unauthorized.js'
import { BadRequestError } from './badRequest.js'
import { NotFoundError } from './notFound.js'

export type ErrorType = UnauthenticatedError | UnauthorizedError | BadRequestError | NotFoundError

export { UnauthenticatedError, UnauthorizedError, BadRequestError, NotFoundError }
