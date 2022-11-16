import { nanoid } from "nanoid"
import { LoginDataType, UserRequestDataType } from "../rotes/auth-router"
import { users, UserType } from "./users-rep"

export const authRepository = {
  registration(userRequestData: UserRequestDataType) {
    const id = nanoid()
    const date = new Date().toLocaleString()
    const blockStatus = false
    const { name, email, password } = userRequestData
    const newUser: UserType = {
      id: id,
      name: name,
      email: email,
      password: password,
      registrationDate: date,
      lastLoginDate: date,
      blockStatus: blockStatus,
    }
    if (password && email && name) {
      users.push(newUser)
      return newUser
    }
  },
  login(requestUser: LoginDataType | null) {
    if (requestUser) {
      const userData: UserType = users.find((el) => el.email === requestUser.email && el.password === requestUser.password)!
      return userData
    } else {
      return null
    }
  },
  logOut() {},
}
