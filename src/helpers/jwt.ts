
import {
  Header, Payload,
  create, validate, verify, decode, getNumericDate
} from "https://deno.land/x/djwt@v2.4/mod.ts";
import { ServerService } from "../services/server.service.ts";
;
const  JWT_ACCESS_TOKEN_EXP = '600'
  const  JWT_REFRESH_TOKEN_EXP = '600'


const header: Header = {
  alg: "HS512",
  typ: "JWT",
};

const getAuthToken = async (user: any) => {
  const payload: Payload = {
    iss: "lthn-api",
    id: user.id,
    roles: user.roles,
    exp: getNumericDate(parseInt(JWT_ACCESS_TOKEN_EXP)),
  };

  return await create(header, payload, ServerService.JWT);
};

const getRefreshToken = async (user: any) => {
  const payload: Payload = {
    iss: "lthn-api",
    id: user.id,
    exp: getNumericDate(parseInt(JWT_REFRESH_TOKEN_EXP)),
  };

  return await create(header, payload, ServerService.JWT);
};

const getJwtPayload = async (token: string): Promise<any | null> => {
  try {
    const jwtObject =  await verify(token, ServerService.JWT);
    //console.log(jwtObject);
    if (jwtObject && jwtObject.id) {
      return jwtObject;
    }
  } catch (err) {}
  return null;
};

export { getAuthToken, getJwtPayload, getRefreshToken };
