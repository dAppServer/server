import { he, Command } from '../../deps.ts'
const td = (d: Uint8Array) => new TextDecoder().decode(d);

export class LetheanAccount {


  static create(username: string, password: string) {
    //const salt = this.generateSalt()
    //const hash = this.hash(password, salt)
    return  {
      username: username,
      salt: 'salt',
      hash: 'hash',
      created: Date.now(),
      last_login: Date.now(),
      last_ip: "deno"
    }
  }

  public static config() {
    return new Command().description("Lethean Account Management")
      .command("create", "Create an keypair")
      .action((args) => console.log(JSON.stringify(LetheanAccount.create(args.username, args.password))))
  }
}
