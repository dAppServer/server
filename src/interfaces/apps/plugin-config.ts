export enum PluginType {
  APP = "app",
  BIN = "bin",
  CORE = "core"
}

export interface PluginConfig {
  code: string
  depends: any
  downloads?: PluginDownloads
  app?: {url:string, type: string}
  menu: any
  name: string
  namespace: string
  type: PluginType
  version: string
}

export interface PluginDownloads {
  app: string
  x86_64: any
  aarch64: any
}

