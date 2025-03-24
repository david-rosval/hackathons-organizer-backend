import express from "express"
import { PORT } from "./config"
import createUsersRouter from "./routes/users"
import { UserModel } from "./models/postgresql/user"

const port = PORT ?? 3000

export default function createApp({ userModel }: { userModel: UserModel }) {
  const app = express()

  app.use(express.json())

  app.get("/", async (_req, res) => {
    res.json({ message: "Express with typescript" })
  })

  app.use("/users", createUsersRouter({ userModel }))

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
} 