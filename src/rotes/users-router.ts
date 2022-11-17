import { Request, Response, Router } from "express"
import { usersRepository } from "../repositories/users-rep"

export const usersRouter = Router({})

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

usersRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    const id = request.params.id
    const isDeleted = await usersRepository.deleteUser(id)
    if (isDeleted) {
      response.status(201).send(`Successfully! User has been deleted.`)
    }
  } catch {
    response.status(400).send("Failure! User hasn't been deleted")
  }
})

usersRouter.put("/:id", async (request: Request, response: Response) => {
  try {
    const { id, isBlocked } = request.body
    const blockStatus = await usersRepository.blockUser(id, isBlocked)
    if (blockStatus) {
      response.status(200)
    }
  } catch {
    response.status(400).send("Failure")
  }
})
