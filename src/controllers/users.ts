import { Request, Response } from "express";
import { UserModel } from "../models/postgresql/user";


export class UsersController {
  userModel: UserModel;

  constructor({ userModel }: { userModel: UserModel }) {
    this.userModel = userModel
  }

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const result = await this.userModel.getAllUsers()
      res.json(result)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      }
    }
  }

  getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
      const result = await this.userModel.getUserById({ userId })
      res.json(result)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      }
    }
  }

  registerNewUser = async (req: Request, res: Response) => {
    const { body } = req
    try {
      const result = await this.userModel.registerNewUser({ newUser: body })
      res.json(result)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      }
    }
  }
}