"use strict";
exports.__esModule = true;
exports.isWindows = exports.osType = void 0;
exports.osType = (function () {
    var _a, _b, _c, _d;
    var Deno = globalThis.Deno;
    if (typeof ((_a = Deno === null || Deno === void 0 ? void 0 : Deno.build) === null || _a === void 0 ? void 0 : _a.os) === "string") {
        return Deno.build.os;
    }
    var navigator = globalThis.navigator;
    if ((_d = (_c = (_b = navigator === null || navigator === void 0 ? void 0 : navigator.appVersion) === null || _b === void 0 ? void 0 : _b.includes) === null || _c === void 0 ? void 0 : _c.call(_b, "Win")) !== null && _d !== void 0 ? _d : false) {
        return "windows";
    }
    return "linux";
})();
exports.isWindows = exports.osType === "windows";
