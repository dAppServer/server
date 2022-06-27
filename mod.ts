import { AppController } from "./src/app.controller.ts";


const app = new AppController()

app.startServer().then((r: any) => console.log(r));
