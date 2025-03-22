import createApp from "./app";
import { PORT } from "./config";

const app = createApp()

const port = PORT ?? 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})