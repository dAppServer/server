"use strict";
exports.__esModule = true;
exports.fromFileUrl = exports.parse = exports.format = exports.extname = exports.basename = exports.dirname = exports.toNamespacedPath = exports.relative = exports.join = exports.isAbsolute = exports.normalize = exports.resolve = exports.delimiter = exports.sep = void 0;
var _constants_ts_1 = require("./_constants.ts");
var _util_ts_1 = require("./_util.ts");
exports.sep = "/";
exports.delimiter = ":";
function resolve() {
    var pathSegments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pathSegments[_i] = arguments[_i];
    }
    var resolvedPath = "";
    var resolvedAbsolute = false;
    for (var i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = void 0;
        if (i >= 0)
            path = pathSegments[i];
        else {
            if (globalThis.Deno == null) {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno.cwd();
        }
        (0, _util_ts_1.assertPath)(path);
        if (path.length === 0) {
            continue;
        }
        resolvedPath = "".concat(path, "/").concat(resolvedPath);
        resolvedAbsolute = path.charCodeAt(0) === _constants_ts_1.CHAR_FORWARD_SLASH;
    }
    resolvedPath = (0, _util_ts_1.normalizeString)(resolvedPath, !resolvedAbsolute, "/", _util_ts_1.isPosixPathSeparator);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0)
            return "/".concat(resolvedPath);
        else
            return "/";
    }
    else if (resolvedPath.length > 0)
        return resolvedPath;
    else
        return ".";
}
exports.resolve = resolve;
function normalize(path) {
    (0, _util_ts_1.assertPath)(path);
    if (path.length === 0)
        return ".";
    var isAbsolute = path.charCodeAt(0) === _constants_ts_1.CHAR_FORWARD_SLASH;
    var trailingSeparator = path.charCodeAt(path.length - 1) === _constants_ts_1.CHAR_FORWARD_SLASH;
    path = (0, _util_ts_1.normalizeString)(path, !isAbsolute, "/", _util_ts_1.isPosixPathSeparator);
    if (path.length === 0 && !isAbsolute)
        path = ".";
    if (path.length > 0 && trailingSeparator)
        path += "/";
    if (isAbsolute)
        return "/".concat(path);
    return path;
}
exports.normalize = normalize;
function isAbsolute(path) {
    (0, _util_ts_1.assertPath)(path);
    return path.length > 0 && path.charCodeAt(0) === _constants_ts_1.CHAR_FORWARD_SLASH;
}
exports.isAbsolute = isAbsolute;
function join() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    if (paths.length === 0)
        return ".";
    var joined;
    for (var i = 0, len = paths.length; i < len; ++i) {
        var path = paths[i];
        (0, _util_ts_1.assertPath)(path);
        if (path.length > 0) {
            if (!joined)
                joined = path;
            else
                joined += "/".concat(path);
        }
    }
    if (!joined)
        return ".";
    return normalize(joined);
}
exports.join = join;
function relative(from, to) {
    (0, _util_ts_1.assertPath)(from);
    (0, _util_ts_1.assertPath)(to);
    if (from === to)
        return "";
    from = resolve(from);
    to = resolve(to);
    if (from === to)
        return "";
    var fromStart = 1;
    var fromEnd = from.length;
    for (; fromStart < fromEnd; ++fromStart) {
        if (from.charCodeAt(fromStart) !== _constants_ts_1.CHAR_FORWARD_SLASH)
            break;
    }
    var fromLen = fromEnd - fromStart;
    var toStart = 1;
    var toEnd = to.length;
    for (; toStart < toEnd; ++toStart) {
        if (to.charCodeAt(toStart) !== _constants_ts_1.CHAR_FORWARD_SLASH)
            break;
    }
    var toLen = toEnd - toStart;
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === _constants_ts_1.CHAR_FORWARD_SLASH) {
                    return to.slice(toStart + i + 1);
                }
                else if (i === 0) {
                    return to.slice(toStart + i);
                }
            }
            else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === _constants_ts_1.CHAR_FORWARD_SLASH) {
                    lastCommonSep = i;
                }
                else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode)
            break;
        else if (fromCode === _constants_ts_1.CHAR_FORWARD_SLASH)
            lastCommonSep = i;
    }
    var out = "";
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === _constants_ts_1.CHAR_FORWARD_SLASH) {
            if (out.length === 0)
                out += "..";
            else
                out += "/..";
        }
    }
    if (out.length > 0)
        return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === _constants_ts_1.CHAR_FORWARD_SLASH)
            ++toStart;
        return to.slice(toStart);
    }
}
exports.relative = relative;
function toNamespacedPath(path) {
    return path;
}
exports.toNamespacedPath = toNamespacedPath;
function dirname(path) {
    (0, _util_ts_1.assertPath)(path);
    if (path.length === 0)
        return ".";
    var hasRoot = path.charCodeAt(0) === _constants_ts_1.CHAR_FORWARD_SLASH;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
        if (path.charCodeAt(i) === _constants_ts_1.CHAR_FORWARD_SLASH) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        }
        else {
            matchedSlash = false;
        }
    }
    if (end === -1)
        return hasRoot ? "/" : ".";
    if (hasRoot && end === 1)
        return "//";
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
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path)
            return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === _constants_ts_1.CHAR_FORWARD_SLASH) {
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
        for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === _constants_ts_1.CHAR_FORWARD_SLASH) {
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
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === _constants_ts_1.CHAR_FORWARD_SLASH) {
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
    return (0, _util_ts_1._format)("/", pathObject);
}
exports.format = format;
function parse(path) {
    (0, _util_ts_1.assertPath)(path);
    var ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path.length === 0)
        return ret;
    var isAbsolute = path.charCodeAt(0) === _constants_ts_1.CHAR_FORWARD_SLASH;
    var start;
    if (isAbsolute) {
        ret.root = "/";
        start = 1;
    }
    else {
        start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;
    var preDotState = 0;
    for (; i >= start; --i) {
        var code = path.charCodeAt(i);
        if (code === _constants_ts_1.CHAR_FORWARD_SLASH) {
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
            if (startPart === 0 && isAbsolute) {
                ret.base = ret.name = path.slice(1, end);
            }
            else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
    }
    else {
        if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
        }
        else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0)
        ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute)
        ret.dir = "/";
    return ret;
}
exports.parse = parse;
function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
exports.fromFileUrl = fromFileUrl;
