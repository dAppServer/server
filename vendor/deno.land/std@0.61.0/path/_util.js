"use strict";
exports.__esModule = true;
exports._format = exports.normalizeString = exports.isWindowsDeviceRoot = exports.isPathSeparator = exports.isPosixPathSeparator = exports.assertPath = void 0;
var _constants_ts_1 = require("./_constants.ts");
function assertPath(path) {
    if (typeof path !== "string") {
        throw new TypeError("Path must be a string. Received ".concat(JSON.stringify(path)));
    }
}
exports.assertPath = assertPath;
function isPosixPathSeparator(code) {
    return code === _constants_ts_1.CHAR_FORWARD_SLASH;
}
exports.isPosixPathSeparator = isPosixPathSeparator;
function isPathSeparator(code) {
    return isPosixPathSeparator(code) || code === _constants_ts_1.CHAR_BACKWARD_SLASH;
}
exports.isPathSeparator = isPathSeparator;
function isWindowsDeviceRoot(code) {
    return ((code >= _constants_ts_1.CHAR_LOWERCASE_A && code <= _constants_ts_1.CHAR_LOWERCASE_Z) ||
        (code >= _constants_ts_1.CHAR_UPPERCASE_A && code <= _constants_ts_1.CHAR_UPPERCASE_Z));
}
exports.isWindowsDeviceRoot = isWindowsDeviceRoot;
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    var res = "";
    var lastSegmentLength = 0;
    var lastSlash = -1;
    var dots = 0;
    var code;
    for (var i = 0, len = path.length; i <= len; ++i) {
        if (i < len)
            code = path.charCodeAt(i);
        else if (isPathSeparator(code))
            break;
        else
            code = _constants_ts_1.CHAR_FORWARD_SLASH;
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {
            }
            else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 ||
                    lastSegmentLength !== 2 ||
                    res.charCodeAt(res.length - 1) !== _constants_ts_1.CHAR_DOT ||
                    res.charCodeAt(res.length - 2) !== _constants_ts_1.CHAR_DOT) {
                    if (res.length > 2) {
                        var lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        }
                        else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                    else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0)
                        res += "".concat(separator, "..");
                    else
                        res = "..";
                    lastSegmentLength = 2;
                }
            }
            else {
                if (res.length > 0)
                    res += separator + path.slice(lastSlash + 1, i);
                else
                    res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        }
        else if (code === _constants_ts_1.CHAR_DOT && dots !== -1) {
            ++dots;
        }
        else {
            dots = -1;
        }
    }
    return res;
}
exports.normalizeString = normalizeString;
function _format(sep, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir)
        return base;
    if (dir === pathObject.root)
        return dir + base;
    return dir + sep + base;
}
exports._format = _format;
