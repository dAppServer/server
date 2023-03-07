import { ApiProperty, Optional } from "../../../../deps.ts";

export class MarketplaceGetDTO {
  @ApiProperty()
  @Optional()
  dir?: string;
}
