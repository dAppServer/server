import { Post, Controller, Logger, Body } from "danet/mod.ts";
import { Tag } from "danetSwagger/decorators.ts";
import { LetheanDownloadService } from "@mod/io/protocols/http/download/client.service.ts";
import { DownloadDestination, DownloadedFile, FileDownloadRequest } from "@mod/io/protocols/http/download/client.interface.ts";


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
