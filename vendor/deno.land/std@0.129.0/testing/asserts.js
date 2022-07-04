"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.unreachable = exports.unimplemented = exports.assertRejects = exports.assertThrows = exports.assertIsError = exports.fail = exports.assertObjectMatch = exports.assertNotMatch = exports.assertMatch = exports.assertArrayIncludes = exports.assertStringIncludes = exports.assertExists = exports.assertAlmostEquals = exports.assertNotStrictEquals = exports.assertStrictEquals = exports.assertNotEquals = exports.assertEquals = exports.assert = exports.equal = exports._format = exports.AssertionError = void 0;
var colors_ts_1 = require("../fmt/colors.ts");
var _diff_ts_1 = require("./_diff.ts");
var CAN_NOT_DISPLAY = "[Cannot display]";
var AssertionError = (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "AssertionError";
        return _this;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
function _format(v) {
    var Deno = globalThis.Deno;
    return typeof (Deno === null || Deno === void 0 ? void 0 : Deno.inspect) === "function"
        ? Deno.inspect(v, {
            depth: Infinity,
            sorted: true,
            trailingComma: true,
            compact: false,
            iterableLimit: Infinity
        })
        : "\"".concat(String(v).replace(/(?=["\\])/g, "\\"), "\"");
}
exports._format = _format;
function createColor(diffType, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.background, background = _c === void 0 ? false : _c;
    switch (diffType) {
        case _diff_ts_1.DiffType.added:
            return function (s) {
                return background ? (0, colors_ts_1.bgGreen)((0, colors_ts_1.white)(s)) : (0, colors_ts_1.green)((0, colors_ts_1.bold)(s));
            };
        case _diff_ts_1.DiffType.removed:
            return function (s) { return background ? (0, colors_ts_1.bgRed)((0, colors_ts_1.white)(s)) : (0, colors_ts_1.red)((0, colors_ts_1.bold)(s)); };
        default:
            return colors_ts_1.white;
    }
}
function createSign(diffType) {
    switch (diffType) {
        case _diff_ts_1.DiffType.added:
            return "+   ";
        case _diff_ts_1.DiffType.removed:
            return "-   ";
        default:
            return "    ";
    }
}
function buildMessage(diffResult, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.stringDiff, stringDiff = _c === void 0 ? false : _c;
    var messages = [], diffMessages = [];
    messages.push("");
    messages.push("");
    messages.push("    ".concat((0, colors_ts_1.gray)((0, colors_ts_1.bold)("[Diff]")), " ").concat((0, colors_ts_1.red)((0, colors_ts_1.bold)("Actual")), " / ").concat((0, colors_ts_1.green)((0, colors_ts_1.bold)("Expected"))));
    messages.push("");
    messages.push("");
    diffResult.forEach(function (result) {
        var _a, _b;
        var c = createColor(result.type);
        var line = (_b = (_a = result.details) === null || _a === void 0 ? void 0 : _a.map(function (detail) {
            return detail.type !== _diff_ts_1.DiffType.common
                ? createColor(detail.type, { background: true })(detail.value)
                : detail.value;
        }).join("")) !== null && _b !== void 0 ? _b : result.value;
        diffMessages.push(c("".concat(createSign(result.type)).concat(line)));
    });
    messages.push.apply(messages, (stringDiff ? [diffMessages.join("")] : diffMessages));
    messages.push("");
    return messages;
}
function isKeyedCollection(x) {
    return [Symbol.iterator, "size"].every(function (k) { return k in x; });
}
function equal(c, d) {
    var seen = new Map();
    return (function compare(a, b) {
        if (a &&
            b &&
            ((a instanceof RegExp && b instanceof RegExp) ||
                (a instanceof URL && b instanceof URL))) {
            return String(a) === String(b);
        }
        if (a instanceof Date && b instanceof Date) {
            var aTime = a.getTime();
            var bTime = b.getTime();
            if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
                return true;
            }
            return aTime === bTime;
        }
        if (typeof a === "number" && typeof b === "number") {
            return Number.isNaN(a) && Number.isNaN(b) || a === b;
        }
        if (Object.is(a, b)) {
            return true;
        }
        if (a && typeof a === "object" && b && typeof b === "object") {
            if (a && b && !constructorsEqual(a, b)) {
                return false;
            }
            if (a instanceof WeakMap || b instanceof WeakMap) {
                if (!(a instanceof WeakMap && b instanceof WeakMap))
                    return false;
                throw new TypeError("cannot compare WeakMap instances");
            }
            if (a instanceof WeakSet || b instanceof WeakSet) {
                if (!(a instanceof WeakSet && b instanceof WeakSet))
                    return false;
                throw new TypeError("cannot compare WeakSet instances");
            }
            if (seen.get(a) === b) {
                return true;
            }
            if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
                return false;
            }
            if (isKeyedCollection(a) && isKeyedCollection(b)) {
                if (a.size !== b.size) {
                    return false;
                }
                var unmatchedEntries = a.size;
                for (var _i = 0, _a = a.entries(); _i < _a.length; _i++) {
                    var _b = _a[_i], aKey = _b[0], aValue = _b[1];
                    for (var _c = 0, _d = b.entries(); _c < _d.length; _c++) {
                        var _e = _d[_c], bKey = _e[0], bValue = _e[1];
                        if ((aKey === aValue && bKey === bValue && compare(aKey, bKey)) ||
                            (compare(aKey, bKey) && compare(aValue, bValue))) {
                            unmatchedEntries--;
                        }
                    }
                }
                return unmatchedEntries === 0;
            }
            var merged = __assign(__assign({}, a), b);
            for (var _f = 0, _g = __spreadArray(__spreadArray([], Object.getOwnPropertyNames(merged), true), Object.getOwnPropertySymbols(merged), true); _f < _g.length; _f++) {
                var key = _g[_f];
                if (!compare(a && a[key], b && b[key])) {
                    return false;
                }
                if (((key in a) && (!(key in b))) || ((key in b) && (!(key in a)))) {
                    return false;
                }
            }
            seen.set(a, b);
            if (a instanceof WeakRef || b instanceof WeakRef) {
                if (!(a instanceof WeakRef && b instanceof WeakRef))
                    return false;
                return compare(a.deref(), b.deref());
            }
            return true;
        }
        return false;
    })(c, d);
}
exports.equal = equal;
function constructorsEqual(a, b) {
    return a.constructor === b.constructor ||
        a.constructor === Object && !b.constructor ||
        !a.constructor && b.constructor === Object;
}
function assert(expr, msg) {
    if (msg === void 0) { msg = ""; }
    if (!expr) {
        throw new AssertionError(msg);
    }
}
exports.assert = assert;
function assertEquals(actual, expected, msg) {
    if (equal(actual, expected)) {
        return;
    }
    var message = "";
    var actualString = _format(actual);
    var expectedString = _format(expected);
    try {
        var stringDiff = (typeof actual === "string") &&
            (typeof expected === "string");
        var diffResult = stringDiff
            ? (0, _diff_ts_1.diffstr)(actual, expected)
            : (0, _diff_ts_1.diff)(actualString.split("\n"), expectedString.split("\n"));
        var diffMsg = buildMessage(diffResult, { stringDiff: stringDiff }).join("\n");
        message = "Values are not equal:\n".concat(diffMsg);
    }
    catch (_a) {
        message = "\n".concat((0, colors_ts_1.red)(CAN_NOT_DISPLAY), " + \n\n");
    }
    if (msg) {
        message = msg;
    }
    throw new AssertionError(message);
}
exports.assertEquals = assertEquals;
function assertNotEquals(actual, expected, msg) {
    if (!equal(actual, expected)) {
        return;
    }
    var actualString;
    var expectedString;
    try {
        actualString = String(actual);
    }
    catch (_a) {
        actualString = "[Cannot display]";
    }
    try {
        expectedString = String(expected);
    }
    catch (_b) {
        expectedString = "[Cannot display]";
    }
    if (!msg) {
        msg = "actual: ".concat(actualString, " expected not to be: ").concat(expectedString);
    }
    throw new AssertionError(msg);
}
exports.assertNotEquals = assertNotEquals;
function assertStrictEquals(actual, expected, msg) {
    if (actual === expected) {
        return;
    }
    var message;
    if (msg) {
        message = msg;
    }
    else {
        var actualString = _format(actual);
        var expectedString = _format(expected);
        if (actualString === expectedString) {
            var withOffset = actualString
                .split("\n")
                .map(function (l) { return "    ".concat(l); })
                .join("\n");
            message =
                "Values have the same structure but are not reference-equal:\n\n".concat((0, colors_ts_1.red)(withOffset), "\n");
        }
        else {
            try {
                var stringDiff = (typeof actual === "string") &&
                    (typeof expected === "string");
                var diffResult = stringDiff
                    ? (0, _diff_ts_1.diffstr)(actual, expected)
                    : (0, _diff_ts_1.diff)(actualString.split("\n"), expectedString.split("\n"));
                var diffMsg = buildMessage(diffResult, { stringDiff: stringDiff }).join("\n");
                message = "Values are not strictly equal:\n".concat(diffMsg);
            }
            catch (_a) {
                message = "\n".concat((0, colors_ts_1.red)(CAN_NOT_DISPLAY), " + \n\n");
            }
        }
    }
    throw new AssertionError(message);
}
exports.assertStrictEquals = assertStrictEquals;
function assertNotStrictEquals(actual, expected, msg) {
    if (actual !== expected) {
        return;
    }
    throw new AssertionError(msg !== null && msg !== void 0 ? msg : "Expected \"actual\" to be strictly unequal to: ".concat(_format(actual), "\n"));
}
exports.assertNotStrictEquals = assertNotStrictEquals;
function assertAlmostEquals(actual, expected, tolerance, msg) {
    if (tolerance === void 0) { tolerance = 1e-7; }
    if (actual === expected) {
        return;
    }
    var delta = Math.abs(expected - actual);
    if (delta <= tolerance) {
        return;
    }
    var f = function (n) { return Number.isInteger(n) ? n : n.toExponential(); };
    throw new AssertionError(msg !== null && msg !== void 0 ? msg : "actual: \"".concat(f(actual), "\" expected to be close to \"").concat(f(expected), "\": delta \"").concat(f(delta), "\" is greater than \"").concat(f(tolerance), "\""));
}
exports.assertAlmostEquals = assertAlmostEquals;
function assertExists(actual, msg) {
    if (actual === undefined || actual === null) {
        if (!msg) {
            msg = "actual: \"".concat(actual, "\" expected to not be null or undefined");
        }
        throw new AssertionError(msg);
    }
}
exports.assertExists = assertExists;
function assertStringIncludes(actual, expected, msg) {
    if (!actual.includes(expected)) {
        if (!msg) {
            msg = "actual: \"".concat(actual, "\" expected to contain: \"").concat(expected, "\"");
        }
        throw new AssertionError(msg);
    }
}
exports.assertStringIncludes = assertStringIncludes;
function assertArrayIncludes(actual, expected, msg) {
    var missing = [];
    for (var i = 0; i < expected.length; i++) {
        var found = false;
        for (var j = 0; j < actual.length; j++) {
            if (equal(expected[i], actual[j])) {
                found = true;
                break;
            }
        }
        if (!found) {
            missing.push(expected[i]);
        }
    }
    if (missing.length === 0) {
        return;
    }
    if (!msg) {
        msg = "actual: \"".concat(_format(actual), "\" expected to include: \"").concat(_format(expected), "\"\nmissing: ").concat(_format(missing));
    }
    throw new AssertionError(msg);
}
exports.assertArrayIncludes = assertArrayIncludes;
function assertMatch(actual, expected, msg) {
    if (!expected.test(actual)) {
        if (!msg) {
            msg = "actual: \"".concat(actual, "\" expected to match: \"").concat(expected, "\"");
        }
        throw new AssertionError(msg);
    }
}
exports.assertMatch = assertMatch;
function assertNotMatch(actual, expected, msg) {
    if (expected.test(actual)) {
        if (!msg) {
            msg = "actual: \"".concat(actual, "\" expected to not match: \"").concat(expected, "\"");
        }
        throw new AssertionError(msg);
    }
}
exports.assertNotMatch = assertNotMatch;
function assertObjectMatch(actual, expected) {
    function filter(a, b) {
        var seen = new WeakMap();
        return fn(a, b);
        function fn(a, b) {
            if ((seen.has(a)) && (seen.get(a) === b)) {
                return a;
            }
            seen.set(a, b);
            var filtered = {};
            var entries = __spreadArray(__spreadArray([], Object.getOwnPropertyNames(a), true), Object.getOwnPropertySymbols(a), true).filter(function (key) { return key in b; })
                .map(function (key) { return [key, a[key]]; });
            var _loop_1 = function (key, value) {
                if (Array.isArray(value)) {
                    var subset = b[key];
                    if (Array.isArray(subset)) {
                        filtered[key] = fn(__assign({}, value), __assign({}, subset));
                        return "continue";
                    }
                }
                else if (value instanceof RegExp) {
                    filtered[key] = value;
                    return "continue";
                }
                else if (typeof value === "object") {
                    var subset_1 = b[key];
                    if ((typeof subset_1 === "object") && (subset_1)) {
                        if ((value instanceof Map) && (subset_1 instanceof Map)) {
                            filtered[key] = new Map(__spreadArray([], value, true).filter(function (_a) {
                                var k = _a[0];
                                return subset_1.has(k);
                            }).map(function (_a) {
                                var k = _a[0], v = _a[1];
                                return [k, typeof v === "object" ? fn(v, subset_1.get(k)) : v];
                            }));
                            return "continue";
                        }
                        if ((value instanceof Set) && (subset_1 instanceof Set)) {
                            filtered[key] = new Set(__spreadArray([], value, true).filter(function (v) { return subset_1.has(v); }));
                            return "continue";
                        }
                        filtered[key] = fn(value, subset_1);
                        return "continue";
                    }
                }
                filtered[key] = value;
            };
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var _a = entries_1[_i], key = _a[0], value = _a[1];
                _loop_1(key, value);
            }
            return filtered;
        }
    }
    return assertEquals(filter(actual, expected), filter(expected, expected));
}
exports.assertObjectMatch = assertObjectMatch;
function fail(msg) {
    assert(false, "Failed assertion".concat(msg ? ": ".concat(msg) : "."));
}
exports.fail = fail;
function assertIsError(error, ErrorClass, msgIncludes, msg) {
    var _a;
    if (error instanceof Error === false) {
        throw new AssertionError("Expected \"error\" to be an Error object.");
    }
    if (ErrorClass && !(error instanceof ErrorClass)) {
        msg = "Expected error to be instance of \"".concat(ErrorClass.name, "\", but was \"").concat(typeof error === "object" ? (_a = error === null || error === void 0 ? void 0 : error.constructor) === null || _a === void 0 ? void 0 : _a.name : "[not an object]", "\"").concat(msg ? ": ".concat(msg) : ".");
        throw new AssertionError(msg);
    }
    if (msgIncludes && (!(error instanceof Error) ||
        !(0, colors_ts_1.stripColor)(error.message).includes((0, colors_ts_1.stripColor)(msgIncludes)))) {
        msg = "Expected error message to include \"".concat(msgIncludes, "\", but got \"").concat(error instanceof Error ? error.message : "[not an Error]", "\"").concat(msg ? ": ".concat(msg) : ".");
        throw new AssertionError(msg);
    }
}
exports.assertIsError = assertIsError;
function assertThrows(fn, errorClassOrCallback, msgIncludesOrMsg, msg) {
    var ErrorClass = undefined;
    var msgIncludes = undefined;
    var errorCallback;
    if (errorClassOrCallback == null ||
        errorClassOrCallback.prototype instanceof Error ||
        errorClassOrCallback.prototype === Error.prototype) {
        ErrorClass = errorClassOrCallback;
        msgIncludes = msgIncludesOrMsg;
        errorCallback = null;
    }
    else {
        errorCallback = errorClassOrCallback;
        msg = msgIncludesOrMsg;
    }
    var doesThrow = false;
    try {
        fn();
    }
    catch (error) {
        if (error instanceof Error === false) {
            throw new AssertionError("A non-Error object was thrown.");
        }
        assertIsError(error, ErrorClass, msgIncludes, msg);
        if (typeof errorCallback == "function") {
            errorCallback(error);
        }
        doesThrow = true;
    }
    if (!doesThrow) {
        msg = "Expected function to throw".concat(msg ? ": ".concat(msg) : ".");
        throw new AssertionError(msg);
    }
}
exports.assertThrows = assertThrows;
function assertRejects(fn, errorClassOrCallback, msgIncludesOrMsg, msg) {
    return __awaiter(this, void 0, void 0, function () {
        var ErrorClass, msgIncludes, errorCallback, doesThrow, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ErrorClass = undefined;
                    msgIncludes = undefined;
                    if (errorClassOrCallback == null ||
                        errorClassOrCallback.prototype instanceof Error ||
                        errorClassOrCallback.prototype === Error.prototype) {
                        ErrorClass = errorClassOrCallback;
                        msgIncludes = msgIncludesOrMsg;
                        errorCallback = null;
                    }
                    else {
                        errorCallback = errorClassOrCallback;
                        msg = msgIncludesOrMsg;
                    }
                    doesThrow = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fn()];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error === false) {
                        throw new AssertionError("A non-Error object was thrown or rejected.");
                    }
                    assertIsError(error_1, ErrorClass, msgIncludes, msg);
                    if (typeof errorCallback == "function") {
                        errorCallback(error_1);
                    }
                    doesThrow = true;
                    return [3, 4];
                case 4:
                    if (!doesThrow) {
                        msg = "Expected function to throw".concat(msg ? ": ".concat(msg) : ".");
                        throw new AssertionError(msg);
                    }
                    return [2];
            }
        });
    });
}
exports.assertRejects = assertRejects;
function unimplemented(msg) {
    throw new AssertionError(msg || "unimplemented");
}
exports.unimplemented = unimplemented;
function unreachable() {
    throw new AssertionError("unreachable");
}
exports.unreachable = unreachable;
