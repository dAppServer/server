import { ApiProperty } from "https://deno.land/x/danet_swagger/decorators.ts";

export class QuasiSaltHashDTO {
  @ApiProperty()
  input: string;
}

export class QuasiSaltHashVerifyDTO {
  @ApiProperty()
  input: string;
  @ApiProperty()
  hash: string;
}
