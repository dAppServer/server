"use strict";
exports.__esModule = true;
exports.toFileUrl = exports.fromFileUrl = exports.parse = exports.format = exports.extname = exports.basename = exports.dirname = exports.toNamespacedPath = exports.relative = exports.join = exports.isAbsolute = exports.normalize = exports.resolve = exports.delimiter = exports.sep = void 0;
var _constants_ts_1 = require("./_constants.ts");
var _util_ts_1 = require("./_util.ts");
var assert_ts_1 = require("../_util/assert.ts");
exports.sep = "\\";
exports.delimiter = ";";
function resolve() {
    var pathSegments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathSegments[_i] = arguments[_i];
    }
    var resolvedDevice = "";
    var resolvedTail = "";
    var resolvedAbsolute = false;
    for (var i = pathSegments.length - 1; i >= -1; i--) {
        var path = void 0;
        if (i >= 0) {
            path = pathSegments[i];
        }
        else if (!resolvedDevice) {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path = Deno.cwd();
        }
        else {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno.env.get("=".concat(resolvedDevice)) || Deno.cwd();
            if (path === undefined ||
                path.slice(0, 3).toLowerCase() !== "".concat(resolvedDevice.toLowerCase(), "\\")) {
                path = "".concat(resolvedDevice, "\\");
            }
        }
        (0, _util_ts_1.assertPath)(path);
        var len = path.length;
        if (len === 0)
            continue;
        var rootEnd = 0;
        var device = "";
        var isAbsolute_1 = false;
        var code = path.charCodeAt(0);
        if (len > 1) {
            if ((0, _util_ts_1.isPathSeparator)(code)) {
                isAbsolute_1 = true;
                if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(1))) {
                    var j = 2;
                    var last = j;
                    for (; j < len; ++j) {
                        if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        var firstPart = path.slice(last, j);
                        last = j;
                        for (; j < len; ++j) {
                            if (!(0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for (; j < len; ++j) {
                                if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                device = "\\\\".concat(firstPart, "\\").concat(path.slice(last));
                                rootEnd = j;
                            }
                            else if (j !== last) {
                                device = "\\\\".concat(firstPart, "\\").concat(path.slice(last, j));
                                rootEnd = j;
                            }
                        }
                    }
                }
                else {
                    rootEnd = 1;
                }
            }
            else if ((0, _util_ts_1.isWindowsDeviceRoot)(code)) {
                if (path.charCodeAt(1) === _constants_ts_1.CHAR_COLON) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(2))) {
                            isAbsolute_1 = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        }
        else if ((0, _util_ts_1.isPathSeparator)(code)) {
            rootEnd = 1;
            isAbsolute_1 = true;
        }
        if (device.length > 0 &&
            resolvedDevice.length > 0 &&
            device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = "".concat(path.slice(rootEnd), "\\").concat(resolvedTail);
            resolvedAbsolute = isAbsolute_1;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0)
            break;
    }
    resolvedTail = (0, _util_ts_1.normalizeString)(resolvedTail, !resolvedAbsolute, "\\", _util_ts_1.isPathSeparator);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
