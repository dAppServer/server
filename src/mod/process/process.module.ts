import { Module, EventEmitterModule } from "https://deno.land/x/danet/mod.ts";
import { ProcessController } from "./process.controller.ts";
import { ProcessService } from "./process.service.ts";
import {ProcessListener} from "./process.listener.ts";
import {ProcessWebSocketController} from "@mod/process/process.ws.ts";

@Module({
  controllers: [
    ProcessController
  ],
  injectables: [
    ProcessService,
      ProcessListener
  ],
  imports: [EventEmitterModule]
})
export class ProcessModule {}
