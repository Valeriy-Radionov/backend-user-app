import { client } from "../common/database/userDatabase"

export type UserType = {
  id: string
  name: string
  email: string
  password: string
  registrationDate: string
  lastLoginDate: string
  blockStatus: boolean
}
export let users: UserType[] = [
  { id: "frfrfrf", name: "Boris", email: "tra-berler@mail.ru", password: "34567", registrationDate: new Date().toLocaleString(), lastLoginDate: new Date().toLocaleString(), blockStatus: false },
]

const usersCollection = client.db("user").collection<UserType>("users")

export const usersRepository = {
  async getUsers(): Promise<UserType[] | null | undefined> {
    try {
      if (users) {
        const users = await usersCollection.find({}).toArray()
        return users
      }
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
