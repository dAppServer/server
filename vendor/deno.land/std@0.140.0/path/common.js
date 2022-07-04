"use strict";
exports.__esModule = true;
exports.common = void 0;
var separator_ts_1 = require("./separator.ts");
function common(paths, sep) {
    if (sep === void 0) { sep = separator_ts_1.SEP; }
    var _a = paths[0], first = _a === void 0 ? "" : _a, remaining = paths.slice(1);
    if (first === "" || remaining.length === 0) {
        return first.substring(0, first.lastIndexOf(sep) + 1);
    }
    var parts = first.split(sep);
    var endOfPrefix = parts.length;
    for (var _i = 0, remaining_1 = remaining; _i < remaining_1.length; _i++) {
        var path = remaining_1[_i];
        var compare = path.split(sep);
        for (var i = 0; i < endOfPrefix; i++) {
            if (compare[i] !== parts[i]) {
                endOfPrefix = i;
            }
        }
        if (endOfPrefix === 0) {
            return "";
        }
    }
    var prefix = parts.slice(0, endOfPrefix).join(sep);
    return prefix.endsWith(sep) ? prefix : "".concat(prefix).concat(sep);
}
exports.common = common;
