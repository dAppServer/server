import { IniService } from "/modules/config/ini/ini.service.ts";
import { Body, Controller, Post, Tag } from "/deps.ts";
import { INIObjectParseJSONDTO } from "/modules/config/ini/ini.interface.ts";

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
