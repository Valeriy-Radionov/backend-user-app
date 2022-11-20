import { Request, Response, Router } from "express"
import { usersRepository } from "../repositories/users-rep"

export const usersRouter = Router({})
//get all users
usersRouter.get("/", async (request: Request, response: Response) => {
  try {
    const users = await usersRepository.getUsers()
    if (users) {
      response.status(201).send(users)
    }
  } catch {
    response.status(400).send("Bad request")
  }
})
//delete user
usersRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    const id = request.params.id
    const isDeleted = await usersRepository.deleteUser(id)

    if (isDeleted) {
      response.status(201).send(isDeleted)
    } else {
      response.status(400).send(`Not found! Response body: ${isDeleted}`)
    }
  } catch {
    response.status(400).send("Failure! User hasn't been deleted")
  }
})
//block user
usersRouter.put("/:id", async (request: Request, response: Response) => {
  try {
    const isBlocked = request.body
    const id = request.params.id
    const blockUser = await usersRepository.blockUser(id, isBlocked)
    if (blockUser) {
      response.status(200).send(blockUser)
    }
  } catch {
    response.status(400).send("Failure")
  }
})
