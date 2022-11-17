import { usersCollection } from "../common/database/userDatabase"

export type UserType = {
  id: string
  name: string
  email: string
  password: string
  registrationDate: string
  lastLoginDate: string
  blockStatus: boolean
}

export const usersRepository = {
  async getUsers(): Promise<UserType[] | null | undefined> {
    try {
      const users = await usersCollection.find({}).toArray()
      return users
    } catch {
      return null
    }
  },
  async blockUser(id: string, isBlocked: boolean): Promise<boolean | undefined> {
    try {
      const newUser = await usersCollection.findOneAndUpdate({ id: id }, { blockStatus: isBlocked })
      return newUser ? true : false
    } catch {
      console.log("Error: Invalid block request")
      return false
    }
  },
  async deleteUser(id: string): Promise<boolean | undefined> {
    try {
      const isDeleted = (await usersCollection.findOneAndDelete({ id: id })).ok
      return isDeleted === 1 ? true : false
    } catch {
      console.log("Delete is failure")
    }
  },
}
