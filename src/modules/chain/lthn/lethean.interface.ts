import { ApiProperty, Optional } from "danetSwagger/decorators.ts";


export class BlockchainLetheanDaemonStartDTO {
  @ApiProperty()
  configFile: string;
  @ApiProperty()
  dataDir: string;
  @ApiProperty()
  logDir: string;

}

export class BlockchainLetheanRPCDTO {
  @ApiProperty()
  url: string;
  @ApiProperty()
  req: string;

}

export class BlockchainLetheanWalletStartDTO {
  @ApiProperty()
  configFile: string;
  @ApiProperty()
  dataDir: string;
  @ApiProperty()
  logDir: string;

}
