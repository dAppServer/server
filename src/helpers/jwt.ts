
import {
  Header, Payload,
  create, validate, verify, decode, getNumericDate
} from "https://deno.land/x/djwt@v2.4/mod.ts";

const JWT_TOKEN_SECRET = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
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

  return await create(header, payload, JWT_TOKEN_SECRET);
};

const getRefreshToken = async (user: any) => {
  const payload: Payload = {
    iss: "lthn-api",
    id: user.id,
    exp: getNumericDate(parseInt(JWT_REFRESH_TOKEN_EXP)),
  };

  return await create(header, payload, JWT_TOKEN_SECRET);
};

const getJwtPayload = async (token: string): Promise<any | null> => {
  try {
    const jwtObject =  await verify(token, JWT_TOKEN_SECRET);
    if (jwtObject && jwtObject.payload) {
      return jwtObject.payload;
    }
  } catch (err) {}
  return null;
};

export { getAuthToken, getJwtPayload, getRefreshToken };
