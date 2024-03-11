import { Module, EventEmitterModule } from "https://deno.land/x/danet/mod.ts";
import { ProcessController } from "./process.controller.ts";
import { ProcessManager } from "./process.service.ts";

@Module({
  controllers: [
    ProcessController
  ],
  injectables: [
    ProcessManager
  ],
  imports: [EventEmitterModule]
})
export class ProcessModule {}
