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
exports.joinGlobs = exports.normalizeGlob = exports.isGlob = exports.globToRegExp = void 0;
var os_ts_1 = require("../_util/os.ts");
var separator_ts_1 = require("./separator.ts");
var _win32 = require("./win32.ts");
var _posix = require("./posix.ts");
var path = os_ts_1.isWindows ? _win32 : _posix;
var join = path.join, normalize = path.normalize;
var regExpEscapeChars = [
    "!",
    "$",
    "(",
    ")",
    "*",
    "+",
    ".",
    "=",
    "?",
    "[",
    "\\",
    "^",
    "{",
    "|",
];
var rangeEscapeChars = ["-", "\\", "]"];
function globToRegExp(glob, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.extended, extended = _c === void 0 ? true : _c, _d = _b.globstar, globstarOption = _d === void 0 ? true : _d, _e = _b.os, os = _e === void 0 ? os_ts_1.osType : _e, _f = _b.caseInsensitive, caseInsensitive = _f === void 0 ? false : _f;
    if (glob == "") {
        return /(?!)/;
    }
    var sep = os == "windows" ? "(?:\\\\|/)+" : "/+";
    var sepMaybe = os == "windows" ? "(?:\\\\|/)*" : "/*";
    var seps = os == "windows" ? ["\\", "/"] : ["/"];
    var globstar = os == "windows"
        ? "(?:[^\\\\/]*(?:\\\\|/|$)+)*"
        : "(?:[^/]*(?:/|$)+)*";
    var wildcard = os == "windows" ? "[^\\\\/]*" : "[^/]*";
    var escapePrefix = os == "windows" ? "`" : "\\";
    var newLength = glob.length;
    for (; newLength > 1 && seps.includes(glob[newLength - 1]); newLength--)
        ;
    glob = glob.slice(0, newLength);
    var regExpString = "";
    for (var j = 0; j < glob.length;) {
        var segment = "";
        var groupStack = [];
        var inRange = false;
        var inEscape = false;
        var endsWithSep = false;
        var i = j;
        for (; i < glob.length && !seps.includes(glob[i]); i++) {
            if (inEscape) {
                inEscape = false;
                var escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
                segment += escapeChars.includes(glob[i]) ? "\\".concat(glob[i]) : glob[i];
                continue;
            }
            if (glob[i] == escapePrefix) {
                inEscape = true;
                continue;
            }
            if (glob[i] == "[") {
                if (!inRange) {
                    inRange = true;
                    segment += "[";
                    if (glob[i + 1] == "!") {
                        i++;
                        segment += "^";
                    }
                    else if (glob[i + 1] == "^") {
                        i++;
                        segment += "\\^";
                    }
                    continue;
                }
                else if (glob[i + 1] == ":") {
                    var k = i + 1;
                    var value = "";
                    while (glob[k + 1] != null && glob[k + 1] != ":") {
                        value += glob[k + 1];
                        k++;
                    }
                    if (glob[k + 1] == ":" && glob[k + 2] == "]") {
                        i = k + 2;
                        if (value == "alnum")
                            segment += "\\dA-Za-z";
                        else if (value == "alpha")
                            segment += "A-Za-z";
                        else if (value == "ascii")
                            segment += "\x00-\x7F";
                        else if (value == "blank")
                            segment += "\t ";
                        else if (value == "cntrl")
                            segment += "\x00-\x1F\x7F";
                        else if (value == "digit")
                            segment += "\\d";
                        else if (value == "graph")
                            segment += "\x21-\x7E";
                        else if (value == "lower")
                            segment += "a-z";
                        else if (value == "print")
                            segment += "\x20-\x7E";
                        else if (value == "punct") {
                            segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
                        }
                        else if (value == "space")
                            segment += "\\s\v";
                        else if (value == "upper")
                            segment += "A-Z";
                        else if (value == "word")
                            segment += "\\w";
                        else if (value == "xdigit")
                            segment += "\\dA-Fa-f";
                        continue;
                    }
                }
            }
            if (glob[i] == "]" && inRange) {
                inRange = false;
                segment += "]";
                continue;
            }
            if (inRange) {
                if (glob[i] == "\\") {
                    segment += "\\\\";
                }
                else {
                    segment += glob[i];
                }
                continue;
            }
            if (glob[i] == ")" && groupStack.length > 0 &&
                groupStack[groupStack.length - 1] != "BRACE") {
                segment += ")";
                var type = groupStack.pop();
                if (type == "!") {
                    segment += wildcard;
                }
                else if (type != "@") {
                    segment += type;
                }
                continue;
            }
            if (glob[i] == "|" && groupStack.length > 0 &&
                groupStack[groupStack.length - 1] != "BRACE") {
                segment += "|";
                continue;
            }
            if (glob[i] == "+" && extended && glob[i + 1] == "(") {
                i++;
                groupStack.push("+");
                segment += "(?:";
                continue;
            }
            if (glob[i] == "@" && extended && glob[i + 1] == "(") {
                i++;
                groupStack.push("@");
                segment += "(?:";
                continue;
            }
            if (glob[i] == "?") {
                if (extended && glob[i + 1] == "(") {
                    i++;
                    groupStack.push("?");
                    segment += "(?:";
                }
                else {
                    segment += ".";
                }
                continue;
            }
            if (glob[i] == "!" && extended && glob[i + 1] == "(") {
                i++;
                groupStack.push("!");
                segment += "(?!";
                continue;
            }
            if (glob[i] == "{") {
                groupStack.push("BRACE");
                segment += "(?:";
                continue;
            }
            if (glob[i] == "}" && groupStack[groupStack.length - 1] == "BRACE") {
                groupStack.pop();
                segment += ")";
                continue;
            }
            if (glob[i] == "," && groupStack[groupStack.length - 1] == "BRACE") {
                segment += "|";
                continue;
            }
            if (glob[i] == "*") {
                if (extended && glob[i + 1] == "(") {
                    i++;
                    groupStack.push("*");
                    segment += "(?:";
                }
                else {
                    var prevChar = glob[i - 1];
                    var numStars = 1;
                    while (glob[i + 1] == "*") {
                        i++;
                        numStars++;
                    }
                    var nextChar = glob[i + 1];
                    if (globstarOption && numStars == 2 &&
                        __spreadArray(__spreadArray([], seps, true), [undefined], false).includes(prevChar) &&
                        __spreadArray(__spreadArray([], seps, true), [undefined], false).includes(nextChar)) {
                        segment += globstar;
                        endsWithSep = true;
                    }
                    else {
                        segment += wildcard;
                    }
                }
                continue;
            }
            segment += regExpEscapeChars.includes(glob[i]) ? "\\".concat(glob[i]) : glob[i];
        }
        if (groupStack.length > 0 || inRange || inEscape) {
            segment = "";
            for (var _i = 0, _g = glob.slice(j, i); _i < _g.length; _i++) {
                var c = _g[_i];
                segment += regExpEscapeChars.includes(c) ? "\\".concat(c) : c;
                endsWithSep = false;
            }
        }
        regExpString += segment;
        if (!endsWithSep) {
            regExpString += i < glob.length ? sep : sepMaybe;
            endsWithSep = true;
        }
        while (seps.includes(glob[i]))
            i++;
        if (!(i > j)) {
            throw new Error("Assertion failure: i > j (potential infinite loop)");
        }
        j = i;
    }
    regExpString = "^".concat(regExpString, "$");
    return new RegExp(regExpString, caseInsensitive ? "i" : "");
}
exports.globToRegExp = globToRegExp;
function isGlob(str) {
    var chars = { "{": "}", "(": ")", "[": "]" };
    var regex = /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
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
        return normalize(glob);
    }
    var s = separator_ts_1.SEP_PATTERN.source;
    var badParentPattern = new RegExp("(?<=(".concat(s, "|^)\\*\\*").concat(s, ")\\.\\.(?=").concat(s, "|$)"), "g");
    return normalize(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
exports.normalizeGlob = normalizeGlob;
function joinGlobs(globs, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.extended, extended = _c === void 0 ? true : _c, _d = _b.globstar, globstar = _d === void 0 ? false : _d;
    if (!globstar || globs.length == 0) {
        return join.apply(void 0, globs);
    }
    if (globs.length === 0)
        return ".";
    var joined;
    for (var _i = 0, globs_1 = globs; _i < globs_1.length; _i++) {
        var glob = globs_1[_i];
        var path_1 = glob;
        if (path_1.length > 0) {
            if (!joined)
                joined = path_1;
            else
                joined += "".concat(separator_ts_1.SEP).concat(path_1);
        }
    }
    if (!joined)
        return ".";
    return normalizeGlob(joined, { extended: extended, globstar: globstar });
}
exports.joinGlobs = joinGlobs;
