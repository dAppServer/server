"use strict";
exports.__esModule = true;
exports.toHaveNthReturnedWith = exports.toHaveReturnedTimes = exports.toHaveLastReturnedWith = exports.toHaveReturned = exports.toHaveReturnedWith = exports.toHaveBeenNthCalledWith = exports.toHaveBeenLastCalledWith = exports.toHaveBeenCalledWith = exports.toHaveBeenCalledTimes = exports.toHaveBeenCalled = exports.toThrow = exports.toContain = exports.toHaveLength = exports.toHaveProperty = exports.toMatch = exports.toBeInstanceOf = exports.toBeNaN = exports.toBeNull = exports.toBeUndefined = exports.toBeDefined = exports.toBeFalsy = exports.toBeTruthy = exports.toBeLessThanOrEqual = exports.toBeGreaterThanOrEqual = exports.toBeLessThan = exports.toBeGreaterThan = exports.toEqual = exports.toBe = void 0;
var asserts_ts_1 = require("https://deno.land/std@0.97.0/testing/asserts.ts");
var _diff_ts_1 = require("https://deno.land/std@0.97.0/testing/_diff.ts");
var colors_ts_1 = require("https://deno.land/std@0.97.0/fmt/colors.ts");
var mock = require("./mock.ts");
var ACTUAL = (0, colors_ts_1.red)((0, colors_ts_1.bold)('actual'));
var EXPECTED = (0, colors_ts_1.green)((0, colors_ts_1.bold)('expected'));
var CAN_NOT_DISPLAY = '[Cannot display]';
function createStr(v) {
    try {
        return Deno.inspect(v);
    }
    catch (e) {
        return (0, colors_ts_1.red)(CAN_NOT_DISPLAY);
    }
}
function createColor(diffType) {
    switch (diffType) {
        case _diff_ts_1.DiffType.added:
            return function (s) { return (0, colors_ts_1.green)((0, colors_ts_1.bold)(s)); };
        case _diff_ts_1.DiffType.removed:
            return function (s) { return (0, colors_ts_1.red)((0, colors_ts_1.bold)(s)); };
        default:
            return colors_ts_1.white;
    }
}
function createSign(diffType) {
    switch (diffType) {
        case _diff_ts_1.DiffType.added:
            return '+   ';
        case _diff_ts_1.DiffType.removed:
            return '-   ';
        default:
            return '    ';
    }
}
function buildMessage(diffResult) {
    return diffResult
        .map(function (result) {
        var c = createColor(result.type);
        return c("".concat(createSign(result.type)).concat(result.value));
    })
        .join('\n');
}
function buildDiffMessage(actual, expected) {
    var actualString = createStr(actual);
    var expectedString = createStr(expected);
    var message;
    try {
        var diffResult = (0, _diff_ts_1.diff)(actualString.split('\n'), expectedString.split('\n'));
        return buildMessage(diffResult);
    }
    catch (e) {
        return "\n".concat((0, colors_ts_1.red)(CAN_NOT_DISPLAY), " + \n\n");
    }
}
function buildFail(message) {
    return {
        pass: false,
        message: message
    };
}
function toBe(actual, expected) {
    if (actual === expected)
        return { pass: true };
    return buildFail("expect(".concat(ACTUAL, ").toBe(").concat(EXPECTED, ")\n\n").concat(buildDiffMessage(actual, expected)));
}
exports.toBe = toBe;
function toEqual(actual, expected) {
    if ((0, asserts_ts_1.equal)(actual, expected))
        return { pass: true };
    return buildFail("expect(".concat(ACTUAL, ").toEqual(").concat(EXPECTED, ")\n\n").concat(buildDiffMessage(actual, expected)));
}
exports.toEqual = toEqual;
function toBeGreaterThan(actual, comparison) {
    if (actual > comparison)
        return { pass: true };
    var actualString = createStr(actual);
    var comparisonString = createStr(comparison);
    return buildFail("expect(".concat(ACTUAL, ").toBeGreaterThan(").concat(EXPECTED, ")\n\n  ").concat((0, colors_ts_1.red)(actualString), " is not greater than ").concat((0, colors_ts_1.green)(comparisonString)));
}
exports.toBeGreaterThan = toBeGreaterThan;
function toBeLessThan(actual, comparison) {
    if (actual < comparison)
        return { pass: true };
    var actualString = createStr(actual);
    var comparisonString = createStr(comparison);
    return buildFail("expect(".concat(ACTUAL, ").toBeLessThan(").concat(EXPECTED, ")\n\n  ").concat((0, colors_ts_1.red)(actualString), " is not less than ").concat((0, colors_ts_1.green)(comparisonString)));
}
exports.toBeLessThan = toBeLessThan;
function toBeGreaterThanOrEqual(actual, comparison) {
    if (actual >= comparison)
        return { pass: true };
    var actualString = createStr(actual);
    var comparisonString = createStr(comparison);
    return buildFail("expect(".concat(ACTUAL, ").toBeGreaterThanOrEqual(").concat(EXPECTED, ")\n\n  ").concat((0, colors_ts_1.red)(actualString), " is not greater than or equal to ").concat((0, colors_ts_1.green)(comparisonString)));
}
exports.toBeGreaterThanOrEqual = toBeGreaterThanOrEqual;
function toBeLessThanOrEqual(actual, comparison) {
    if (actual <= comparison)
        return { pass: true };
    var actualString = createStr(actual);
    var comparisonString = createStr(comparison);
    return buildFail("expect(".concat(ACTUAL, ").toBeLessThanOrEqual(").concat(EXPECTED, ")\n\n  ").concat((0, colors_ts_1.red)(actualString), " is not less than or equal to ").concat((0, colors_ts_1.green)(comparisonString)));
}
exports.toBeLessThanOrEqual = toBeLessThanOrEqual;
function toBeTruthy(value) {
    if (value)
        return { pass: true };
    var actualString = createStr(value);
    return buildFail("expect(".concat(ACTUAL, ").toBeTruthy()\n\n      ").concat((0, colors_ts_1.red)(actualString), " is not truthy"));
}
exports.toBeTruthy = toBeTruthy;
function toBeFalsy(value) {
    if (!value)
        return { pass: true };
    var actualString = createStr(value);
    return buildFail("expect(".concat(ACTUAL, ").toBeFalsy()\n\n    ").concat((0, colors_ts_1.red)(actualString), " is not falsy"));
}
exports.toBeFalsy = toBeFalsy;
function toBeDefined(value) {
    if (typeof value !== 'undefined')
        return { pass: true };
    var actualString = createStr(value);
    return buildFail("expect(".concat(ACTUAL, ").toBeDefined()\n\n    ").concat((0, colors_ts_1.red)(actualString), " is not defined"));
}
exports.toBeDefined = toBeDefined;
function toBeUndefined(value) {
    if (typeof value === 'undefined')
        return { pass: true };
    var actualString = createStr(value);
    return buildFail("expect(".concat(ACTUAL, ").toBeUndefined()\n\n    ").concat((0, colors_ts_1.red)(actualString), " is defined but should be undefined"));
}
exports.toBeUndefined = toBeUndefined;
function toBeNull(value) {
    if (value === null)
        return { pass: true };
    var actualString = createStr(value);
    return buildFail("expect(".concat(ACTUAL, ").toBeNull()\n\n    ").concat((0, colors_ts_1.red)(actualString), " should be null"));
}
exports.toBeNull = toBeNull;
function toBeNaN(value) {
    if (typeof value === 'number' && isNaN(value))
        return { pass: true };
    var actualString = createStr(value);
    return buildFail("expect(".concat(ACTUAL, ").toBeNaN()\n\n    ").concat((0, colors_ts_1.red)(actualString), " should be NaN"));
}
exports.toBeNaN = toBeNaN;
function toBeInstanceOf(value, expected) {
    if (value instanceof expected)
        return { pass: true };
    var actualString = createStr(value);
    var expectedString = createStr(expected);
    return buildFail("expect(".concat(ACTUAL, ").toBeInstanceOf(").concat(EXPECTED, ")\n\n    expected ").concat((0, colors_ts_1.green)(expected.name), " but received ").concat((0, colors_ts_1.red)(actualString)));
}
exports.toBeInstanceOf = toBeInstanceOf;
function toMatch(value, pattern) {
    var valueStr = value.toString();
    if (typeof pattern === 'string') {
        if (valueStr.indexOf(pattern) !== -1)
            return { pass: true };
        var actualString = createStr(value);
        var patternString = createStr(pattern);
        return buildFail("expect(".concat(ACTUAL, ").toMatch(").concat(EXPECTED, ")\n\n    expected ").concat((0, colors_ts_1.red)(actualString), " to contain ").concat((0, colors_ts_1.green)(patternString)));
    }
    else if (pattern instanceof RegExp) {
        if (pattern.exec(valueStr))
            return { pass: true };
        var actualString = createStr(value);
        var patternString = createStr(pattern);
        return buildFail("expect(".concat(ACTUAL, ").toMatch(").concat(EXPECTED, ")\n\n    ").concat((0, colors_ts_1.red)(actualString), " did not match regex ").concat((0, colors_ts_1.green)(patternString)));
    }
    else {
        return buildFail('Invalid internal state');
    }
}
exports.toMatch = toMatch;
function toHaveProperty(value, propName) {
    if (typeof value === 'object' && typeof value[propName] !== 'undefined') {
        return { pass: true };
    }
    var actualString = createStr(value);
    var propNameString = createStr(propName);
    return buildFail("expect(".concat(ACTUAL, ").toHaveProperty(").concat(EXPECTED, ")\n\n    ").concat((0, colors_ts_1.red)(actualString), " did not contain property ").concat((0, colors_ts_1.green)(propNameString)));
}
exports.toHaveProperty = toHaveProperty;
function toHaveLength(value, length) {
    if ((value === null || value === void 0 ? void 0 : value.length) === length)
        return { pass: true };
    var actualString = createStr(value.length);
    var lengthString = createStr(length);
    return buildFail("expect(".concat(ACTUAL, ").toHaveLength(").concat(EXPECTED, ")\n\n    expected array to have length ").concat((0, colors_ts_1.green)(lengthString), " but was ").concat((0, colors_ts_1.red)(actualString)));
}
exports.toHaveLength = toHaveLength;
function toContain(value, item) {
    if (value && typeof value.includes === 'function' && value.includes(item)) {
        return { pass: true };
    }
    var actualString = createStr(value);
    var itemString = createStr(item);
    if (value && typeof value.includes === 'function') {
        return buildFail("expect(".concat(ACTUAL, ").toContain(").concat(EXPECTED, ")\n\n    ").concat((0, colors_ts_1.red)(actualString), " did not contain ").concat((0, colors_ts_1.green)(itemString)));
    }
    else {
        return buildFail("expect(".concat(ACTUAL, ").toContain(").concat(EXPECTED, ")\n\n    expected ").concat((0, colors_ts_1.red)(actualString), " to have an includes method but it is ").concat((0, colors_ts_1.green)(itemString)));
    }
}
exports.toContain = toContain;
function toThrow(value, error) {
    var fn;
    if (typeof value === 'function') {
        fn = value;
        try {
            value = value();
        }
        catch (err) {
            value = err;
        }
    }
    var actualString = createStr(fn);
    var errorString = createStr(error);
    if (value instanceof Error) {
        if (typeof error === 'string') {
            if (!value.message.includes(error)) {
                return buildFail("expect(".concat(ACTUAL, ").toThrow(").concat(EXPECTED, ")\n\nexpected ").concat((0, colors_ts_1.red)(actualString), " to throw error matching ").concat((0, colors_ts_1.green)(errorString), " but it threw ").concat((0, colors_ts_1.red)(value.toString())));
            }
        }
        else if (error instanceof RegExp) {
            if (!value.message.match(error)) {
                return buildFail("expect(".concat(ACTUAL, ").toThrow(").concat(EXPECTED, ")\n\nexpected ").concat((0, colors_ts_1.red)(actualString), " to throw error matching ").concat((0, colors_ts_1.green)(errorString), " but it threw ").concat((0, colors_ts_1.red)(value.toString())));
            }
        }
        return { pass: true };
    }
    else {
        return buildFail("expect(".concat(ACTUAL, ").toThrow(").concat(EXPECTED, ")\n\nexpected ").concat((0, colors_ts_1.red)(actualString), " to throw but it did not"));
    }
}
exports.toThrow = toThrow;
function extractMockCalls(value, name) {
    if (typeof value !== 'function') {
        return {
            calls: null,
            error: "".concat(name, " only works on mock functions. received: ").concat(value)
        };
    }
    var calls = mock.calls(value);
    if (calls === null) {
        return { calls: null, error: "".concat(name, " only works on mock functions") };
    }
    return { calls: calls };
}
function toHaveBeenCalled(value) {
    var _a = extractMockCalls(value, 'toHaveBeenCalled'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    var actualString = createStr(value);
    if (calls && calls.length !== 0)
        return { pass: true };
    return buildFail("expect(".concat(ACTUAL, ").toHaveBeenCalled()\n\n    ").concat((0, colors_ts_1.red)(actualString), " was not called"));
}
exports.toHaveBeenCalled = toHaveBeenCalled;
function toHaveBeenCalledTimes(value, times) {
    var _a = extractMockCalls(value, 'toHaveBeenCalledTimes'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    if (!calls)
        return buildFail('Invalid internal state');
    if (calls && calls.length === times)
        return { pass: true };
    return buildFail("expect(".concat(ACTUAL, ").toHaveBeenCalledTimes(").concat(EXPECTED, ")\n\n    expected ").concat(times, " calls but was called: ").concat(calls.length));
}
exports.toHaveBeenCalledTimes = toHaveBeenCalledTimes;
function toHaveBeenCalledWith(value) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var _a = extractMockCalls(value, 'toHaveBeenCalledWith'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    var wasCalledWith = calls && calls.some(function (c) { return (0, asserts_ts_1.equal)(c.args, args); });
    if (wasCalledWith)
        return { pass: true };
    var argsString = createStr(args);
    return buildFail("expect(".concat(ACTUAL, ").toHaveBeenCalledWith(").concat(EXPECTED, ")\n\n    function was not called with: ").concat((0, colors_ts_1.green)(argsString)));
}
exports.toHaveBeenCalledWith = toHaveBeenCalledWith;
function toHaveBeenLastCalledWith(value) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var _a = extractMockCalls(value, 'toHaveBeenLastCalledWith'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    if (!calls || !calls.length) {
        return buildFail("expect(".concat(ACTUAL, ").toHaveBeenLastCalledWith(...").concat(EXPECTED, ")\n\n    expect last call args to be ").concat(args, " but was not called"));
    }
    var lastCall = calls[calls.length - 1];
    if ((0, asserts_ts_1.equal)(lastCall.args, args))
        return { pass: true };
    return buildFail("expect(".concat(ACTUAL, ").toHaveBeenLastCalledWith(...").concat(EXPECTED, ")\n\n    expect last call args to be ").concat(args, " but was: ").concat(lastCall.args));
}
exports.toHaveBeenLastCalledWith = toHaveBeenLastCalledWith;
function toHaveBeenNthCalledWith(value, nth) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var _a = extractMockCalls(value, 'toHaveBeenNthCalledWith'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    var nthCall = calls && calls[nth - 1];
    if (nthCall) {
        if ((0, asserts_ts_1.equal)(nthCall.args, args))
            return { pass: true };
        return buildFail("expect(".concat(ACTUAL, ").toHaveBeenNthCalledWith(").concat(EXPECTED, ")\n\n    expect ").concat(nth, "th call args to be ").concat(args, " but was: ").concat(nthCall.args));
    }
    else {
        return buildFail("expect(".concat(ACTUAL, ").toHaveBeenNthCalledWith(").concat(EXPECTED, ")\n\n    ").concat(nth, "th call was not made."));
    }
}
exports.toHaveBeenNthCalledWith = toHaveBeenNthCalledWith;
function toHaveReturnedWith(value, result) {
    var _a = extractMockCalls(value, 'toHaveReturnedWith'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    var wasReturnedWith = calls && calls.some(function (c) { return c.returns && (0, asserts_ts_1.equal)(c.returned, result); });
    if (wasReturnedWith)
        return { pass: true };
    return buildFail("expect(".concat(ACTUAL, ").toHaveReturnedWith(").concat(EXPECTED, ")\n\n    function did not return: ").concat(result));
}
exports.toHaveReturnedWith = toHaveReturnedWith;
function toHaveReturned(value) {
    var _a = extractMockCalls(value, 'toHaveReturned'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    if (calls && calls.some(function (c) { return c.returns; }))
        return { pass: true };
    return buildFail("expected function to return but it never did");
}
exports.toHaveReturned = toHaveReturned;
function toHaveLastReturnedWith(value, expected) {
    var _a = extractMockCalls(value, 'toHaveLastReturnedWith'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    var lastCall = calls && calls[calls.length - 1];
    if (!lastCall) {
        return buildFail('no calls made to function');
    }
    if (lastCall.throws) {
        return buildFail("last call to function threw: ".concat(lastCall.thrown));
    }
    if ((0, asserts_ts_1.equal)(lastCall.returned, expected))
        return { pass: true };
    return buildFail("expected last call to return ".concat(expected, " but returned: ").concat(lastCall.returned));
}
exports.toHaveLastReturnedWith = toHaveLastReturnedWith;
function toHaveReturnedTimes(value, times) {
    var _a = extractMockCalls(value, 'toHaveReturnedTimes'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    var returnCount = calls && calls.filter(function (c) { return c.returns; }).length;
    if (returnCount !== times) {
        return buildFail("expected ".concat(times, " returned times but returned ").concat(returnCount, " times"));
    }
    return { pass: true };
}
exports.toHaveReturnedTimes = toHaveReturnedTimes;
function toHaveNthReturnedWith(value, nth, expected) {
    var _a = extractMockCalls(value, 'toHaveNthReturnedWith'), calls = _a.calls, error = _a.error;
    if (error)
        return buildFail(error);
    var nthCall = calls && calls[nth - 1];
    if (!nthCall) {
        return buildFail("".concat(nth, " calls were now made"));
    }
    if (nthCall.throws) {
        return buildFail("".concat(nth, "th call to function threw: ").concat(nthCall.thrown));
    }
    if (!(0, asserts_ts_1.equal)(nthCall.returned, expected)) {
        return buildFail("expected ".concat(nth, "th call to return ").concat(expected, " but returned: ").concat(nthCall.returned));
    }
    return { pass: true };
}
exports.toHaveNthReturnedWith = toHaveNthReturnedWith;
