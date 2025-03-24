import createApp from "./app";
import { UserModel } from "./models/postgresql/user";

const userModel = new UserModel()

createApp({ userModel })
