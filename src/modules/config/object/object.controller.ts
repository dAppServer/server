import { Body, Controller, Options, Post, Tag } from "../../../../deps.ts";
import { ConfigObjectClearDTO, ConfigObjectCountDTO, ConfigObjectGetDTO, ConfigObjectRemoveDTO, ConfigObjectSetDTO } from "./object.interface.ts";
import { ObjectService } from "./object.service.ts";

@Tag("Config")
@Controller("config/object")
export class ObjectController {

  constructor(private object: ObjectService) {}

  /**
   * Get a config object
   * @param {ConfigObjectGetDTO} body
   * @returns {string | boolean}
   */
  @Post("get")
  public getConfig(@Body() body: ConfigObjectGetDTO) {
    return this.object.getObject(body.group, body.object);
  }

  @Options("get")
  public test() {}
  /**
   * Set a config object
   * @param {ConfigObjectSetDTO} body
   * @returns {boolean}
   */
  @Post("set")
  public setConfig(@Body() body: ConfigObjectSetDTO) {
    return this.object.setObject(body.group, body.object, body.data);
  }

  @Options("set")
  public test2() {}
  /**
   * Remove a config object
   * @param {ConfigObjectRemoveDTO} body
   * @returns {boolean}
   */
  @Post("remove")
  public removeConfig(@Body() body: ConfigObjectRemoveDTO) {
    return this.object.removeObject(body.group, body.object);
  }

  @Options("remove")
  public test3() {}
  /**
   * Clear all config objects for a group
   * @param {ConfigObjectClearDTO} body
   * @returns {boolean}
   */
  @Post("clear")
  public clearConfig(@Body() body: ConfigObjectClearDTO) {
    return this.object.clearObjects(body.group);
  }

  @Options("clear")
  public test4() {}
  /**
   * Count all config objects for a group
   * @param {ConfigObjectCountDTO} body
   * @returns {number}
   */
  @Post("count")
  public countConfig(@Body() body: ConfigObjectCountDTO) {
    return this.object.countObjects(body.group);
  }
  @Options("count")
  public test5() {}
}

