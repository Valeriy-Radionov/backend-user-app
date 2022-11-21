import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"

export const inputValidatorsMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    response.status(400).json({ errors: errors.array() })
  } else {
    next()
  }
}

export const nameValidator = body("name").trim().isLength({ min: 1 }).withMessage("Name is requared")
export const emailValidator = body("email").trim().isEmail().withMessage("Incorrect email")
export const passwordValidator = body("password").trim().isLength({ min: 1 }).withMessage("Password is requared")
