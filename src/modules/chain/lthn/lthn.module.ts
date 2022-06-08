import { Module } from "../../../../deps.ts";
import { ChainLetheanController } from "./daemon.controller.ts";

@Module({
  controllers: [ChainLetheanController],
})
export class ChainLetheanModule {}
