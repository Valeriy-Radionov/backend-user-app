import { MongoClient } from "mongodb"
import { UserType } from "../../repositories/users-rep"

const mongoUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017"
export const client = new MongoClient(mongoUri)
const usersDb = client.db("user")
export const usersCollection = usersDb.collection<UserType>("users")
export async function runDb() {
  try {
    await client.connect()
    await usersDb.command({ ping: 1 })
    console.log("Connect seccessfully to database")
  } catch {
    console.log("Can't connect to database")
    await client.close()
  }
}
