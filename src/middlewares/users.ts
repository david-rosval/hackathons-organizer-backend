import { NextFunction, Request, Response } from "express";
import { UserSchema } from "../schemas/user";

export class UsersMiddleware {
  validateNewUser = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
  
    const result = UserSchema.safeParse(body)
    if (!result.success) {
      console.log(result.error)
      const issues = result.error.issues.map(issue => issue.message)
      res.status(400).json({ errors: issues })
      return
    }
    next()
  }
}
