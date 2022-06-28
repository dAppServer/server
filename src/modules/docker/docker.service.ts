import Docker from "https://deno.land/x/denocker/index.ts"

export class DockerService {

  public docker: Docker;


  constructor() {
    //try{
      this.docker = new Docker("/var/run/docker.sock");


  }

  async createContainer(name: string, image: string) {
    return await this.docker.containers.create(name, {
      Image: image,
      StopTimeout: 10,
    });
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
