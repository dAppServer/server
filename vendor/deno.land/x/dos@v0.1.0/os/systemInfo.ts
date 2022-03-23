import arch from 'https://deno.land/x/arch@v1.0.0/mod.ts';

const { os } = Deno.build


const systemInfo:any = {}


/**
 * @description return the os platform name
 * @returns { string } "darwin" | "linux" | "windows"
 * @since v0.1.0
 */
systemInfo.platform = (): string => os


/**
 * @description return the os architecture 
 * @returns { Promise<string> } "x86" | "x64"
 * @since v0.1.0 
 */
systemInfo.arch = async (): Promise<string> => await arch()

export default systemInfo