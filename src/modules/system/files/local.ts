import { Body, Controller, Injectable, Post, UseGuards, HttpException } from "../../../../deps.ts";
import {FileSystemService} from "../../../services/fileSystemService.ts";
import { userGuard } from "../../../middleware/user-guard.ts";


@Controller("system/files")
@Injectable()
@UseGuards(userGuard)
export class SystemFilesController {

    @Post("list")
    listFiles(@Body("path") path: string) {
        try {
            const req = FileSystemService.list(path);
            return JSON.stringify(req);
        } catch (e) {
            throw new HttpException("Not Found", 404)
        }


    }

    @Post("path")
    path(@Body("convert") convert: string) {
        return FileSystemService.path(convert);

    }

    @Post("read")
    pathLookup(@Body("path") path: string) {

        const req = FileSystemService.read(path);
        if (!req) {
            throw new HttpException("Not found", 404)
        } else {
            return btoa(req);
        }

    }

    @Post("write")
    writeFile(@Body("path") path: string,
              @Body("data") data: string) {

        try {
            FileSystemService.write(path, atob(data));
        } catch (e) {
            throw new HttpException("Write Failed", 500)
        }
        return true;
    }

    @Post("file-check")
    fileCheck(@Body("path") path: any) {

        try {
            return JSON.stringify({"result": FileSystemService.isFile(path)});
        } catch (e) {
            throw new HttpException("Not found", 404)
        }

    }

    @Post("dir-check")
    dirCheck(@Body("path") path: string) {

        try {
            return JSON.stringify({"result": FileSystemService.isDir(path)});
        } catch (e) {
            throw new HttpException("Not found", 404)

        }
    }

}
