
const { env } = Deno
const systemPaths:any = {};
/**
 * @description return the system home dir
 * @returns { string }
 * @since v0.1.0
 */
systemPaths.homeDir = (): string => `${env.get('HOME') ?? env.get('USERPROFILE')}`


/**
 * @description return the system Temporary files dir
 * @returns { string }
 * @since v0.1.0
 */
systemPaths.tempDir = (): string => `${env.get('TEMP') ?? env.get('TEMPDIR')}`


export default systemPaths 

