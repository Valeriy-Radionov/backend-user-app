import { Request, Response, Router } from "express"
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

authRouter.post("/login", (request: Request<null, null, LoginDataType>, response: Response) => {
  const { email, password } = request.body
  const requestData: LoginDataType = { email: email, password: password }
  try {
    const responseData: UserType = authRepository.login(requestData)!
    if (responseData) {
      response.status(200).send(responseData)
    }
  } catch {
    response.status(400).send(JSON.parse("Incorrect email or password."))
  }
})

authRouter.post("/registration", (request: Request, response: Response) => {
  const { email, password, name } = request.body
  const user: UserRequestDataType = { email: email, password: password, name: name }
  const newUser = authRepository.registration(user)
  if (newUser) {
    response.status(201).send(newUser)
  } else {
    response.status(400).send("Incorrect request data")
  }
})
