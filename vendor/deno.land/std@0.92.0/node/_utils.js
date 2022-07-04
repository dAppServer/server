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
exports.assertCallbackErrorUncaught = exports.mustCall = exports.once = exports.validateIntegerRange = exports.normalizeEncoding = exports.spliceOne = exports.intoCallbackAPIWithIntercept = exports.intoCallbackAPI = exports._TextEncoder = exports._TextDecoder = exports.notImplemented = void 0;
var mod_ts_1 = require("../async/mod.ts");
var asserts_ts_1 = require("../testing/asserts.ts");
var util_ts_1 = require("../io/util.ts");
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
    func.apply(void 0, args).then(function (value) { return cb && cb(null, value); }, function (err) { return cb && cb(err); });
}
exports.intoCallbackAPI = intoCallbackAPI;
function intoCallbackAPIWithIntercept(func, interceptor, cb) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    func.apply(void 0, args).then(function (value) { return cb && cb(null, interceptor(value)); }, function (err) { return cb && cb(err); });
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
function mustCall(fn, expectedExecutions, timeout) {
    if (fn === void 0) { fn = function () { }; }
    if (expectedExecutions === void 0) { expectedExecutions = 1; }
    if (timeout === void 0) { timeout = 1000; }
    if (expectedExecutions < 1) {
        throw new Error("Expected executions can't be lower than 1");
    }
    var timesExecuted = 0;
    var completed = (0, mod_ts_1.deferred)();
    var abort = setTimeout(function () { return completed.reject(); }, timeout);
    function callback() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        timesExecuted++;
        if (timesExecuted === expectedExecutions) {
            completed.resolve();
        }
        fn.apply(this, args);
    }
    var result = completed
        .then(function () { return clearTimeout(abort); })["catch"](function () {
        return (0, asserts_ts_1.fail)("Async operation not completed: Expected ".concat(expectedExecutions, ", executed ").concat(timesExecuted));
    });
    return [
        result,
        callback,
    ];
}
exports.mustCall = mustCall;
function assertCallbackErrorUncaught(_a) {
    var prelude = _a.prelude, invocation = _a.invocation, cleanup = _a.cleanup;
    return __awaiter(this, void 0, void 0, function () {
        var p, status, stderr, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    p = Deno.run({
                        cmd: [
                            Deno.execPath(),
                            "eval",
                            "--no-check",
                            "--unstable",
                            "".concat(prelude !== null && prelude !== void 0 ? prelude : "", "\n\n      ").concat(invocation, "(err) => {\n        // If the bug is present and the callback is called again with an error,\n        // don't throw another error, so if the subprocess fails we know it had the correct behaviour.\n        if (!err) throw new Error(\"success\");\n      });"),
                        ],
                        stderr: "piped"
                    });
                    return [4, p.status()];
                case 1:
                    status = _d.sent();
                    _c = (_b = new TextDecoder()).decode;
                    return [4, (0, util_ts_1.readAll)(p.stderr)];
                case 2:
                    stderr = _c.apply(_b, [_d.sent()]);
                    p.close();
                    p.stderr.close();
                    return [4, (cleanup === null || cleanup === void 0 ? void 0 : cleanup())];
                case 3:
                    _d.sent();
                    (0, asserts_ts_1.assert)(!status.success);
                    (0, asserts_ts_1.assertStringIncludes)(stderr, "Error: success");
                    return [2];
            }
        });
    });
}
exports.assertCallbackErrorUncaught = assertCallbackErrorUncaught;
