import { ApiProperty } from "https://deno.land/x/danet_swagger/decorators.ts";
import { ConfigObjectGetDTO } from "@mod/config/object/object.interface.ts";

export class ConfigFileRenderDTO {
  @ApiProperty()
  file: string;
  @ApiProperty()
  model: any;
}

export class ConfigFileRenderAndLoadDTO {
  @ApiProperty()
  file: string;
  @ApiProperty()
  model: ConfigObjectGetDTO;
}

export class ConfigFileRenderStringDTO {
  @ApiProperty()
  template: string;
  @ApiProperty()
  model: any;
}

export class ConfigFileLoadDTO {
  @ApiProperty()
  filename: string;
}
