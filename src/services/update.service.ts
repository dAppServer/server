import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import {Destination, download} from 'https://deno.land/x/download/mod.ts';
import {unZipFromFile} from 'https://deno.land/x/zip@v1.1.0/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {copy} from 'https://deno.land/std@0.95.0/fs/mod.ts';

import {ZeroMQServer} from './ipc/zeromq.ts';

export class LetheanUpdater {
  public static downloads = {
    cli: {
      windows:
          "https://github.com/letheanVPN/lethean/releases/download/v3.1.0/lethean-cli-win-64bit-v3.1.zip",
      linux:
          "https://github.com/letheanVPN/lethean/releases/download/v3.1.0/lethean-cli-linux-64bit-v3.1.zip",
      macos:
          "https://github.com/letheanVPN/lethean/releases/download/v3.1.0/lethean-cli-mac-64bit-v3.1.zip",
    },
  };

  static async download(args: any) {
    let url, platform = os.platform(), homeDir = os.homeDir();

    ZeroMQServer.sendPubMessage("update-cli", `Downloading files for ${platform}`);
    switch (platform) {
      case "darwin":
        url = LetheanUpdater.downloads.cli.macos;
        break;
      case "linux":
        url = LetheanUpdater.downloads.cli.linux;
        break;
      case "windows":
        url = LetheanUpdater.downloads.cli.windows;
        break;
    }
    let filename = url.split("/").pop();
    try {
      const destination: Destination = {
        file: filename,
        dir: path.join(homeDir ? homeDir : "", "Lethean"),
      };
      ZeroMQServer.sendPubMessage("update-cli", `Starting download to ${destination.dir}`);
      const fileObj = await download(url, destination);
      ZeroMQServer.sendPubMessage("update-cli", `Downloaded file`);
      try {
        await Deno.remove(path.join(homeDir ? homeDir : "", "Lethean", "cli"), {
          recursive: true,
        });
      } catch (e) {
      }

      ZeroMQServer.sendPubMessage("update-cli", `Unpacking Downloaded zip`);


      await unZipFromFile(
          fileObj.fullPath,
          path.join(homeDir ? homeDir : "", "Lethean", "cli"),
          { includeFileName: false },
      );

      await copy(
          path.join(
              homeDir
                  ? homeDir
                  : "",
              "Lethean",
              "cli",
              `${filename?.replace(".zip", "")}`,
          ),
          path.join(homeDir ? homeDir : "", "Lethean", "cli"),
          { overwrite: true },
      );
      ZeroMQServer.sendPubMessage("update-cli", "Cleaning up");

      try {
        await Deno.remove(
            path.join(
                homeDir
                    ? homeDir
                    : "",
                "Lethean",
                "cli",
                `${filename?.replace(".zip", "")}`,
            ),
            { recursive: true },
        );
        await Deno.remove(path.join(
            homeDir
                ? homeDir
                : "",
            "Lethean",
            filename ? filename : '',
        ));
        console.log("FIN");
      }catch (e){

      }

    } catch (err) {
      console.log("ERROR, the following log might have helpful information.");
      console.log(err);
    }
    ZeroMQServer.sendPubMessage("update-cli", "Done");
    return "done";
  }

}
