import { MongoClient } from "mongodb"

const mongoURI = process.env.mongoURI || "mongodb://0.0.0.0:27017"
export const client = new MongoClient(mongoURI)

export async function runDb() {
  try {
    await client.connect()
    await client.db("users").command({ ping: 1 })
    console.log("Connect seccessfully to database")
  } catch {
    console.log("Can't connect to database")
    await client.close()
  }
}
