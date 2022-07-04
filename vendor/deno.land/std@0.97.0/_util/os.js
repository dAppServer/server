"use strict";
exports.__esModule = true;
exports.isWindows = exports.osType = void 0;
exports.osType = (function () {
    var _a, _b, _c;
    if (globalThis.Deno != null) {
        return Deno.build.os;
    }
    var navigator = globalThis.navigator;
    if ((_c = (_b = (_a = navigator === null || navigator === void 0 ? void 0 : navigator.appVersion) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, "Win")) !== null && _c !== void 0 ? _c : false) {
        return "windows";
    }
    return "linux";
})();
exports.isWindows = exports.osType === "windows";
