import cors from "cors"
import express from "express"
import { runDb } from "./common/database/userDatabase"
import { authRouter } from "./rotes/auth-router"
import { usersRouter } from "./rotes/users-router"

const app = express()
const port = process.env.PORT || 5000

const parser = express.json()
app.use(cors())
app.use(parser)
app.use("/auth", authRouter)
app.use("/users", usersRouter)
const startApp = async () => {
  try {
    await runDb()
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()
