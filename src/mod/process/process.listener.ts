import {
    OnEvent
} from "https://deno.land/x/danet/mod.ts";

export class ProcessListener {

    @OnEvent('process.stdout')
    onStdOut(data: string) {
        console.log(data);
    }

    @OnEvent('process.stderr')
    onStdErr(data: string) {
        console.log(data);
    }
}