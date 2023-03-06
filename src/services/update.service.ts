import {
  copy,
  decompress,
  ensureDir,
  ensureFile,
  os,
  path,
  Untar,
} from "../../deps.ts";

import { ZeroMQServer } from "../modules/io/ipc/zeromq.ts";
import { FileSystemService } from "src/modules/io/filesystem/fileSystemService.ts";
import { Destination, LetheanDownloadService } from "./download.service.ts";

/**
 * Service for updating the application
 */
export class LetheanUpdater {
  async download() {
    const url: URL = new URL(this.getUrl("4.0.7"));

    const filename: string = url.pathname.split("/").pop() ?? "";

    try {
      const destination: Destination = {
        file: filename,
        dir: path.join(Deno.cwd(), "cli"),
      };

      FileSystemService.ensureDir(path.join(Deno.cwd(), "cli"));

      console.info(`Attempting to download ${url}`);
      const fileObj = await LetheanDownloadService.download(url, destination);
      console.info(`Downloaded to: ${destination.dir}`);

      console.info(`Unpacking file: ${fileObj.fullPath}`);

      if (filename.endsWith(".zip")) {
        await decompress(fileObj.fullPath, destination.dir);
      } else if (filename.endsWith(".tar")) {
        const reader = await Deno.open(fileObj.fullPath, { read: true });
        const untar = new Untar(reader);

        for await (const entry of untar) {
          if (entry.type === "directory") {
            await ensureDir(path.join(Deno.cwd(), "cli", entry.fileName));
            continue;
          }

          await Deno.writeFile(
            path.join(Deno.cwd(), "cli", entry.fileName),
            new Uint8Array(),
            { mode: 0o777 },
          );
          const file = await Deno.open(
            path.join(Deno.cwd(), "cli", entry.fileName),
            { write: true },
          );
          await copy(entry, file);
        }
        reader.close();
      }
      console.info("Cleaning up file system");
      try {
        await Deno.remove(
          path.join(
            Deno.cwd(),
            "cli",
            filename,
          ),
          { recursive: true },
        );
      } catch (e) {
        console.error(e);
      }
    } catch (err) {
      console.error(err);
    }
    ZeroMQServer.sendPubMessage("update-cli", "Done");
  }

  /**
   * Get the url for the update
   * @param version The version to get the url for
   */
  getUrl(version: string) {
    const platform = os.platform();
    const base =
      `https://github.com/letheanVPN/blockchain/releases/latest/download/`;
    let url;
    switch (platform) {
      case "darwin":
        url = base + "lethean-cli-macos.zip";
        break;
      case "linux":
        url = base + "linux.tar";
        break;
      case "windows":
        url = base + "windows.tar";
        break;
    }

    return url;
  }
}
