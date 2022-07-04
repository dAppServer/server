"use strict";
exports.__esModule = true;
exports.joinGlobs = exports.normalizeGlob = exports.isGlob = exports.globToRegExp = void 0;
var separator_ts_1 = require("./separator.ts");
var _globrex_ts_1 = require("./_globrex.ts");
var mod_ts_1 = require("./mod.ts");
var assert_ts_1 = require("../_util/assert.ts");
function globToRegExp(glob, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.extended, extended = _c === void 0 ? false : _c, _d = _b.globstar, globstar = _d === void 0 ? true : _d;
    var result = (0, _globrex_ts_1.globrex)(glob, {
        extended: extended,
        globstar: globstar,
        strict: false,
        filepath: true
    });
    (0, assert_ts_1.assert)(result.path != null);
    return result.path.regex;
}
exports.globToRegExp = globToRegExp;
function isGlob(str) {
    var chars = { "{": "}", "(": ")", "[": "]" };
    var regex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
    if (str === "") {
        return false;
    }
    var match;
    while ((match = regex.exec(str))) {
        if (match[2])
            return true;
        var idx = match.index + match[0].length;
        var open_1 = match[1];
        var close_1 = open_1 ? chars[open_1] : null;
        if (open_1 && close_1) {
            var n = str.indexOf(close_1, idx);
            if (n !== -1) {
                idx = n + 1;
            }
        }
        str = str.slice(idx);
    }
    return false;
}
exports.isGlob = isGlob;
function normalizeGlob(glob, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.globstar, globstar = _c === void 0 ? false : _c;
    if (glob.match(/\0/g)) {
        throw new Error("Glob contains invalid characters: \"".concat(glob, "\""));
    }
    if (!globstar) {
        return (0, mod_ts_1.normalize)(glob);
    }
    var s = separator_ts_1.SEP_PATTERN.source;
    var badParentPattern = new RegExp("(?<=(".concat(s, "|^)\\*\\*").concat(s, ")\\.\\.(?=").concat(s, "|$)"), "g");
    return (0, mod_ts_1.normalize)(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
exports.normalizeGlob = normalizeGlob;
function joinGlobs(globs, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.extended, extended = _c === void 0 ? false : _c, _d = _b.globstar, globstar = _d === void 0 ? false : _d;
    if (!globstar || globs.length == 0) {
        return mod_ts_1.join.apply(void 0, globs);
    }
    if (globs.length === 0)
        return ".";
    var joined;
    for (var _i = 0, globs_1 = globs; _i < globs_1.length; _i++) {
        var glob = globs_1[_i];
        var path = glob;
        if (path.length > 0) {
            if (!joined)
                joined = path;
            else
                joined += "".concat(separator_ts_1.SEP).concat(path);
        }
    }
    if (!joined)
        return ".";
    return normalizeGlob(joined, { extended: extended, globstar: globstar });
}
exports.joinGlobs = joinGlobs;
