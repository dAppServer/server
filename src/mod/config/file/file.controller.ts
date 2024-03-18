import { Body, Controller, Post } from "https://deno.land/x/danet/mod.ts";
import { Tag } from "https://deno.land/x/danet_swagger/decorators.ts";
import {ConfigFileService} from "./file.service.ts";
import {ObjectService} from "../object/object.service.ts";
import {
  ConfigFileLoadDTO,
  ConfigFileRenderAndLoadDTO,
  ConfigFileRenderDTO,
  ConfigFileRenderStringDTO
} from "./file.interface.ts";

@Tag("Config")
@Controller("config/storage")
export class FileController {

  constructor(private file: ConfigFileService, private object: ObjectService) {}

  /**
   * Render a template storage
   * @param {ConfigFileRenderDTO} body
   * @returns {Promise<any>}
   */
  @Post("render")
  async render(@Body() body: ConfigFileRenderDTO) {
    return await this.file.renderTemplateFile(body.file, body.model)
  }

  /**
   * Render a template string
   * @param {ConfigFileRenderStringDTO} body
   * @returns {Promise<any>}
   */
  @Post("renderString")
  async renderString(@Body() body: ConfigFileRenderStringDTO) {
    return await this.file.renderTemplateString(body.template, body.model)
  }

  /**
   * Load a template storage
   * @param {ConfigFileLoadDTO} body
   * @returns {string | boolean}
   */
  @Post("load")
  load(@Body() body: ConfigFileLoadDTO) {
    return this.file.loadFile(body.filename)
  }

  /**
   * Render a template storage and load it with a model
   * @param {ConfigFileRenderAndLoadDTO} body
   * @returns {Promise<any>}
   */
  @Post("renderAndLoad")
  async renderAndLoad(@Body() body: ConfigFileRenderAndLoadDTO) {
    const model = this.object.getObject(body.model.group, body.model.object)
    return await this.file.renderTemplateFile(body.file, model)

  }
}
