import Docker from "https://deno.land/x/denocker/index.ts"
import { ContainerCreate } from "https://deno.land/x/denocker/types.ts";

export class DockerService {

  public docker: Docker;


  constructor() {

      this.docker = new Docker("/var/run/docker.sock");

  }

  async createContainer(name: string, req: ContainerCreate) {
    return await this.docker.containers.create(name, req);
  }

  async listContainers() {
    return await this.docker.containers.list({ all: true });
  }

  async startContainer(id: string){
    return await this.docker.containers.start(id);
  }

  async stopContainer(id: string){
    return await this.docker.containers.stop(id);
  }

  async killContainer(id: string){
    return await this.docker.containers.kill(id);
  }

  async restartContainer(id: string){
    return await this.docker.containers.restart(id);
  }

  async deleteContainer(id: string){
    return await this.docker.containers.rm(id);
  }


}
