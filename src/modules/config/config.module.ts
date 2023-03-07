import { Module } from "../../../deps.ts";
import { ObjectController } from "./object.controller.ts";
import { ObjectService } from "./object.service.ts";

@Module({
  controllers: [
    ObjectController
  ],
  injectables: [
    ObjectService
  ],
})
export class ConfigModule {}
