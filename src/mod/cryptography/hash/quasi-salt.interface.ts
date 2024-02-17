import { ApiProperty } from "danetSwagger/decorators.ts";

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
