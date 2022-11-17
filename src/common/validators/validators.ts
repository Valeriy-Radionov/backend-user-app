import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

export const inputValidatorsMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    response.status(400).json({ errors: errors.array() })
  } else {
    next()
  }
}
