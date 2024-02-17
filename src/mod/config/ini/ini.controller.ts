import { IniService } from "@mod/config/ini/ini.service.ts";
import { Body, Controller, Post } from "https://deno.land/x/danet/mod.ts";
import { Tag } from "https://deno.land/x/danet_swagger/decorators.ts";
import { INIObjectParseJSONDTO } from "@mod/config/ini/ini.interface.ts";

@Tag("Config")
@Controller("config/ini")
export class IniController {

  constructor(private iniService: IniService) {}

  /**
   * Parse an ini string and return a json object
   * @param {INIObjectParseJSONDTO} body
   * @returns {INIObject}
   */
  @Post("parseJSON")
  public parse(@Body() body: INIObjectParseJSONDTO) {
    return this.iniService.parse(body.data)
  }

}
