import { Request, Response, Router } from "express"
import { createResponse } from "../common/utils/helpers/responseCreator"
import { usersRepository, UserType } from "../repositories/users-rep"
import { InfoResponseType } from "./auth-router"

export const usersRouter = Router({})
usersRouter.get("/", async (request: Request, response: Response<UserType[] | InfoResponseType | undefined>) => {
  try {
    const users = await usersRepository.getUsers()
    if (users) {
      response.status(201).send(users)
    }
  } catch {
    response.status(401).send(createResponse("Bad request", 1))
  }
})

usersRouter.delete("/:id", async (request: Request, response: Response<InfoResponseType>) => {
  try {
    const id = request.params.id
    const isDeleted = await usersRepository.deleteUser(id)

    if (isDeleted) {
      response.status(201).send(createResponse("User has been deleted", 0))
    } else {
      response.status(401).send(createResponse("Not found!", 1))
    }
  } catch {
    response.status(401).send(createResponse("Failure! User hasn't been deleted", 1))
  }
})

usersRouter.put("/:id", async (request: Request, response: Response<InfoResponseType>) => {
  try {
    const isBlocked = request.body.isBlocked
    const id = request.params.id
    const blockUser = await usersRepository.blockUser(id, isBlocked)
    if (blockUser) {
      response.status(201).send(createResponse(`Block status: ${isBlocked}`, 0))
    }
  } catch {
    response.status(401).send(createResponse("Failure! Error request", 1))
  }
})
