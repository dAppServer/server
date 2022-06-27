
import { path } from "../../deps.ts";
import { assertEquals } from "../../deps-test.ts";
import { DockerService } from "../../src/modules/docker/docker.service.ts";

Deno.test("DockerService.listContainers", async () => {
  const docker = new DockerService()
  const containers = await docker.listContainers()
  assertEquals(containers[0].Id != undefined, true)
});

Deno.test("DockerService.createContainer", async () => {
  const docker = new DockerService()
  const container = await docker.createContainer('LetheanTest', 'lthn/chain:latest')
  console.log(container)
});
