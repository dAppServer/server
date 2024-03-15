import {assertEquals} from "https://deno.land/std@0.129.0/testing/asserts.ts";
import {ProcessService} from "@mod/process/process.service.ts";

const process = new ProcessService();
// Deno.test("ClientService.isDir", async () => {
//
//     const proc = await process.run('ls', ['-l', '.'])
//     //console.log(proc)
//
//     // assertEquals(
//     //     filesystem.isDir("/"),
//     //     true,
//     //     `${Deno.cwd()} is not a directory`,
//     // );
// });
