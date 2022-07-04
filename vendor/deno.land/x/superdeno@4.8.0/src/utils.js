"use strict";
exports.__esModule = true;
exports.isServer = exports.isStdNativeServer = exports.isStdLegacyServer = exports.isListener = exports.isString = void 0;
var isString = function (thing) {
    return typeof thing === "string";
};
exports.isString = isString;
var isListener = function (thing) {
    return thing instanceof Object && thing !== null && "listen" in thing;
};
exports.isListener = isListener;
var isCommonServer = function (thing) {
    return thing instanceof Object && thing !== null && "close" in thing;
};
var isStdLegacyServer = function (thing) {
    return isCommonServer(thing) &&
        "listener" in thing;
};
exports.isStdLegacyServer = isStdLegacyServer;
var isStdNativeServer = function (thing) {
    return isCommonServer(thing) &&
        "addrs" in thing;
};
exports.isStdNativeServer = isStdNativeServer;
var isServer = function (thing) {
    return (0, exports.isStdLegacyServer)(thing) || (0, exports.isStdNativeServer)(thing);
};
exports.isServer = isServer;
