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
exports.promisify = void 0;
var kCustomPromisifiedSymbol = Symbol["for"]("nodejs.util.promisify.custom");
var kCustomPromisifyArgsSymbol = Symbol["for"]("nodejs.util.promisify.customArgs");
var NodeInvalidArgTypeError = (function (_super) {
    __extends(NodeInvalidArgTypeError, _super);
    function NodeInvalidArgTypeError(argumentName, type, received) {
        var _this = _super.call(this, "The \"".concat(argumentName, "\" argument must be of type ").concat(type, ". Received ").concat(typeof received)) || this;
        _this.code = "ERR_INVALID_ARG_TYPE";
        return _this;
    }
    return NodeInvalidArgTypeError;
}(TypeError));
function promisify(original) {
    if (typeof original !== "function") {
        throw new NodeInvalidArgTypeError("original", "Function", original);
    }
    if (original[kCustomPromisifiedSymbol]) {
        var fn_1 = original[kCustomPromisifiedSymbol];
        if (typeof fn_1 !== "function") {
            throw new NodeInvalidArgTypeError("util.promisify.custom", "Function", fn_1);
        }
        return Object.defineProperty(fn_1, kCustomPromisifiedSymbol, {
            value: fn_1,
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    var argumentNames = original[kCustomPromisifyArgsSymbol];
    function fn() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            original.call.apply(original, __spreadArray(__spreadArray([_this], args, false), [function (err) {
                    var values = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        values[_i - 1] = arguments[_i];
                    }
                    if (err) {
                        return reject(err);
                    }
                    if (argumentNames !== undefined && values.length > 1) {
                        var obj = {};
                        for (var i = 0; i < argumentNames.length; i++) {
                            obj[argumentNames[i]] = values[i];
                        }
                        resolve(obj);
                    }
                    else {
                        resolve(values[0]);
                    }
                }], false));
        });
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
    });
    return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
}
exports.promisify = promisify;
promisify.custom = kCustomPromisifiedSymbol;
