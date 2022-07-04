"use strict";
exports.__esModule = true;
exports.networkInterfaces = exports.utimeSync = exports.utime = exports.systemMemoryInfo = exports.setRaw = exports.removeSignalListener = exports.osRelease = exports.loadavg = exports.hostname = exports.getUid = exports.futimeSync = exports.futime = exports.consoleSize = exports.createHttpClient = exports.addSignalListener = void 0;
function addSignalListener() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.addSignalListener == "function") {
        return Deno.addSignalListener.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.addSignalListener = addSignalListener;
function createHttpClient() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.createHttpClient == "function") {
        return Deno.createHttpClient.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.createHttpClient = createHttpClient;
function consoleSize() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.consoleSize == "function") {
        return Deno.consoleSize.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.consoleSize = consoleSize;
function futime() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.futime == "function") {
        return Deno.futime.apply(Deno, args);
    }
    else {
        return Promise.reject(new TypeError("Requires --unstable"));
    }
}
exports.futime = futime;
function futimeSync() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.futimeSync == "function") {
        return Deno.futimeSync.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.futimeSync = futimeSync;
function getUid() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.getUid == "function") {
        return Deno.getUid.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.getUid = getUid;
function hostname() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.hostname == "function") {
        return Deno.hostname.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.hostname = hostname;
function loadavg() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.loadavg == "function") {
        return Deno.loadavg.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.loadavg = loadavg;
function osRelease() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.osRelease == "function") {
        return Deno.osRelease.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.osRelease = osRelease;
function removeSignalListener() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.removeSignalListener == "function") {
        return Deno.removeSignalListener.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.removeSignalListener = removeSignalListener;
function setRaw() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.setRaw == "function") {
        return Deno.setRaw.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.setRaw = setRaw;
function systemMemoryInfo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.systemMemoryInfo == "function") {
        return Deno.systemMemoryInfo.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.systemMemoryInfo = systemMemoryInfo;
function utime() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.utime == "function") {
        return Deno.utime.apply(Deno, args);
    }
    else {
        return Promise.reject(new TypeError("Requires --unstable"));
    }
}
exports.utime = utime;
function utimeSync() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.utimeSync == "function") {
        return Deno.utimeSync.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.utimeSync = utimeSync;
function networkInterfaces() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof Deno.networkInterfaces == "function") {
        return Deno.networkInterfaces.apply(Deno, args);
    }
    else {
        throw new TypeError("Requires --unstable");
    }
}
exports.networkInterfaces = networkInterfaces;
