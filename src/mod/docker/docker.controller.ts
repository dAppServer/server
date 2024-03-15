import {Controller, Get, Post, Body, Req, Param} from "https://deno.land/x/danet/mod.ts";
import {Tag, ReturnedType} from "https://deno.land/x/danet_swagger/decorators.ts";
import {DockerService} from "@mod/docker/docker.service.ts";
import {
    Container,
    ContainerCreateDTO,
    ContainerCreateRequest,
    ContainerCreateResponse
} from "@mod/docker/dto/container.create.ts";
@Tag("Docker")
@Controller("docker")
export class DockerController {
    constructor(private docker: DockerService) {

    }

    @Get('container/list')
    async listContainers(): Promise<any[]>{
        return await this.docker.listContainers();
    }

    @Post('container/create/:id')
    @ReturnedType(ContainerCreateResponse)
    async createContainer(@Param('id') name, @Body() payload: Container): Promise<ContainerCreateResponse>{
        return await this.docker.createContainer(name, payload);

    }

    @Get('container/start/:id')
    async startContainer(@Param('id') id: string): Promise<any>{
        return await this.docker.startContainer(id);
    }

    @Get('container/stop/:id')
    async stopContainer(@Param('id') id: string): Promise<any>{
        return await this.docker.stopContainer(id);
    }

    @Get('container/kill/:id')
    async killContainer(@Param('id') id: string): Promise<any>{
        return await this.docker.killContainer(id);
    }

    @Get('container/remove/:id')
    async removeContainer(@Param('id') id: string): Promise<any>{
        return await this.docker.removeContainer(id);
    }

    @Get('container/inspect/:id')
    async inspectContainer(@Param('id') id: string): Promise<any>{
        return await this.docker.inspectContainer(id);
    }

    @Get('image/list')
    async listImages(): Promise<any[]>{
        return await this.docker.listImages();
    }



}
