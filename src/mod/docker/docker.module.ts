import { Module } from "https://deno.land/x/danet/mod.ts";
import {DockerService} from "@mod/docker/docker.service.ts";
import {DockerController} from "@mod/docker/docker.controller.ts";

@Module({
  controllers: [
    DockerController
  ],
  injectables: [
    DockerService
  ],
  imports: []
})
export class DockerModule {}
