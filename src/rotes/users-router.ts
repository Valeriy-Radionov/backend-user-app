import { Request, Response, Router } from "express"
import { usersRepository } from "../repositories/users-rep"

export const usersRouter = Router({})

usersRouter.get("/", (request: Request, response: Response) => {
  const users = usersRepository.getUsers()
  if (users) {
    response.status(201).send(users)
  } else {
    response.status(400).send("Bad request")
  }
})

usersRouter.delete("/:id", (request: Request, response: Response) => {
  const id = request.params.id
  const isDeleted = usersRepository.deleteUser(id)
  if (isDeleted) {
    response.status(201).send("User is deleted")
  } else {
    response.status(400).send("Failure")
  }
})

usersRouter.put("/:id", (request: Request, response: Response) => {
  const { id, isBlocked } = request.body
  const blockStatus = usersRepository.blockUser(id, isBlocked)
  if (blockStatus) {
    response.status(200)
  } else {
    response.status(400).send("Failure")
  }
})
