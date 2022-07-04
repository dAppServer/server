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
exports.debounce = void 0;
function debounce(fn, wait) {
    var timeout = null;
    var flush = null;
    var debounced = (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        debounced.clear();
        flush = function () {
            debounced.clear();
            fn.call.apply(fn, __spreadArray([debounced], args, false));
        };
        timeout = setTimeout(flush, wait);
    });
    debounced.clear = function () {
        if (typeof timeout === "number") {
            clearTimeout(timeout);
            timeout = null;
            flush = null;
        }
    };
    debounced.flush = function () {
        flush === null || flush === void 0 ? void 0 : flush();
    };
    Object.defineProperty(debounced, "pending", {
        get: function () { return typeof timeout === "number"; }
    });
    return debounced;
}
exports.debounce = debounce;
