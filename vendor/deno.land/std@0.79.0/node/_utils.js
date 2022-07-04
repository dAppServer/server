"use strict";
exports.__esModule = true;
exports.once = exports.validateIntegerRange = exports.normalizeEncoding = exports.spliceOne = exports.intoCallbackAPIWithIntercept = exports.intoCallbackAPI = exports._TextEncoder = exports._TextDecoder = exports.notImplemented = void 0;
function notImplemented(msg) {
    var message = msg ? "Not implemented: ".concat(msg) : "Not implemented";
    throw new Error(message);
}
exports.notImplemented = notImplemented;
exports._TextDecoder = TextDecoder;
exports._TextEncoder = TextEncoder;
function intoCallbackAPI(func, cb) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    func.apply(void 0, args).then(function (value) { return cb && cb(null, value); })["catch"](function (err) { return cb && cb(err, null); });
}
exports.intoCallbackAPI = intoCallbackAPI;
function intoCallbackAPIWithIntercept(func, interceptor, cb) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    func.apply(void 0, args).then(function (value) { return cb && cb(null, interceptor(value)); })["catch"](function (err) { return cb && cb(err, null); });
}
exports.intoCallbackAPIWithIntercept = intoCallbackAPIWithIntercept;
function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
    list.pop();
}
exports.spliceOne = spliceOne;
function normalizeEncoding(enc) {
    if (enc == null || enc === "utf8" || enc === "utf-8")
        return "utf8";
    return slowCases(enc);
}
exports.normalizeEncoding = normalizeEncoding;
function slowCases(enc) {
    switch (enc.length) {
        case 4:
            if (enc === "UTF8")
                return "utf8";
            if (enc === "ucs2" || enc === "UCS2")
                return "utf16le";
            enc = "".concat(enc).toLowerCase();
            if (enc === "utf8")
                return "utf8";
            if (enc === "ucs2")
                return "utf16le";
            break;
        case 3:
            if (enc === "hex" || enc === "HEX" || "".concat(enc).toLowerCase() === "hex") {
                return "hex";
            }
            break;
        case 5:
            if (enc === "ascii")
                return "ascii";
            if (enc === "ucs-2")
                return "utf16le";
            if (enc === "UTF-8")
                return "utf8";
            if (enc === "ASCII")
                return "ascii";
            if (enc === "UCS-2")
                return "utf16le";
            enc = "".concat(enc).toLowerCase();
            if (enc === "utf-8")
                return "utf8";
            if (enc === "ascii")
                return "ascii";
            if (enc === "ucs-2")
                return "utf16le";
            break;
        case 6:
            if (enc === "base64")
                return "base64";
            if (enc === "latin1" || enc === "binary")
                return "latin1";
            if (enc === "BASE64")
                return "base64";
            if (enc === "LATIN1" || enc === "BINARY")
                return "latin1";
            enc = "".concat(enc).toLowerCase();
            if (enc === "base64")
                return "base64";
            if (enc === "latin1" || enc === "binary")
                return "latin1";
            break;
        case 7:
            if (enc === "utf16le" ||
                enc === "UTF16LE" ||
                "".concat(enc).toLowerCase() === "utf16le") {
                return "utf16le";
            }
            break;
        case 8:
            if (enc === "utf-16le" ||
                enc === "UTF-16LE" ||
                "".concat(enc).toLowerCase() === "utf-16le") {
                return "utf16le";
            }
            break;
        default:
            if (enc === "")
                return "utf8";
    }
}
function validateIntegerRange(value, name, min, max) {
    if (min === void 0) { min = -2147483648; }
    if (max === void 0) { max = 2147483647; }
    if (!Number.isInteger(value)) {
        throw new Error("".concat(name, " must be 'an integer' but was ").concat(value));
    }
    if (value < min || value > max) {
        throw new Error("".concat(name, " must be >= ").concat(min, " && <= ").concat(max, ". Value was ").concat(value));
    }
}
exports.validateIntegerRange = validateIntegerRange;
function once(callback) {
    var called = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (called)
            return;
        called = true;
        callback.apply(this, args);
    };
}
exports.once = once;
