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
  async blockUser(id: string, isBlocked: boolean, isAll: boolean): Promise<boolean> {
    try {
      if (!isAll) {
        const newUser = await usersCollection.findOneAndUpdate({ id: id }, { $set: { blockStatus: isBlocked } })
        return newUser.ok === 0
      } else {
        const blockAll = await usersCollection.updateMany({ blockStatus: false }, { $set: { blockStatus: true } })
        return blockAll.acknowledged
      }
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
      const rep: string[] = []
      const res: boolean[] = []
      rep.map(async (el) => {
        const arr = await usersCollection.deleteOne({ id: el })
        arr.acknowledged === false && res.push(arr.acknowledged)
      })
      res.length === 0 ? true : false
    } catch {
      console.log("Delete is failure")
      return false
    }
  },
}
