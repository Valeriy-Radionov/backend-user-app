import { nanoid } from "nanoid"
import { usersCollection } from "../common/database/userDatabase"
import { LoginDataType, LogoutDataType, RegistrationDataType } from "../rotes/auth-router"
import { UserType } from "./users-rep"
import { ResultCode } from "../common/constants/constants"
import { createUser } from "../common/utils/helpers/authHelper"

export const authRepository = {
  async registration(userRequestData: RegistrationDataType): Promise<UserType | undefined | null> {
    try {
      const { name, email, password } = userRequestData
      const id = nanoid()
      const date = new Date().toLocaleString()
      const blockStatus = false
      const isAuth = true
      const newUser = createUser(id, name, email, password, date, date, blockStatus, isAuth)
      await usersCollection.insertOne(newUser)
      return newUser
    } catch {
      console.log("Invalid data of registration request")
    }
  },
  async login(requestUser: LoginDataType): Promise<UserType | undefined | null> {
    try {
      if (requestUser) {
        const date = new Date().toLocaleString()
        const findUser = await usersCollection.findOne({ email: requestUser.email, password: requestUser.password })
        if (findUser?.blockStatus === true || !findUser) {
          return null
        } else {
          await usersCollection.findOneAndUpdate({ email: requestUser.email, password: requestUser.password }, { $set: { lastLoginDate: date, isAuth: true } })
          return findUser
        }
      }
    } catch {
      console.log("Failed to find user in database")
      return null
    }
  },
  async logOut(id: string): Promise<ResultCode | undefined | null> {
    try {
      id && (await usersCollection.findOneAndUpdate({ id: id }, { $set: { isAuth: false } }))
      return 0
    } catch {
      console.log("Error: Invalid data of logout request or User is't find")
      return 1
    }
  },

  async me(id: string): Promise<boolean | undefined | null> {
    try {
      if (id) {
        const user = await usersCollection.findOne({ id: id })
        console.log(user?.email)

        return user?.blockStatus
      }
    } catch {
      return null
    }
  },
}
