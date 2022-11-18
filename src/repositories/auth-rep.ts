import { nanoid } from "nanoid"
import { usersCollection } from "../common/database/userDatabase"
import { LoginDataType, UserRequestDataType } from "../rotes/auth-router"
import { UserType } from "./users-rep"

export const authRepository = {
  async registration(userRequestData: UserRequestDataType): Promise<UserType | undefined | null> {
    try {
      const { name, email, password } = userRequestData
      const id = nanoid()
      const date = new Date().toLocaleString()
      const blockStatus = false
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
  async login(requestUser: LoginDataType): Promise<UserType | undefined | null> {
    try {
      if (requestUser) {
        const date = new Date().toLocaleString()
        const userData = await usersCollection.findOneAndUpdate({ email: requestUser.email, password: requestUser.password }, { $set: { lastLoginDate: date } })

        if (userData.value) {
          return userData.value
        } else {
          return null
        }
      }
    } catch (e) {
      console.log("Error: Invalid data of login request")
    }
  },
  logOutLogout() {},
}
