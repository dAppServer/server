"use strict";
exports.__esModule = true;
exports.tmpdir = exports.cachedir = void 0;
var deps_ts_1 = require("./deps.ts");
var POSIX_HOME = "HOME";
function cachedir() {
    var env = Deno.env.get;
    var os = Deno.build.os;
    var deno = env("DENO_DIR");
    if (deno)
        return (0, deps_ts_1.resolve)(deno);
    var home;
    var path;
    switch (os) {
        case "linux": {
            var xdg = env("XDG_CACHE_HOME");
            home = xdg !== null && xdg !== void 0 ? xdg : env(POSIX_HOME);
            path = xdg ? "deno" : (0, deps_ts_1.join)(".cache", "deno");
            break;
        }
        case "darwin":
            home = env(POSIX_HOME);
            path = (0, deps_ts_1.join)("Library", "Caches", "deno");
            break;
        case "windows":
            home = env("LOCALAPPDATA");
            home = home !== null && home !== void 0 ? home : env("USERPROFILE");
            path = "deno";
            break;
    }
    path = home ? path : ".deno";
    if (!home)
        return path;
    return (0, deps_ts_1.resolve)((0, deps_ts_1.join)(home, path));
}
exports.cachedir = cachedir;
function tmpdir() {
    var _a, _b, _c, _d;
    var env = Deno.env.get;
    var os = Deno.build.os;
    var tmp = (_b = (_a = env("TMPDIR")) !== null && _a !== void 0 ? _a : env("TEMP")) !== null && _b !== void 0 ? _b : env("TMP");
    if (tmp)
        return (0, deps_ts_1.resolve)(tmp);
    switch (os) {
        case "linux":
        case "darwin":
            return (0, deps_ts_1.resolve)("/tmp");
        case "windows":
            return (0, deps_ts_1.resolve)((0, deps_ts_1.join)((_d = (_c = env("HOMEDRIVE")) !== null && _c !== void 0 ? _c : env("SYSTEMDRIVE")) !== null && _d !== void 0 ? _d : "C:", "TEMP"));
    }
}
exports.tmpdir = tmpdir;
