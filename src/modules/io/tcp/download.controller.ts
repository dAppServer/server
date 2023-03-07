import { Post, Tag, Controller, Logger, Body } from "../../../../deps.ts";
import { LetheanDownloadService } from "./download.service.ts";
import { DownloadDestination, DownloadedFile, FileDownloadRequest } from "./download.interface.ts";


@Tag("Input/Output")
@Controller("/io/download")
export class DownloadController {

  constructor(private downloadService: LetheanDownloadService) {}
  private logger: Logger = new Logger('LetheanServer');
  @Post("fetch")
  async fetchFile(@Body() body: FileDownloadRequest): Promise<DownloadedFile> {
    this.logger.log(`Downloading file from ${body.url} to ${body.dir}`);
    const destination = new DownloadDestination(body.file, body.dir, body.mode)
    return await this.downloadService.download(new URL(body.url), destination)
  }

}
