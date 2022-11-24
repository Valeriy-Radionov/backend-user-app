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

usersRouter.delete("/:id/:isAll", async (request: Request, response: Response<InfoResponseType>) => {
  try {
    const id = request.params.id
    const isAll = JSON.parse(request.params.isAll)
    const isDeleted = await usersRepository.deleteUser(id, isAll)

    if (isDeleted === true) {
      response.status(201).send(createResponse("User has been deleted", 0))
    } else {
      response.status(400).send(createResponse("Not found!", 1))
    }
  } catch {
    response.status(400).send(createResponse("Failure! User hasn't been deleted", 1))
  }
})

usersRouter.put("/:id/:isBlocked", async (request: Request, response: Response<InfoResponseType>) => {
  try {
    const isBlocked = JSON.parse(request.params.isBlocked)
    const id = request.params.id
    console.log(isBlocked)

    const blockUser = await usersRepository.blockUser(id, isBlocked)
    if (blockUser) {
      response.status(201).send(createResponse(`Block status: ${isBlocked}`, 0))
    }
  } catch {
    response.status(400).send(createResponse("Failure! Error request", 1))
  }
})
