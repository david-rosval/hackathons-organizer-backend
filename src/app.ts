import express, { Request, Response } from "express"

export default function createApp() {
  const app = express()

  

  app.get("/", (req, res) => {
    res.json({ message: "Express with typescript" })
  })

  return app
}