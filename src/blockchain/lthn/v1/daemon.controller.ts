import {Controller} from "https://deno.land/x/danet/mod.ts";
import {Get, Post} from "https://deno.land/x/danet_swagger@2.0.0/deps.ts";
import {ProcessService} from "../../../mod/process/process.service.ts";
import {Tag} from "https://deno.land/x/danet_swagger@2.0.0/decorators.ts";

@Controller("/api/blockchain/lthn/v1/daemon")
@Tag('blockchain-lthn-v1-daemon')
export class BlockchainLTHNV1DaemonController {

    constructor(private process: ProcessService) {
    }

    @Get('')
    async getDaemonStatus() {
        return {
            status: "running"
        };
    }

    @Post()
    async startDaemon() {
        const { code } =  await this.process.start('letheand' )
        return { code, msg: "Daemon started" }
    }
    //
    // @Delete()
    // async stopDaemon() {
    //     return {
    //         status: "stopped"
    //     };
    // }
    //
    // @Put()
    // async restartDaemon() {
    //     return {
    //         status: "running"
    //     };
    // }
    //
    // @Get("/info")
    // async getDaemonInfo() {
    //     return {
    //         status: "running",
    //         version: "1.0.0"
    //     };
    // }
    //
    // @Get("/log")
    // async getDaemonLog() {
    //     return {
    //         log: "log"
    //     };
    // }
    //
    // @Get("/log/:id")
    // async getDaemonLogById() {
    //     return {
    //         log: "log"
    //     };
    // }
    //
    // @Get("/log/:id/:line")
    // async getDaemonLogByIdLine() {
    //     return {
    //         log: "log"
    //     };
    // }
    //
    // @Get("/log/:id/:line/:size")
    // async getDaemonLogByIdLineSize() {
    //     return {
    //         log: "log"
    //     };
    // }
    //
    // @Get("/log/:id/:line/:size/:from")
    // async getDaemonLogByIdLineSizeFrom() {
    //     return {
    //         log: "log"
    //     };
    // }
    //
    // @Get("/log/:id/:line/:size/:from/:to")
    // async getDaemonLogByIdLineSizeFromTo() {
    //     return {
    //         log: "log"
    //     };
    // }
    //
    // @Get("/log/:id/:line/:size/:from/:to/:filter")
    // async getDaemonLogByIdLineSizeFromToFilter() {
    //     return {
    //
}