import { Router } from "express";
import { UsersMiddleware } from "../middlewares/users";
import { UsersController } from "../controllers/users";
import { UserModel } from "../models/postgresql/user";

export default function createUsersRouter({ userModel }: { userModel: UserModel }) {
  const userRouter = Router()
  const usersController = new UsersController({ userModel })
  const usersMiddleware = new UsersMiddleware()

  userRouter.get('/', usersController.getAllUsers)

  userRouter.get('/:userId', usersController.getUserById)

  userRouter.post('/', usersMiddleware.validateNewUser, usersController.registerNewUser)

  return userRouter
}