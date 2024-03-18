import { Post, Controller, Logger, Body } from "https://deno.land/x/danet/mod.ts";
import { Tag } from "https://deno.land/x/danet_swagger/decorators.ts";
import { LetheanDownloadService } from "./client.service.ts";
import { DownloadDestination, DownloadedFile, FileDownloadRequest } from "./client.interface.ts";


@Tag("Input/Output")
@Controller("/io/download")
export class DownloadClientController {

  constructor(private downloadService: LetheanDownloadService) {}
  private logger: Logger = new Logger('LetheanServer');
  @Post("fetch")
  async fetchFile(@Body() body: FileDownloadRequest): Promise<DownloadedFile> {
    this.logger.log(`Downloading file from ${body.url} to ${body.dir}`);
    const destination = new DownloadDestination(body.file, body.dir, body.mode)
    return await this.downloadService.download(new URL(body.url), destination)
  }

}
