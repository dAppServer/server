import { Body, Controller, Post } from "danet/mod.ts";
import { Tag } from "danetSwagger/decorators.ts";
import { ConfigFileService } from "@module/config/file/file.service.ts";
import { ConfigFileLoadDTO, ConfigFileRenderAndLoadDTO, ConfigFileRenderDTO, ConfigFileRenderStringDTO } from "@module/config/file/file.interface.ts";
import { ObjectService } from "@module/config/object/object.service.ts";

@Tag("Config")
@Controller("config/file")
export class FileController {

  constructor(private file: ConfigFileService, private object: ObjectService) {}

  /**
   * Render a template file
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
   * Load a template file
   * @param {ConfigFileLoadDTO} body
   * @returns {string | boolean}
   */
  @Post("load")
  load(@Body() body: ConfigFileLoadDTO) {
    return this.file.loadFile(body.filename)
  }

  /**
   * Render a template file and load it with a model
   * @param {ConfigFileRenderAndLoadDTO} body
   * @returns {Promise<any>}
   */
  @Post("renderAndLoad")
  async renderAndLoad(@Body() body: ConfigFileRenderAndLoadDTO) {
    const model = this.object.getObject(body.model.group, body.model.object)
    return await this.file.renderTemplateFile(body.file, model)

  }
}
