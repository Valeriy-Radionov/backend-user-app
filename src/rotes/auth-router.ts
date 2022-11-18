import { Request, Response, Router } from "express"
import { body } from "express-validator"
import { inputValidatorsMiddleware } from "../common/validators/validators"
import { authRepository } from "../repositories/auth-rep"

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
const passwordValidator = body("password").trim().isLength({ min: 1 }).withMessage("Password is requared")
//login
authRouter.post("/login", emailValidator, passwordValidator, inputValidatorsMiddleware, async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body
    const requestData: LoginDataType = { email: email, password: password }
    const responseData = await authRepository.login(requestData)
    if (responseData) {
      response.status(200).send(responseData)
    } else {
      response.status(401).send("Register or check the entered login or password")
    }
  } catch {
    response.status(400).send("Incorrect email or password")
  }
})
//registration
authRouter.post("/registration", nameValidator, passwordValidator, emailValidator, inputValidatorsMiddleware, async (request: Request, response: Response) => {
  try {
    const { email, password, name } = request.body
    const user: UserRequestDataType = { email: email, password: password, name: name }
    const newUser = await authRepository.registration(user)
    if (newUser) {
      response.status(201).send(newUser)
    }
  } catch {
    response.status(400).send("Ingorrect request data")
  }
})
//authorization
authRouter.post("/me", async (request: Request, response: Response) => {
  try {
  } catch {}
})
