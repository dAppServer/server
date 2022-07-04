"use strict";
exports.__esModule = true;
exports.getAlgorithm = exports.verify = void 0;
function isHashedKeyAlgorithm(algorithm) {
    var _a;
    return typeof ((_a = algorithm.hash) === null || _a === void 0 ? void 0 : _a.name) === "string";
}
function isEcKeyAlgorithm(algorithm) {
    return typeof algorithm.namedCurve === "string";
}
function verify(alg, key) {
    if (alg === "none") {
        if (key !== null)
            throw new Error("The alg '".concat(alg, "' does not allow a key."));
        else
            return true;
    }
    else {
        if (!key)
            throw new Error("The alg '".concat(alg, "' demands a key."));
        var keyAlgorithm = key.algorithm;
        var algAlgorithm = getAlgorithm(alg);
        if (keyAlgorithm.name === algAlgorithm.name) {
            if (isHashedKeyAlgorithm(keyAlgorithm)) {
                return keyAlgorithm.hash.name === algAlgorithm.hash.name;
            }
            else if (isEcKeyAlgorithm(keyAlgorithm)) {
                return keyAlgorithm.namedCurve === algAlgorithm.namedCurve;
            }
        }
        return false;
    }
}
exports.verify = verify;
function getAlgorithm(alg) {
    switch (alg) {
        case "HS256":
            return { hash: { name: "SHA-256" }, name: "HMAC" };
        case "HS384":
            return { hash: { name: "SHA-384" }, name: "HMAC" };
        case "HS512":
            return { hash: { name: "SHA-512" }, name: "HMAC" };
        case "PS256":
            return {
                hash: { name: "SHA-256" },
                name: "RSA-PSS",
                saltLength: 256 >> 3
            };
        case "PS384":
            return {
                hash: { name: "SHA-384" },
                name: "RSA-PSS",
                saltLength: 384 >> 3
            };
        case "PS512":
            return {
                hash: { name: "SHA-512" },
                name: "RSA-PSS",
                saltLength: 512 >> 3
            };
        case "RS256":
            return { hash: { name: "SHA-256" }, name: "RSASSA-PKCS1-v1_5" };
        case "RS384":
            return { hash: { name: "SHA-384" }, name: "RSASSA-PKCS1-v1_5" };
        case "RS512":
            return { hash: { name: "SHA-512" }, name: "RSASSA-PKCS1-v1_5" };
        case "ES256":
            return { hash: { name: "SHA-256" }, name: "ECDSA", namedCurve: "P-256" };
        case "ES384":
            return { hash: { name: "SHA-384" }, name: "ECDSA", namedCurve: "P-384" };
        default:
            throw new Error("The jwt's alg '".concat(alg, "' is not supported."));
    }
}
exports.getAlgorithm = getAlgorithm;
