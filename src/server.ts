import { ServerService } from "./services/server.service.ts";

console.log("Starting Lethean Server");
const server = new ServerService();

server.warmUpServer().then(() => {
  server.processStartCommand()
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
})
  .catch((err) => console.error(err));
