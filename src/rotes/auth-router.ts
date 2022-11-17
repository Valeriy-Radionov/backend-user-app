import { Request, Response, Router } from "express"
import { body } from "express-validator"
import { inputValidatorsMiddleware } from "../common/validators/validators"
import { authRepository } from "../repositories/auth-rep"
import { UserType } from "../repositories/users-rep"

export type LoginDataType = {
  email: string
  password: string
}
export type UserRequestDataType = {
  email: string
  password: string
  name: string
}
export const authRouter = Router({})

const nameValidator = body("name").trim().isLength({ min: 1 }).withMessage("Name is requared")
const emailValidator = body("email").trim().isEmail().withMessage("Incorrect email")
const passwordValidator = body("password").trim().isLength({ min: 1 }).ltrim().withMessage("Password is requared")

authRouter.post("/login", emailValidator, passwordValidator, inputValidatorsMiddleware, async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body
    const requestData: LoginDataType = { email: email, password: password }
    const responseData = await authRepository.login(requestData)
    if (responseData) {
      response.status(200).send(responseData)
    }
  } catch {
    response.status(400).send("Incorrect email or password")
  }
})

authRouter.post("/registration", nameValidator, passwordValidator, emailValidator, inputValidatorsMiddleware, async (request: Request, response: Response) => {
  try {
    const { email, password, name } = request.body
    const user: UserRequestDataType = { email: email, password: password, name: name }
    const newUser = authRepository.registration(user)
    if (newUser) {
      response.status(201).send(newUser)
    }
  } catch {
    response.status(400).send("Ingorrect request data")
  }
})

authRouter.post("/me", async (request: Request, response: Response) => {
  try {
  } catch {}
})
