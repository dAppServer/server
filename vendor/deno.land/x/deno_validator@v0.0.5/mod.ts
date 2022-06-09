import toDate from "./lib/toDate.ts";
import toFloat from "./lib/toFloat.ts";
import toInt from "./lib/toInt.ts";
import toBoolean from "./lib/toBoolean.ts";
import equals from "./lib/equals.ts";
import contains from "./lib/contains.ts";
import matches from "./lib/matches.ts";

import isEmail from "./lib/isEmail.ts";
import isURL from "./lib/isURL.ts";
import isMACAddress from "./lib/isMACAddress.ts";
import isIP from "./lib/isIP.ts";
import isIPRange from "./lib/isIPRange.ts";
import isFQDN from "./lib/isFQDN.ts";
import isDate from "./lib/isDate.ts";

import isBoolean from "./lib/isBoolean.ts";
import isLocale from "./lib/isLocale.ts";

import isAlpha, { locales as isAlphaLocales } from "./lib/isAlpha.ts";
import isAlphanumeric, {
  locales as isAlphanumericLocales,
} from "./lib/isAlphanumeric.ts";
import isNumeric from "./lib/isNumeric.ts";
import isPassportNumber from "./lib/isPassportNumber.ts";
import isPort from "./lib/isPort.ts";
import isLowercase from "./lib/isLowercase.ts";
import isUppercase from "./lib/isUppercase.ts";

import isIMEI from "./lib/isIMEI.ts";

import isAscii from "./lib/isAscii.ts";
import isFullWidth from "./lib/isFullWidth.ts";
import isHalfWidth from "./lib/isHalfWidth.ts";
import isVariableWidth from "./lib/isVariableWidth.ts";
import isMultibyte from "./lib/isMultibyte.ts";
import isSemVer from "./lib/isSemVer.ts";
import isSurrogatePair from "./lib/isSurrogatePair.ts";

import isInt from "./lib/isInt.ts";
import isFloat, { locales as isFloatLocales } from "./lib/isFloat.ts";
import isDecimal from "./lib/isDecimal.ts";
import isHexadecimal from "./lib/isHexadecimal.ts";
import isOctal from "./lib/isOctal.ts";
import isDivisibleBy from "./lib/isDivisibleBy.ts";

import isHexColor from "./lib/isHexColor.ts";
import isRgbColor from "./lib/isRgbColor.ts";
import isHSL from "./lib/isHSL.ts";

import isISRC from "./lib/isISRC.ts";

import isIBAN from "./lib/isIBAN.ts";
import isBIC from "./lib/isBIC.ts";

import isMD5 from "./lib/isMD5.ts";
import isHash from "./lib/isHash.ts";
import isJWT from "./lib/isJWT.ts";

import isJSON from "./lib/isJSON.ts";
import isEmpty from "./lib/isEmpty.ts";

import isLength from "./lib/isLength.ts";
import isByteLength from "./lib/isByteLength.ts";

import isUUID from "./lib/isUUID.ts";
import isMongoId from "./lib/isMongoId.ts";

import isAfter from "./lib/isAfter.ts";
import isBefore from "./lib/isBefore.ts";

import isIn from "./lib/isIn.ts";

import isCreditCard from "./lib/isCreditCard.ts";
import isIdentityCard from "./lib/isIdentityCard.ts";

import isEAN from "./lib/isEAN.ts";
import isISIN from "./lib/isISIN.ts";
import isISBN from "./lib/isISBN.ts";
import isISSN from "./lib/isISSN.ts";
import isTaxID from "./lib/isTaxID.ts";

import isMobilePhone, {
  locales as isMobilePhoneLocales,
} from "./lib/isMobilePhone.ts";

import isEthereumAddress from "./lib/isEthereumAddress.ts";

import isCurrency from "./lib/isCurrency.ts";

import isBtcAddress from "./lib/isBtcAddress.ts";

import isISO8601 from "./lib/isISO8601.ts";
import isRFC3339 from "./lib/isRFC3339.ts";
import isISO31661Alpha2 from "./lib/isISO31661Alpha2.ts";
import isISO31661Alpha3 from "./lib/isISO31661Alpha3.ts";

import isBase32 from "./lib/isBase32.ts";
import isBase58 from "./lib/isBase58.ts";
import isBase64 from "./lib/isBase64.ts";
import isDataURI from "./lib/isDataURI.ts";
import isMagnetURI from "./lib/isMagnetURI.ts";

import isMimeType from "./lib/isMimeType.ts";

import isLatLong from "./lib/isLatLong.ts";
import isPostalCode, {
  locales as isPostalCodeLocales,
} from "./lib/isPostalCode.ts";

import ltrim from "./lib/ltrim.ts";
import rtrim from "./lib/rtrim.ts";
import trim from "./lib/trim.ts";
import escape from "./lib/escape.ts";
import unescape from "./lib/unescape.ts";
import stripLow from "./lib/stripLow.ts";
import whitelist from "./lib/whitelist.ts";
import blacklist from "./lib/blacklist.ts";
import isWhitelisted from "./lib/isWhitelisted.ts";

import normalizeEmail from "./lib/normalizeEmail.ts";

import isSlug from "./lib/isSlug.ts";
import isLicensePlate from "./lib/isLicensePlate.ts";
import isStrongPassword from "./lib/isStrongPassword.ts";

import isVAT from "./lib/isVAT.ts";

const version = "13.6.0";

export {
  version,
  toDate,
  toFloat,
  toInt,
  toBoolean,
  equals,
  contains,
  matches,
  isEmail,
  isURL,
  isMACAddress,
  isIP,
  isIPRange,
  isFQDN,
  isBoolean,
  isIBAN,
  isBIC,
  isAlpha,
  isAlphaLocales,
  isAlphanumeric,
  isAlphanumericLocales,
  isNumeric,
  isPassportNumber,
  isPort,
  isLowercase,
  isUppercase,
  isAscii,
  isFullWidth,
  isHalfWidth,
  isVariableWidth,
  isMultibyte,
  isSemVer,
  isSurrogatePair,
  isInt,
  isIMEI,
  isFloat,
  isFloatLocales,
  isDecimal,
  isHexadecimal,
  isOctal,
  isDivisibleBy,
  isHexColor,
  isRgbColor,
  isHSL,
  isISRC,
  isMD5,
  isHash,
  isJWT,
  isJSON,
  isEmpty,
  isLength,
  isLocale,
  isByteLength,
  isUUID,
  isMongoId,
  isAfter,
  isBefore,
  isIn,
  isCreditCard,
  isIdentityCard,
  isEAN,
  isISIN,
  isISBN,
  isISSN,
  isMobilePhone,
  isMobilePhoneLocales,
  isPostalCode,
  isPostalCodeLocales,
  isEthereumAddress,
  isCurrency,
  isBtcAddress,
  isISO8601,
  isRFC3339,
  isISO31661Alpha2,
  isISO31661Alpha3,
  isBase32,
  isBase58,
  isBase64,
  isDataURI,
  isMagnetURI,
  isMimeType,
  isLatLong,
  ltrim,
  rtrim,
  trim,
  escape,
  unescape,
  stripLow,
  whitelist,
  blacklist,
  isWhitelisted,
  normalizeEmail,
  // toString, // todo cannot find it 
  isSlug,
  isStrongPassword,
  isTaxID,
  isDate,
  isLicensePlate,
  isVAT,
}
