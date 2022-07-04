"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.TextEncoder = exports.TextDecoder = exports.inherits = exports.format = exports.deprecate = exports.getSystemErrorName = exports.isPrimitive = exports.isRegExp = exports.isFunction = exports.isError = exports.isObject = exports.isUndefined = exports.isSymbol = exports.isString = exports.isNumber = exports.isNullOrUndefined = exports.isNull = exports.isBoolean = exports.isArray = exports.inspect = exports.types = exports.promisify = exports.callbackify = void 0;
var _util_promisify_ts_1 = require("./_util/_util_promisify.ts");
exports.promisify = _util_promisify_ts_1.promisify;
var _util_callbackify_ts_1 = require("./_util/_util_callbackify.ts");
exports.callbackify = _util_callbackify_ts_1.callbackify;
var _errors_ts_1 = require("./_errors.ts");
var types = require("./_util/_util_types.ts");
exports.types = types;
var NumberIsSafeInteger = Number.isSafeInteger;
var DEFAULT_INSPECT_OPTIONS = {
    showHidden: false,
    depth: 2,
    colors: false,
    customInspect: true,
    showProxy: false,
    maxArrayLength: 100,
    maxStringLength: Infinity,
    breakLength: 80,
    compact: 3,
    sorted: false,
    getters: false
};
inspect.defaultOptions = DEFAULT_INSPECT_OPTIONS;
inspect.custom = Symbol["for"]("nodejs.util.inspect.custom");
function inspect(object) {
    var opts = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        opts[_i - 1] = arguments[_i];
    }
    if (typeof object === "string" && !object.includes("'")) {
        return "'".concat(object, "'");
    }
    opts = __assign(__assign({}, DEFAULT_INSPECT_OPTIONS), opts);
    return Deno.inspect(object, {
        depth: opts.depth,
        iterableLimit: opts.maxArrayLength,
        compact: !!opts.compact,
        sorted: !!opts.sorted,
        showProxy: !!opts.showProxy
    });
}
exports.inspect = inspect;
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
function getSystemErrorName(code) {
    var _a;
    if (typeof code !== "number") {
        throw new _errors_ts_1.ERR_INVALID_ARG_TYPE("err", "number", code);
    }
    if (code >= 0 || !NumberIsSafeInteger(code)) {
        throw new _errors_ts_1.ERR_OUT_OF_RANGE("err", "a negative integer", code);
    }
    return (_a = _errors_ts_1.errorMap.get(code)) === null || _a === void 0 ? void 0 : _a[0];
}
exports.getSystemErrorName = getSystemErrorName;
function deprecate(fn, msg, _code) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn(msg);
        return fn.apply(undefined, args);
    };
}
exports.deprecate = deprecate;
function circularRemover() {
    var seen = new WeakSet();
    return function (_key, value) {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}
function formatString(str) {
    return "\"".concat(str.replace(/\\/, "\\\\").replace(/"/g, '\\"'), "\"");
}
function thingToString(thing, maxDepth, depth) {
    if (depth === void 0) { depth = 1; }
    var result = "";
    if (typeof thing === "bigint") {
        return thing + "n";
    }
    if (typeof thing === "undefined" || typeof thing === "number" ||
        typeof thing === "boolean" || typeof thing === "symbol" || thing === null) {
        return String(thing);
    }
    if (typeof thing === "function") {
        return "[Function ".concat(thing.name || "(anonymous)", "]");
    }
    if (typeof thing === "string") {
        return formatString(thing);
    }
    if (Array.isArray(thing)) {
        if (depth === maxDepth) {
            return "[Array]";
        }
        result += "[";
        var en_1 = Object.entries(thing);
        for (var i = 0; i < en_1.length; i++) {
            var _a = en_1[i], key = _a[0], value = _a[1];
            if (isNaN(Number(key))) {
                result += "".concat(key, ": ");
            }
            result += thingToString(value, maxDepth, depth + 1);
            if (i !== en_1.length - 1) {
                result += ", ";
            }
        }
        result += "]";
        return result;
    }
    if (depth === maxDepth) {
        return "[Object]";
    }
    var en = Object.entries(thing);
    result += "{ ";
    for (var i = 0; i < en.length; i++) {
        var _b = en[i], key = _b[0], value = _b[1];
        result += "".concat(key, ": ").concat(thingToString(value, maxDepth, depth + 1));
        if (i !== en.length - 1) {
            result += ", ";
        }
    }
    result += " }";
    return result;
}
function toReplace(specifier, value) {
    if (specifier === "%s") {
        return thingToString(value, 2);
    }
    if (specifier === "%d") {
        if (typeof value === "bigint") {
            return value + "n";
        }
        return Number(value).toString();
    }
    if (specifier === "%i") {
        if (typeof value === "bigint") {
            return value + "n";
        }
        return parseInt(value).toString();
    }
    if (specifier === "%f") {
        return parseFloat(value).toString();
    }
    if (specifier === "%j") {
        return JSON.stringify(value, circularRemover());
    }
    if (specifier === "%o" || specifier === "%O") {
        return thingToString(value);
    }
    if (specifier === "%c") {
        return "";
    }
    return "";
}
function format(input) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var replacement = [];
    var regex = /%(s|d|i|f|j|o|O|c)/g;
    var i = 0;
    var arr = null;
    while ((arr = regex.exec(input)) !== null && i < args.length) {
        replacement.push([arr["index"], toReplace(arr[0], args[i])]);
        i++;
    }
    var result = "";
    var last = 0;
    for (var i_1 = 0; i_1 < replacement.length; i_1++) {
        var item = replacement[i_1];
        result += input.slice(last, item[0]);
        result += item[1];
        last = item[0] + 2;
    }
    result += input.slice(last);
    return result;
}
exports.format = format;
function inherits(ctor, superCtor) {
    if (ctor === undefined || ctor === null) {
        throw new _errors_ts_1.ERR_INVALID_ARG_TYPE("ctor", "Function", ctor);
    }
    if (superCtor === undefined || superCtor === null) {
        throw new _errors_ts_1.ERR_INVALID_ARG_TYPE("superCtor", "Function", superCtor);
    }
    if (superCtor.prototype === undefined) {
        throw new _errors_ts_1.ERR_INVALID_ARG_TYPE("superCtor.prototype", "Object", superCtor.prototype);
    }
    Object.defineProperty(ctor, "super_", {
        value: superCtor,
        writable: true,
        configurable: true
    });
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}
exports.inherits = inherits;
var _utils_ts_1 = require("./_utils.ts");
exports.TextDecoder = _utils_ts_1._TextDecoder;
exports.TextEncoder = _utils_ts_1._TextEncoder;
exports["default"] = {
    inspect: inspect,
    isArray: isArray,
    isBoolean: isBoolean,
    isNull: isNull,
    isNullOrUndefined: isNullOrUndefined,
    isNumber: isNumber,
    isString: isString,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    isObject: isObject,
    isError: isError,
    isFunction: isFunction,
    isRegExp: isRegExp,
    isPrimitive: isPrimitive,
    getSystemErrorName: getSystemErrorName,
    deprecate: deprecate,
    callbackify: _util_callbackify_ts_1.callbackify,
    promisify: _util_promisify_ts_1.promisify,
    inherits: inherits,
    types: types,
    TextDecoder: exports.TextDecoder,
    TextEncoder: exports.TextEncoder
};
