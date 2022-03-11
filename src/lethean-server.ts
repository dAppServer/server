import { ServerService } from "./services/server.service.ts";

console.log("Starting Lethean Server");
const letheanServer = new ServerService();

letheanServer.warmUpServer().then(() => {
  letheanServer.processStartCommand()
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
})
  .catch((err) => console.error(err));
