import { UserType } from "../../../repositories/users-rep"

export const createUser = (id: string, name: string, email: string, password: string, registrationDate: string, lastLoginDate: string, blockStatus: boolean, isAuth: boolean): UserType => {
  const newUser: UserType = {
    id: id,
    name: name,
    email: email,
    password: password,
    registrationDate: registrationDate,
    lastLoginDate: lastLoginDate,
    blockStatus: blockStatus,
    isAuth: isAuth,
  }
  return newUser
}
