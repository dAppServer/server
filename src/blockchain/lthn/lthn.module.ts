import {Module} from "https://deno.land/x/danet/mod.ts";
import {BlockchainLTHNV1DaemonController} from "./v1/daemon.controller.ts";

@Module({
    controllers: [
        BlockchainLTHNV1DaemonController
    ],
    injectables: [

    ],
})
export class BlockchainLTHNModule {}