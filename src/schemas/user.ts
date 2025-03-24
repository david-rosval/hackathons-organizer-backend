import { z } from "zod";

export const UserSchema = z.object({
  name: z.string({ required_error: 'Name is a required value' }),
  email: z.string({ required_error: 'Email is a required value' }).email({ message: "Invalid email address" }),
  password: z.string({ required_error: 'Password is a required value' }).min(8, { message: 'Password must be 8 or more characters long' }),
  userRole: z.enum(['organizer', 'participant'], { message: "UserRole accepted values are only 'organizer' or 'participant'" })
})