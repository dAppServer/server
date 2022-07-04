"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getNumericDate = exports.create = exports.verify = exports.validate = exports.decode = exports.decoder = exports.encoder = void 0;
var deps_ts_1 = require("./deps.ts");
var signature_ts_1 = require("./signature.ts");
var algorithm_ts_1 = require("./algorithm.ts");
exports.encoder = new TextEncoder();
exports.decoder = new TextDecoder();
function isExpired(exp, leeway) {
    if (leeway === void 0) { leeway = 0; }
    return exp + leeway < Date.now() / 1000;
}
function isTooEarly(nbf, leeway) {
    if (leeway === void 0) { leeway = 0; }
    return nbf - leeway > Date.now() / 1000;
}
function isObject(obj) {
    return (obj !== null && typeof obj === "object" && Array.isArray(obj) === false);
}
function is3Tuple(arr) {
    return arr.length === 3;
}
function hasInvalidTimingClaims() {
    var claimValues = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        claimValues[_i] = arguments[_i];
    }
    return claimValues.some(function (claimValue) {
        return claimValue !== undefined ? typeof claimValue !== "number" : false;
    });
}
function decode(jwt) {
    try {
        var arr = jwt
            .split(".")
            .map(deps_ts_1.base64url.decode)
            .map(function (uint8Array, index) {
            return index === 0 || index === 1
                ? JSON.parse(exports.decoder.decode(uint8Array))
                : uint8Array;
        });
        if (is3Tuple(arr))
            return arr;
        else
            throw new Error();
    }
    catch (_a) {
        throw Error("The serialization of the jwt is invalid.");
    }
}
exports.decode = decode;
function validate(_a) {
    var header = _a[0], payload = _a[1], signature = _a[2];
    if (typeof (header === null || header === void 0 ? void 0 : header.alg) !== "string") {
        throw new Error("The jwt's alg header parameter value must be a string.");
    }
    if (isObject(payload)) {
        if (hasInvalidTimingClaims(payload.exp, payload.nbf)) {
            throw new Error("The jwt has an invalid 'exp' or 'nbf' claim.");
        }
        if (typeof payload.exp === "number" && isExpired(payload.exp, 1)) {
            throw RangeError("The jwt is expired.");
        }
        if (typeof payload.nbf === "number" && isTooEarly(payload.nbf, 1)) {
            throw RangeError("The jwt is used too early.");
        }
        return {
            header: header,
            payload: payload,
            signature: signature
        };
    }
    else {
        throw new Error("The jwt claims set is not a JSON object.");
    }
}
exports.validate = validate;
function verify(jwt, key) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, header, payload, signature;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = validate(decode(jwt)), header = _a.header, payload = _a.payload, signature = _a.signature;
                    if (!(0, algorithm_ts_1.verify)(header.alg, key)) return [3, 2];
                    return [4, (0, signature_ts_1.verify)(signature, key, header.alg, jwt.slice(0, jwt.lastIndexOf(".")))];
                case 1:
                    if (!(_b.sent())) {
                        throw new Error("The jwt's signature does not match the verification signature.");
                    }
                    return [2, payload];
                case 2: throw new Error("The jwt's alg '".concat(header.alg, "' does not match the key's algorithm."));
            }
        });
    });
}
exports.verify = verify;
function createSigningInput(header, payload) {
    return "".concat(deps_ts_1.base64url.encode(exports.encoder.encode(JSON.stringify(header))), ".").concat(deps_ts_1.base64url.encode(exports.encoder.encode(JSON.stringify(payload))));
}
function create(header, payload, key) {
    return __awaiter(this, void 0, void 0, function () {
        var signingInput, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, algorithm_ts_1.verify)(header.alg, key)) return [3, 2];
                    signingInput = createSigningInput(header, payload);
                    return [4, (0, signature_ts_1.create)(header.alg, key, signingInput)];
                case 1:
                    signature = _a.sent();
                    return [2, "".concat(signingInput, ".").concat(signature)];
                case 2: throw new Error("The jwt's alg '".concat(header.alg, "' does not match the key's algorithm."));
            }
        });
    });
}
exports.create = create;
function getNumericDate(exp) {
    return Math.round((exp instanceof Date ? exp.getTime() : Date.now() + exp * 1000) / 1000);
}
exports.getNumericDate = getNumericDate;
