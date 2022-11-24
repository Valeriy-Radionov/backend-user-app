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
  async blockUser(id: string[], isBlocked: boolean): Promise<boolean> {
    try {
      let resulstCode: boolean[] = []
      id.map(async (el) => {
        const res = await usersCollection.findOneAndUpdate({ id: el }, { $set: { blockStatus: isBlocked } })
        res.ok === 1 && resulstCode.push(false)
      })
      return resulstCode.length === 0 ? true : false
    } catch {
      console.log("Error: Invalid status block request")
      return false
    }
  },
  async deleteUser(id: string[]): Promise<boolean | undefined> {
    try {
      let res: boolean[] = []
      id.map(async (el) => {
        const arr = await usersCollection.deleteOne({ id: el })
        arr.acknowledged === false && res.push(arr.acknowledged)
      })
      return res.length === 0 ? true : false
    } catch {
      console.log("Delete is failure")
      return false
    }
  },
}
