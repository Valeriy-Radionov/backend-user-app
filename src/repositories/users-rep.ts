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

export const usersRepository = {
  getUsers() {
    if (users) {
      return users
    } else {
      return null
    }
  },
  blockUser(id: string, isBlocked: boolean) {
    const userId = users.findIndex((el) => el.id === id)
    if (userId) {
      users[userId].blockStatus = isBlocked
      return true
    }
    return false
  },
  deleteUser(id: string) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        users.splice(i, 1)
        return true
      }
    }
    return false
  },
}
