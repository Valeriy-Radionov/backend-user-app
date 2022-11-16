import express from "express"
import { authRouter } from "./rotes/auth-router"
import { usersRouter } from "./rotes/users-router"

const app = express()
const port = process.env.PORT || 5000
const parser = express.json()
app.use(parser)
app.use("/auth", authRouter)
app.use("/users", usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
