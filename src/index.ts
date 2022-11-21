import express from "express"
import { runDb } from "./common/database/userDatabase"
import { authRouter } from "./rotes/auth-router"
import { usersRouter } from "./rotes/users-router"

const app = express()
const port = process.env.PORT || 5000 || "mongodb+srv://valery1993:8146189Balrek@usertable.3bgeg4p.mongodb.net/?retryWrites=true&w=majority"
const parser = express.json()
// const cors = require("cors")

// app.use(cors())
app.use(parser)
app.use("/auth", authRouter)
app.use("/users", usersRouter)
const startApp = async () => {
  await runDb()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()
