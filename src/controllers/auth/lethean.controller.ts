import { Post, Body, Tag, Controller, UnauthorizedException, InternalServerErrorException } from "../../../deps.ts";
import { UserRole } from "../../types/user/user-role.ts";
import * as jwt from "../../helpers/jwt.ts";
import { FileSystemService } from "../../services/fileSystemService.ts";
import { OpenPGPService } from "../../services/crypt/openpgp.ts";
import { AuthLetheanService } from "../../services/auth/lethean.service.ts";
import { CreateAccountDTO, CreateAccountResponseDTO, DeleteAccountDTO, EncryptedRequestDTO, EncryptedResponseDTO } from "../../interfaces/encrypted-request.interface.ts";
import { QuasiSalt } from "../../services/crypt/quasi-salt.ts";

@Tag("Auth")
@Controller("auth")
export class AuthLetheanController {

  constructor(private fileService: FileSystemService,
              private openpgp: OpenPGPService,
              private auth: AuthLetheanService) {
  }

  /**
   * Login with Lethean PGP key account
   * @param {EncryptedRequestDTO} body
   * @returns {Promise<EncryptedResponseDTO>}
   */
  @Post("lethean/login")
  async login(@Body() body: EncryptedRequestDTO): Promise<EncryptedResponseDTO> {
    const user = await this.auth.login(atob(body.payload));

    if (user) {
      const content = { id: user, roles: [UserRole.USER] };
      const msg = {
        "access_token": await jwt.getAuthToken(content),
        "refresh_token": await jwt.getRefreshToken(content)
      };

      return {
        "result": btoa(
          await this.openpgp.encryptPGP(user, JSON.stringify(msg))
        )
      };
    } else {
      throw new UnauthorizedException();
    }

  }

  /**
   * Create Lethean account
   * @param {CreateAccountDTO} body
   * @returns {Promise<CreateAccountResponseDTO>}
   */
  @Post("lethean/create")
  async create(@Body() body: CreateAccountDTO): Promise<CreateAccountResponseDTO> {
    try {
      const usernameHash: string = QuasiSalt.hash(body.username);

      const { privateKey, publicKey, revocationCertificate }: any =
        await this.openpgp.createKeyPair(usernameHash, body.password);

      this.fileService.write(`users/${usernameHash}.lthn.pub`, publicKey);

      this.fileService.write(
        `users/${usernameHash}.lthn.rev`,
        revocationCertificate
      );

      this.fileService.write(`users/${usernameHash}.lthn.key`, privateKey);

      this.fileService.write(
        `users/${usernameHash}.lthn`,
        await this.openpgp.encryptPGP(
          usernameHash,
          JSON.stringify({
            username: body.username,
            id: usernameHash,
            created: Date.now()
          })
        )
      );
      return { "userhash": usernameHash, "pubkey": publicKey };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }


  /**
   * Delete Lethean account
   * @param {DeleteAccountDTO} body
   * @returns {boolean}
   */
  @Post("lethean/delete")
  delete(@Body() body: DeleteAccountDTO): boolean {
    try {
      // because someone will do this, we all know it, and it will suck for them
      // if you delete the server .key, all joining data will be lost forever.
      // user data is stored with their key, so if this happens, you will have to
      // re-create the server from scratch and re-join the network, you'll have a bad day.
      if (body.username == "server") {
        return false;
      }
      const usernameHash: string = QuasiSalt.hash(body.username);

      this.fileService.delete(`users/${usernameHash}.lthn.pub`);

      this.fileService.delete(`users/${usernameHash}.lthn.rev`);

      this.fileService.delete(`users/${usernameHash}.lthn.key`);

      this.fileService.delete(`users/${usernameHash}.lthn`);
    } catch (error) {
      return false;
    }
    return true;
  }
}
