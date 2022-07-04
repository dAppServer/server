"use strict";
var _a;
exports.__esModule = true;
exports.fromUint8Array = exports.toUint8Array = exports.byteLength = void 0;
var base_ts_1 = require("./base.ts");
var lookup = [];
var revLookup = [];
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, l = code.length; i < l; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
exports.byteLength = (_a = (0, base_ts_1.init)(lookup, revLookup), _a.byteLength), exports.toUint8Array = _a.toUint8Array, exports.fromUint8Array = _a.fromUint8Array;
