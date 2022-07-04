"use strict";
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
exports.calls = exports.fn = void 0;
var MOCK_SYMBOL = Symbol["for"]("@MOCK");
function fn() {
    var stubs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stubs[_i] = arguments[_i];
    }
    var calls = [];
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var stub = stubs.length === 1
            ?
                stubs[0]
            :
                stubs[calls.length];
        try {
            var returned = stub ? stub.apply(void 0, args) : undefined;
            calls.push({
                args: args,
                returned: returned,
                timestamp: Date.now(),
                returns: true,
                throws: false
            });
            return returned;
        }
        catch (err) {
            calls.push({
                args: args,
                timestamp: Date.now(),
                returns: false,
                thrown: err,
                throws: true
            });
            throw err;
        }
    };
    Object.defineProperty(f, MOCK_SYMBOL, {
        value: { calls: calls },
        writable: false
    });
    return f;
}
exports.fn = fn;
function calls(f) {
    var mockInfo = f[MOCK_SYMBOL];
    if (!mockInfo)
        throw new Error("callCount only available on mock functions");
    return __spreadArray([], mockInfo.calls, true);
}
exports.calls = calls;
