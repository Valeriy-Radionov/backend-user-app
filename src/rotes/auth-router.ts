import { Request, Response, Router } from "express"
import { body } from "express-validator"
import { ResultCode } from "../common/constants"
import { inputValidatorsMiddleware } from "../common/validators/validators"
import { authRepository } from "../repositories/auth-rep"

export type LoginDataType = {
  email: string
  password: string
}
export type LoginResponseType = {
  resultCode: ResultCode
  message: string
}
export type RegistrationDataType = {
  email: string
  password: string
  name: string
}

export const authRouter = Router({})

const nameValidator = body("name").trim().isLength({ min: 1 }).withMessage("Name is requared")
const emailValidator = body("email").trim().isEmail().withMessage("Incorrect email")
const passwordValidator = body("password").trim().isLength({ min: 1 }).withMessage("Password is requared")

authRouter.post("/login", emailValidator, passwordValidator, inputValidatorsMiddleware, async (request: Request, response: Response<LoginResponseType>) => {
  try {
    const { email, password } = request.body
    const requestData: LoginDataType = { email: email, password: password }
    const responseData = await authRepository.login(requestData)
    if (responseData === 0) {
      response.status(200).send({ message: "Successfully", resultCode: 0 })
    } else {
      response.status(401).send({ message: "Faild! Incorrect email or password or you are blocked", resultCode: 1 })
    }
  } catch {
    response.status(401).send({ message: "Invalid request login data", resultCode: 1 })
  }
})

authRouter.post("/registration", nameValidator, passwordValidator, emailValidator, inputValidatorsMiddleware, async (request: Request, response: Response) => {
  try {
    const { email, password, name } = request.body
    const user: RegistrationDataType = { email: email, password: password, name: name }
    const newUser = await authRepository.registration(user)
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
