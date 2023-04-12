import { ApiProperty } from "danetSwagger/decorators.ts";

export class FilePathDTO {
  @ApiProperty()
  path!: string;
}

export class CreateFileDTO {
  @ApiProperty()
  path!: string;

  @ApiProperty()
  data!: string;
}
