"use strict";
exports.__esModule = true;
exports.decode = exports.encode = exports.addPaddingToBase64url = void 0;
var base64 = require("./base64.ts");
function addPaddingToBase64url(base64url) {
    if (base64url.length % 4 === 2)
        return base64url + "==";
    if (base64url.length % 4 === 3)
        return base64url + "=";
    if (base64url.length % 4 === 1) {
        throw new TypeError("Illegal base64url string!");
    }
    return base64url;
}
exports.addPaddingToBase64url = addPaddingToBase64url;
function convertBase64urlToBase64(b64url) {
    if (!/^[-_A-Z0-9]*?={0,2}$/i.test(b64url)) {
        throw new TypeError("Failed to decode base64url: invalid character");
    }
    return addPaddingToBase64url(b64url).replace(/\-/g, "+").replace(/_/g, "/");
}
function convertBase64ToBase64url(b64) {
    return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function encode(uint8) {
    return convertBase64ToBase64url(base64.encode(uint8));
}
exports.encode = encode;
function decode(b64url) {
    return base64.decode(convertBase64urlToBase64(b64url));
}
exports.decode = decode;
