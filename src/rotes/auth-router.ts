import { Request, Response, Router } from "express"
import { ResultCode } from "../common/constants"
import { emailValidator, inputValidatorsMiddleware, nameValidator, passwordValidator } from "../common/validators/validators"
import { authRepository } from "../repositories/auth-rep"
import { UserType } from "../repositories/users-rep"

export type LoginDataType = {
  email: string
  password: string
}
export type InfoResponseType = {
  resultCode: ResultCode
  message: string
}
export type RegistrationDataType = {
  email: string
  password: string
  name: string
}
export type LogoutDataType = {
  id: string
}

export const authRouter = Router({})

authRouter.post("/login", emailValidator, passwordValidator, inputValidatorsMiddleware, async (request: Request, response: Response<UserType | InfoResponseType>) => {
  try {
    const { email, password } = request.body
    const requestData: LoginDataType = { email: email, password: password }
    const responseData = await authRepository.login(requestData)
    if (responseData) {
      response.status(201).send(responseData)
    } else {
      response.status(401).send({ message: "Faild! Incorrect email or password or you are blocked", resultCode: 1 })
    }
  } catch {
    response.status(401).send({ message: "Invalid request login data", resultCode: 1 })
  }
})

authRouter.post("/registration", nameValidator, passwordValidator, emailValidator, inputValidatorsMiddleware, async (request: Request, response: Response<UserType | InfoResponseType>) => {
  try {
    const { email, password, name } = request.body
    const user: RegistrationDataType = { email: email, password: password, name: name }
    const newUser = await authRepository.registration(user)
    if (newUser) {
      response.status(201).send(newUser)
    }
  } catch {
    response.status(401).send({ message: "Ingorrect request data", resultCode: 1 })
  }
})

authRouter.put("/logout", async (request: Request, response: Response<InfoResponseType>) => {
  try {
    const id = request.body.id
    const logout = await authRepository.logOut(id)
    if (logout === 0) {
      response.status(201).send({ message: "Logout", resultCode: 0 })
    }
  } catch {}
})
