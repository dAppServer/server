"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.TextEncoder = exports.TextDecoder = exports.validateIntegerRange = exports.isPrimitive = exports.isRegExp = exports.isFunction = exports.isError = exports.isObject = exports.isUndefined = exports.isSymbol = exports.isString = exports.isNumber = exports.isNullOrUndefined = exports.isNull = exports.isBoolean = exports.isArray = exports.types = exports.callbackify = exports.promisify = void 0;
var _util_promisify_ts_1 = require("./_util/_util_promisify.ts");
__createBinding(exports, _util_promisify_ts_1, "promisify");
var _util_callbackify_ts_1 = require("./_util/_util_callbackify.ts");
__createBinding(exports, _util_callbackify_ts_1, "callbackify");
var types = require("./_util/_util_types.ts");
exports.types = types;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isBoolean(value) {
    return typeof value === "boolean" || value instanceof Boolean;
}
exports.isBoolean = isBoolean;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNumber(value) {
    return typeof value === "number" || value instanceof Number;
}
exports.isNumber = isNumber;
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
exports.isString = isString;
function isSymbol(value) {
    return typeof value === "symbol";
}
exports.isSymbol = isSymbol;
function isUndefined(value) {
    return value === undefined;
}
exports.isUndefined = isUndefined;
function isObject(value) {
    return value !== null && typeof value === "object";
}
exports.isObject = isObject;
function isError(e) {
    return e instanceof Error;
}
exports.isError = isError;
function isFunction(value) {
    return typeof value === "function";
}
exports.isFunction = isFunction;
function isRegExp(value) {
    return value instanceof RegExp;
}
exports.isRegExp = isRegExp;
function isPrimitive(value) {
    return (value === null || (typeof value !== "object" && typeof value !== "function"));
}
exports.isPrimitive = isPrimitive;
function validateIntegerRange(value, name, min, max) {
    if (min === void 0) { min = -2147483648; }
    if (max === void 0) { max = 2147483647; }
    if (!Number.isInteger(value)) {
        throw new Error("".concat(name, " must be 'an integer' but was ").concat(value));
    }
    if (value < min || value > max) {
        throw new Error("".concat(name, " must be >= ").concat(min, " && <= ").concat(max, ".  Value was ").concat(value));
    }
}
exports.validateIntegerRange = validateIntegerRange;
var _utils_ts_1 = require("./_utils.ts");
exports.TextDecoder = _utils_ts_1._TextDecoder;
exports.TextEncoder = _utils_ts_1._TextEncoder;
