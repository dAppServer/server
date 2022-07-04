"use strict";
exports.__esModule = true;
exports.globrex = void 0;
var _constants_ts_1 = require("./_constants.ts");
var SEP = _constants_ts_1.isWindows ? "(?:\\\\|\\/)" : "\\/";
var SEP_ESC = _constants_ts_1.isWindows ? "\\\\" : "/";
var SEP_RAW = _constants_ts_1.isWindows ? "\\" : "/";
var GLOBSTAR = "(?:(?:[^".concat(SEP_ESC, "/]*(?:").concat(SEP_ESC, "|/|$))*)");
var WILDCARD = "(?:[^".concat(SEP_ESC, "/]*)");
var GLOBSTAR_SEGMENT = "((?:[^".concat(SEP_ESC, "/]*(?:").concat(SEP_ESC, "|/|$))*)");
var WILDCARD_SEGMENT = "(?:[^".concat(SEP_ESC, "/]*)");
function globrex(glob, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.extended, extended = _c === void 0 ? false : _c, _d = _b.globstar, globstar = _d === void 0 ? false : _d, _e = _b.strict, strict = _e === void 0 ? false : _e, _f = _b.filepath, filepath = _f === void 0 ? false : _f, _g = _b.flags, flags = _g === void 0 ? "" : _g;
    var sepPattern = new RegExp("^".concat(SEP).concat(strict ? "" : "+", "$"));
    var regex = "";
    var segment = "";
    var pathRegexStr = "";
    var pathSegments = [];
    var inGroup = false;
    var inRange = false;
    var ext = [];
    function add(str, options) {
        if (options === void 0) { options = { split: false, last: false, only: "" }; }
        var split = options.split, last = options.last, only = options.only;
        if (only !== "path")
            regex += str;
        if (filepath && only !== "regex") {
            pathRegexStr += str.match(sepPattern) ? SEP : str;
            if (split) {
                if (last)
                    segment += str;
                if (segment !== "") {
                    if (!flags.includes("g"))
                        segment = "^".concat(segment, "$");
                    pathSegments.push(new RegExp(segment, flags));
                }
                segment = "";
            }
            else {
                segment += str;
            }
        }
    }
    var c, n;
    for (var i = 0; i < glob.length; i++) {
        c = glob[i];
        n = glob[i + 1];
        if (["\\", "$", "^", ".", "="].includes(c)) {
            add("\\".concat(c));
            continue;
        }
        if (c.match(sepPattern)) {
            add(SEP, { split: true });
            if (n != null && n.match(sepPattern) && !strict)
                regex += "?";
            continue;
        }
        if (c === "(") {
            if (ext.length) {
                add("".concat(c, "?:"));
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === ")") {
            if (ext.length) {
                add(c);
                var type = ext.pop();
                if (type === "@") {
                    add("{1}");
                }
                else if (type === "!") {
                    add(WILDCARD);
                }
                else {
                    add(type);
                }
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "|") {
            if (ext.length) {
                add(c);
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "+") {
            if (n === "(" && extended) {
                ext.push(c);
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "@" && extended) {
            if (n === "(") {
                ext.push(c);
                continue;
            }
        }
        if (c === "!") {
            if (extended) {
                if (inRange) {
                    add("^");
                    continue;
                }
                if (n === "(") {
                    ext.push(c);
                    add("(?!");
                    i++;
                    continue;
                }
                add("\\".concat(c));
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "?") {
            if (extended) {
                if (n === "(") {
                    ext.push(c);
                }
                else {
                    add(".");
                }
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "[") {
            if (inRange && n === ":") {
                i++;
                var value = "";
                while (glob[++i] !== ":")
                    value += glob[i];
                if (value === "alnum")
                    add("(?:\\w|\\d)");
                else if (value === "space")
                    add("\\s");
                else if (value === "digit")
                    add("\\d");
                i++;
                continue;
            }
            if (extended) {
                inRange = true;
                add(c);
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "]") {
            if (extended) {
                inRange = false;
                add(c);
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "{") {
            if (extended) {
                inGroup = true;
                add("(?:");
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "}") {
            if (extended) {
                inGroup = false;
                add(")");
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === ",") {
            if (inGroup) {
                add("|");
                continue;
            }
            add("\\".concat(c));
            continue;
        }
        if (c === "*") {
            if (n === "(" && extended) {
                ext.push(c);
                continue;
            }
            var prevChar = glob[i - 1];
            var starCount = 1;
            while (glob[i + 1] === "*") {
                starCount++;
                i++;
            }
            var nextChar = glob[i + 1];
            if (!globstar) {
                add(".*");
            }
            else {
                var isGlobstar = starCount > 1 &&
                    [SEP_RAW, "/", undefined].includes(prevChar) &&
                    [SEP_RAW, "/", undefined].includes(nextChar);
                if (isGlobstar) {
                    add(GLOBSTAR, { only: "regex" });
                    add(GLOBSTAR_SEGMENT, { only: "path", last: true, split: true });
                    i++;
                }
                else {
                    add(WILDCARD, { only: "regex" });
                    add(WILDCARD_SEGMENT, { only: "path" });
                }
            }
            continue;
        }
        add(c);
    }
    if (!flags.includes("g")) {
        regex = "^".concat(regex, "$");
        segment = "^".concat(segment, "$");
        if (filepath)
            pathRegexStr = "^".concat(pathRegexStr, "$");
    }
    var result = { regex: new RegExp(regex, flags) };
    if (filepath) {
        pathSegments.push(new RegExp(segment, flags));
        result.path = {
            regex: new RegExp(pathRegexStr, flags),
            segments: pathSegments,
            globstar: new RegExp(!flags.includes("g") ? "^".concat(GLOBSTAR_SEGMENT, "$") : GLOBSTAR_SEGMENT, flags)
        };
    }
    return result;
}
exports.globrex = globrex;