exports.resolve = resolve;
function normalize(path) {
    (0, _util_ts_1.assertPath)(path);
    var len = path.length;
    if (len === 0)
        return ".";
    var rootEnd = 0;
    var device;
    var isAbsolute = false;
    var code = path.charCodeAt(0);
    if (len > 1) {
        if ((0, _util_ts_1.isPathSeparator)(code)) {
            isAbsolute = true;
            if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(1))) {
                var j = 2;
                var last = j;
                for (; j < len; ++j) {
                    if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                        break;
                }
                if (j < len && j !== last) {
                    var firstPart = path.slice(last, j);
                    last = j;
                    for (; j < len; ++j) {
                        if (!(0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for (; j < len; ++j) {
                            if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                                break;
                        }
                        if (j === len) {
                            return "\\\\".concat(firstPart, "\\").concat(path.slice(last), "\\");
                        }
                        else if (j !== last) {
                            device = "\\\\".concat(firstPart, "\\").concat(path.slice(last, j));
                            rootEnd = j;
                        }
                    }
                }
            }
            else {
                rootEnd = 1;
            }
        }
        else if ((0, _util_ts_1.isWindowsDeviceRoot)(code)) {
            if (path.charCodeAt(1) === _constants_ts_1.CHAR_COLON) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    }
    else if ((0, _util_ts_1.isPathSeparator)(code)) {
        return "\\";
    }
    var tail;
    if (rootEnd < len) {
        tail = (0, _util_ts_1.normalizeString)(path.slice(rootEnd), !isAbsolute, "\\", _util_ts_1.isPathSeparator);
    }
    else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute)
        tail = ".";
    if (tail.length > 0 && (0, _util_ts_1.isPathSeparator)(path.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute) {
            if (tail.length > 0)
                return "\\".concat(tail);
            else
                return "\\";
        }
        else if (tail.length > 0) {
            return tail;
        }
        else {
            return "";
        }
    }
    else if (isAbsolute) {
        if (tail.length > 0)
            return "".concat(device, "\\").concat(tail);
        else
            return "".concat(device, "\\");
    }
    else if (tail.length > 0) {
        return device + tail;
    }
    else {
        return device;
    }
}
exports.normalize = normalize;
function isAbsolute(path) {
    (0, _util_ts_1.assertPath)(path);
    var len = path.length;
    if (len === 0)
        return false;
    var code = path.charCodeAt(0);
    if ((0, _util_ts_1.isPathSeparator)(code)) {
        return true;
    }
    else if ((0, _util_ts_1.isWindowsDeviceRoot)(code)) {
        if (len > 2 && path.charCodeAt(1) === _constants_ts_1.CHAR_COLON) {
            if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(2)))
                return true;
        }
    }
    return false;
}
exports.isAbsolute = isAbsolute;
function join() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    var pathsCount = paths.length;
    if (pathsCount === 0)
        return ".";
    var joined;
    var firstPart = null;
    for (var i = 0; i < pathsCount; ++i) {
        var path = paths[i];
        (0, _util_ts_1.assertPath)(path);
        if (path.length > 0) {
            if (joined === undefined)
                joined = firstPart = path;
            else
                joined += "\\".concat(path);
        }
    }
    if (joined === undefined)
        return ".";
    var needsReplace = true;
    var slashCount = 0;
    (0, assert_ts_1.assert)(firstPart != null);
    if ((0, _util_ts_1.isPathSeparator)(firstPart.charCodeAt(0))) {
        ++slashCount;
        var firstLen = firstPart.length;
        if (firstLen > 1) {
            if ((0, _util_ts_1.isPathSeparator)(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if ((0, _util_ts_1.isPathSeparator)(firstPart.charCodeAt(2)))
                        ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for (; slashCount < joined.length; ++slashCount) {
            if (!(0, _util_ts_1.isPathSeparator)(joined.charCodeAt(slashCount)))
                break;
        }
        if (slashCount >= 2)
            joined = "\\".concat(joined.slice(slashCount));
    }
    return normalize(joined);
}
exports.join = join;
function relative(from, to) {
    (0, _util_ts_1.assertPath)(from);
    (0, _util_ts_1.assertPath)(to);
    if (from === to)
        return "";
    var fromOrig = resolve(from);
    var toOrig = resolve(to);
    if (fromOrig === toOrig)
        return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to)
        return "";
    var fromStart = 0;
    var fromEnd = from.length;
    for (; fromStart < fromEnd; ++fromStart) {
        if (from.charCodeAt(fromStart) !== _constants_ts_1.CHAR_BACKWARD_SLASH)
            break;
    }
    for (; fromEnd - 1 > fromStart; --fromEnd) {
        if (from.charCodeAt(fromEnd - 1) !== _constants_ts_1.CHAR_BACKWARD_SLASH)
            break;
    }
    var fromLen = fromEnd - fromStart;
    var toStart = 0;
    var toEnd = to.length;
    for (; toStart < toEnd; ++toStart) {
        if (to.charCodeAt(toStart) !== _constants_ts_1.CHAR_BACKWARD_SLASH)
            break;
    }
    for (; toEnd - 1 > toStart; --toEnd) {
        if (to.charCodeAt(toEnd - 1) !== _constants_ts_1.CHAR_BACKWARD_SLASH)
            break;
    }
    var toLen = toEnd - toStart;
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === _constants_ts_1.CHAR_BACKWARD_SLASH) {
                    return toOrig.slice(toStart + i + 1);
                }
                else if (i === 2) {
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === _constants_ts_1.CHAR_BACKWARD_SLASH) {
                    lastCommonSep = i;
                }
                else if (i === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode)
            break;
        else if (fromCode === _constants_ts_1.CHAR_BACKWARD_SLASH)
            lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }
    var out = "";
    if (lastCommonSep === -1)
        lastCommonSep = 0;
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === _constants_ts_1.CHAR_BACKWARD_SLASH) {
            if (out.length === 0)
                out += "..";
            else
                out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    }
    else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === _constants_ts_1.CHAR_BACKWARD_SLASH)
            ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
