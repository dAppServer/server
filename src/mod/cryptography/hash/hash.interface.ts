import { ApiProperty } from "https://deno.land/x/danet_swagger/decorators.ts";

export class HashDTO {
  @ApiProperty()
  input: string;
}
