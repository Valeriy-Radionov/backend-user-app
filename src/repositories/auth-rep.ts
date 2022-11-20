import { nanoid } from "nanoid"
import { usersCollection } from "../common/database/userDatabase"
import { LoginDataType, RegistrationDataType } from "../rotes/auth-router"
import { UserType } from "./users-rep"
import { ResultCode } from "../common/constants"
export const authRepository = {
  async registration(userRequestData: RegistrationDataType): Promise<UserType | undefined | null> {
    try {
      const { name, email, password } = userRequestData
      const id = nanoid()
      const date = new Date().toLocaleString()
      const blockStatus = false
      const resultCode = 0
      const newUser: UserType = {
        id: id,
        name: name,
        email: email,
        password: password,
        registrationDate: date,
        lastLoginDate: date,
        blockStatus: blockStatus,
      }
      await usersCollection.insertOne(newUser)
      return newUser
    } catch {
      console.log("Invalid data of registration request")
    }
  },
  async login(requestUser: LoginDataType): Promise<ResultCode | undefined | null> {
    try {
      if (requestUser) {
        const date = new Date().toLocaleString()
        const findUser = await usersCollection.findOne({ email: requestUser.email, password: requestUser.password })
        if (findUser?.blockStatus === true || !findUser) {
          return 1
        } else {
          await usersCollection.findOneAndUpdate({ email: requestUser.email, password: requestUser.password }, { $set: { lastLoginDate: date } })
          return 0
        }
      }
    } catch {
      console.log("Error: Invalid data of login request or User is blocked")
    }
  },
  logOutLogout() {},
}
