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
exports.addMatchers = exports.expect = void 0;
var builtInMatchers = require("./matchers.ts");
var asserts_ts_1 = require("https://deno.land/std@0.97.0/testing/asserts.ts");
var matchers = __assign({}, builtInMatchers);
function expect(value) {
    var isNot = false;
    var isPromised = false;
    var self = new Proxy({}, {
        get: function (_, name) {
            if (name === "not") {
                isNot = !isNot;
                return self;
            }
            if (name === "resolves") {
                if (!(value instanceof Promise)) {
                    throw new asserts_ts_1.AssertionError("expected value must be a Promise");
                }
                isPromised = true;
                return self;
            }
            if (name === "rejects") {
                if (!(value instanceof Promise)) {
                    throw new asserts_ts_1.AssertionError("expected value must be a Promise");
                }
                value = value.then(function (value) {
                    throw new asserts_ts_1.AssertionError("Promise did not reject. resolved to ".concat(value));
                }, function (err) { return err; });
                isPromised = true;
                return self;
            }
            var matcher = matchers[name];
            if (!matcher) {
                throw new TypeError(typeof name === "string"
                    ? "matcher not found: ".concat(name)
                    : "matcher not found");
            }
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                function applyMatcher(value, args) {
                    if (isNot) {
                        var result = matcher.apply(void 0, __spreadArray([value], args, false));
                        if (result.pass) {
                            throw new asserts_ts_1.AssertionError("should not " + result.message);
                        }
                    }
                    else {
                        var result = matcher.apply(void 0, __spreadArray([value], args, false));
                        if (!result.pass) {
                            throw new asserts_ts_1.AssertionError(result.message || "Unknown error");
                        }
                    }
                }
                return isPromised
                    ? value.then(function (value) { return applyMatcher(value, args); })
                    : applyMatcher(value, args);
            };
        }
    });
    return self;
}
exports.expect = expect;
function addMatchers(newMatchers) {
    Object.assign(matchers, newMatchers);
}
exports.addMatchers = addMatchers;