exports.relative = relative;
function toNamespacedPath(path) {
    if (typeof path !== "string")
        return path;
    if (path.length === 0)
        return "";
    var resolvedPath = resolve(path);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === _constants_ts_1.CHAR_BACKWARD_SLASH) {
            if (resolvedPath.charCodeAt(1) === _constants_ts_1.CHAR_BACKWARD_SLASH) {
                var code = resolvedPath.charCodeAt(2);
                if (code !== _constants_ts_1.CHAR_QUESTION_MARK && code !== _constants_ts_1.CHAR_DOT) {
                    return "\\\\?\\UNC\\".concat(resolvedPath.slice(2));
                }
            }
        }
        else if ((0, _util_ts_1.isWindowsDeviceRoot)(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === _constants_ts_1.CHAR_COLON &&
                resolvedPath.charCodeAt(2) === _constants_ts_1.CHAR_BACKWARD_SLASH) {
                return "\\\\?\\".concat(resolvedPath);
            }
        }
    }
    return path;
}
exports.toNamespacedPath = toNamespacedPath;
function dirname(path) {
    (0, _util_ts_1.assertPath)(path);
    var len = path.length;
    if (len === 0)
        return ".";
    var rootEnd = -1;
    var end = -1;
    var matchedSlash = true;
    var offset = 0;
    var code = path.charCodeAt(0);
    if (len > 1) {
        if ((0, _util_ts_1.isPathSeparator)(code)) {
            rootEnd = offset = 1;
            if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(1))) {
                var j = 2;
                var last = j;
                for (; j < len; ++j) {
                    if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                        break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for (; j < len; ++j) {
                        if (!(0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for (; j < len; ++j) {
                            if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                                break;
                        }
                        if (j === len) {
                            return path;
                        }
                        if (j !== last) {
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        }
        else if ((0, _util_ts_1.isWindowsDeviceRoot)(code)) {
            if (path.charCodeAt(1) === _constants_ts_1.CHAR_COLON) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(2)))
                        rootEnd = offset = 3;
                }
            }
        }
    }
    else if ((0, _util_ts_1.isPathSeparator)(code)) {
        return path;
    }
    for (var i = len - 1; i >= offset; --i) {
        if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        }
        else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1)
            return ".";
        else
            end = rootEnd;
    }
    return path.slice(0, end);
}
exports.dirname = dirname;
function basename(path, ext) {
    if (ext === void 0) { ext = ""; }
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    (0, _util_ts_1.assertPath)(path);
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (path.length >= 2) {
        var drive = path.charCodeAt(0);
        if ((0, _util_ts_1.isWindowsDeviceRoot)(drive)) {
            if (path.charCodeAt(1) === _constants_ts_1.CHAR_COLON)
                start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path)
            return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= start; --i) {
            var code = path.charCodeAt(i);
            if ((0, _util_ts_1.isPathSeparator)(code)) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    }
                    else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end)
            end = firstNonSlashEnd;
        else if (end === -1)
            end = path.length;
        return path.slice(start, end);
    }
    else {
        for (i = path.length - 1; i >= start; --i) {
            if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1)
            return "";
        return path.slice(start, end);
    }
}
exports.basename = basename;
function extname(path) {
    (0, _util_ts_1.assertPath)(path);
    var start = 0;
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var preDotState = 0;
    if (path.length >= 2 &&
        path.charCodeAt(1) === _constants_ts_1.CHAR_COLON &&
        (0, _util_ts_1.isWindowsDeviceRoot)(path.charCodeAt(0))) {
        start = startPart = 2;
    }
    for (var i = path.length - 1; i >= start; --i) {
        var code = path.charCodeAt(i);
        if ((0, _util_ts_1.isPathSeparator)(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === _constants_ts_1.CHAR_DOT) {
            if (startDot === -1)
                startDot = i;
            else if (preDotState !== 1)
                preDotState = 1;
        }
        else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 ||
        end === -1 ||
        preDotState === 0 ||
        (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
        return "";
    }
    return path.slice(startDot, end);
}
exports.extname = extname;
function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError("The \"pathObject\" argument must be of type Object. Received type ".concat(typeof pathObject));
    }
    return (0, _util_ts_1._format)("\\", pathObject);
}
exports.format = format;
function parse(path) {
    (0, _util_ts_1.assertPath)(path);
    var ret = { root: "", dir: "", base: "", ext: "", name: "" };
    var len = path.length;
    if (len === 0)
        return ret;
    var rootEnd = 0;
    var code = path.charCodeAt(0);
    if (len > 1) {
        if ((0, _util_ts_1.isPathSeparator)(code)) {
            rootEnd = 1;
            if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(1))) {
                var j = 2;
                var last = j;
                for (; j < len; ++j) {
                    if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                        break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for (; j < len; ++j) {
                        if (!(0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for (; j < len; ++j) {
                            if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(j)))
                                break;
                        }
                        if (j === len) {
                            rootEnd = j;
                        }
                        else if (j !== last) {
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        }
        else if ((0, _util_ts_1.isWindowsDeviceRoot)(code)) {
            if (path.charCodeAt(1) === _constants_ts_1.CHAR_COLON) {
                rootEnd = 2;
                if (len > 2) {
                    if ((0, _util_ts_1.isPathSeparator)(path.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                }
                else {
                    ret.root = ret.dir = path;
                    return ret;
                }
            }
        }
    }
    else if ((0, _util_ts_1.isPathSeparator)(code)) {
        ret.root = ret.dir = path;
        return ret;
    }
    if (rootEnd > 0)
        ret.root = path.slice(0, rootEnd);
    var startDot = -1;
    var startPart = rootEnd;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;
    var preDotState = 0;
    for (; i >= rootEnd; --i) {
        code = path.charCodeAt(i);
        if ((0, _util_ts_1.isPathSeparator)(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === _constants_ts_1.CHAR_DOT) {
            if (startDot === -1)
                startDot = i;
            else if (preDotState !== 1)
                preDotState = 1;
        }
        else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 ||
        end === -1 ||
        preDotState === 0 ||
        (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
        if (end !== -1) {
            ret.base = ret.name = path.slice(startPart, end);
        }
    }
    else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
    }
    else
        ret.dir = ret.root;
    return ret;
}
exports.parse = parse;
function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    var path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path = "\\\\".concat(url.hostname).concat(path);
    }
    return path;
}
exports.fromFileUrl = fromFileUrl;
function toFileUrl(path) {
    if (!isAbsolute(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    var _a = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/), hostname = _a[1], pathname = _a[2];
    var url = new URL("file:///");
    url.pathname = (0, _util_ts_1.encodeWhitespace)(pathname.replace(/%/g, "%25"));
    if (hostname != null && hostname != "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
exports.toFileUrl = toFileUrl;
