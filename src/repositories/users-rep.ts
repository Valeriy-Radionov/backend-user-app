import { usersCollection } from "../common/database/userDatabase"

export type UserType = {
  id: string
  name: string
  email: string
  password: string
  registrationDate: string
  lastLoginDate: string
  blockStatus: boolean
  isAuth: boolean
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
  async blockUser(id: string, isBlocked: boolean): Promise<boolean> {
    try {
      const newUser = await usersCollection.findOneAndUpdate({ id: id }, { $set: { blockStatus: isBlocked } }) //!возвращает новыйобьект не должно быть так
      return newUser.ok === 1
    } catch {
      console.log("Error: Invalid status block request")
      return false
    }
  },
  async deleteUser(id: string, all: boolean): Promise<boolean | undefined> {
    try {
      if (id && all === false) {
        const isDeleted = await usersCollection.deleteOne({ id: id })
        return isDeleted.acknowledged
      } else if (all === true) {
        const isDeleted = await usersCollection.drop()
        return true
      }
    } catch {
      console.log("Delete is failure")
      return false
    }
  },
}
