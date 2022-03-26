import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import { Destination, download } from "https://deno.land/x/download/mod.ts";
import { unZipFromFile } from "https://deno.land/x/zip@v1.1.0/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { copy } from "https://deno.land/std@0.95.0/fs/mod.ts";

import { ZeroMQServer } from "./ipc/zeromq.ts";
import { FilesystemService } from "./filesystem.service.ts";

/**
 * Service for updating the application
 */
export class LetheanUpdater {

  async download(args: any) {

    ZeroMQServer.sendPubMessage(
      "update-cli",
      `Downloading files for ${os.platform()}`
    );

    const url: URL = new URL(this.getUrl("4.0.4"));
    console.info(`Download url: ${url}`)
    const filename = url.pathname.split("/").pop();

    try {
      const destination: Destination = {
        file: filename,
        dir: path.join(Deno.cwd(), 'cli')
      };

      FilesystemService.ensureDir(path.join(Deno.cwd(), 'cli'))
      ZeroMQServer.sendPubMessage(
        "update-cli",
        `Starting download to ${destination.dir}`
      );
      console.info(`Attempting to download ${url}`)
      const fileObj = await download(url, destination);
      console.info(`Downloaded to: ${destination.dir}`)
      ZeroMQServer.sendPubMessage("update-cli", `Downloaded file`);
      //await Deno.remove(path.join(Deno.cwd(),'cli'), { recursive: true})
      ZeroMQServer.sendPubMessage(
        "update-cli",
        `Unpacking Downloaded zip`
      );
      console.info(`Unpacking zip file: ${fileObj.fullPath}`)
      await unZipFromFile(
        fileObj.fullPath,
        path.join(Deno.cwd(), "cli"),
        { includeFileName: false }
      );
      console.info(`Copying files to: ${path.join(Deno.cwd(), "cli")}`)
      await copy(
        path.join(
          Deno.cwd(),
          "cli",
          `${filename?.replace(".zip", "")}`
        ),
        path.join(Deno.cwd(), "cli"),
        { overwrite: true }
      );
      ZeroMQServer.sendPubMessage("update-cli", "Cleaning up");
      console.info("Cleaning up file system")
      try {
        await Deno.remove(
          path.join(
            Deno.cwd(),
            "cli",
            `${filename?.replace(".zip", "")}`
          ),
          { recursive: true }
        );
        await Deno.remove(
          path.join(
            Deno.cwd(),
            "cli",
            '__MACOSX'
          ),
          { recursive: true }
        );
        await Deno.remove(path.join(
          Deno.cwd(),
          'cli',
          filename ? filename : ""
        ));
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
    const base = `https://github.com/letheanVPN/blockchain/releases/download/v${version}/lethean-${version}`;
    let url;
    switch (platform) {
      case "darwin":
        url = base + "-macOS.zip";
        break;
      case "linux":
        url = base + "-linux.zip";
        break;
      case "windows":
        url = base + "-windows.zip";
        break;
    }

    return url
  }
}
