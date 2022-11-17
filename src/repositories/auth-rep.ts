import { nanoid } from "nanoid"
import { client } from "../common/database/userDatabase"
import { LoginDataType, UserRequestDataType } from "../rotes/auth-router"
import { users, UserType } from "./users-rep"

const usersCollection = client.db("user").collection<UserType>("users")

export const authRepository = {
  async registration(userRequestData: UserRequestDataType): Promise<UserType | undefined | null> {
    const id = nanoid()
    const date = new Date().toLocaleString()
    const blockStatus = false
    try {
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
      await usersCollection.insertOne(newUser)
      const registredUser = await usersCollection.findOne({ email: email, password: password })
      return registredUser
    } catch {
      console.log("Invalid data of registration request")
    }
  },
  async login(requestUser: LoginDataType): Promise<UserType | undefined | null> {
    try {
      if (requestUser) {
        const userData = usersCollection.findOne({ email: requestUser.email, password: requestUser.password })
        return userData
      }
    } catch {
      console.log("Invalid data of login request")
    }
  },
  logOutLogout() {},
}
