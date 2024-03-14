import { ApiProperty } from "https://deno.land/x/danet_swagger/decorators.ts";

export interface ProcessManagerRequest {
  key: string;
  command: any;
  stdOut: any;
  stdIn: any;
  stdErr: any;
}

export class ProcessKillDTO {
  @ApiProperty()
  key: string;
}

export class ProcessStopDTO {
  @ApiProperty()
  key: string;
}

export class ProcessStartDTO {
  @ApiProperty()
  key: string;
}

export class ProcessAddDTO implements ProcessManagerRequest {
  @ApiProperty()
  key: string;
  @ApiProperty()
  command: string;
  @ApiProperty()
  stdOut: any;
  @ApiProperty()
  stdIn: any;
  @ApiProperty()
  stdErr: any;
}

export class ProcessRunDTO {
  @ApiProperty()
  command: string;
  @ApiProperty()
  args: string;
  @ApiProperty()
  options: ProcessAddDTO;
}
