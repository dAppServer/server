"use strict";
exports.__esModule = true;
exports.getFilename = void 0;
var headers_ts_1 = require("./headers.ts");
var needsEncodingFixup = false;
function fixupEncoding(value) {
    if (needsEncodingFixup && /[\x80-\xff]/.test(value)) {
        value = textDecode("utf-8", value);
        if (needsEncodingFixup) {
            value = textDecode("iso-8859-1", value);
        }
    }
    return value;
}
var FILENAME_STAR_REGEX = (0, headers_ts_1.toParamRegExp)("filename\\*", "i");
var FILENAME_START_ITER_REGEX = (0, headers_ts_1.toParamRegExp)("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
var FILENAME_REGEX = (0, headers_ts_1.toParamRegExp)("filename", "i");
function rfc2047decode(value) {
    if (!value.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(value)) {
        return value;
    }
    return value.replace(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function (_, charset, encoding, text) {
        if (encoding === "q" || encoding === "Q") {
            text = text.replace(/_/g, " ");
            text = text.replace(/=([0-9a-fA-F]{2})/g, function (_, hex) { return String.fromCharCode(parseInt(hex, 16)); });
            return textDecode(charset, text);
        }
        try {
            text = atob(text);
        }
        catch (_a) { }
        return textDecode(charset, text);
    });
}
function rfc2231getParam(header) {
    var matches = [];
    var match;
    while ((match = FILENAME_START_ITER_REGEX.exec(header))) {
        var ns = match[1], quote = match[2], part = match[3];
        var n = parseInt(ns, 10);
        if (n in matches) {
            if (n === 0) {
                break;
            }
            continue;
        }
        matches[n] = [quote, part];
    }
    var parts = [];
    for (var n = 0; n < matches.length; ++n) {
        if (!(n in matches)) {
            break;
        }
        var _a = matches[n], quote = _a[0], part = _a[1];
        part = (0, headers_ts_1.unquote)(part);
        if (quote) {
            part = unescape(part);
            if (n === 0) {
                part = rfc5987decode(part);
            }
        }
        parts.push(part);
    }
    return parts.join("");
}
function rfc5987decode(value) {
    var encodingEnd = value.indexOf("'");
    if (encodingEnd === -1) {
        return value;
    }
    var encoding = value.slice(0, encodingEnd);
    var langValue = value.slice(encodingEnd + 1);
    return textDecode(encoding, langValue.replace(/^[^']*'/, ""));
}
function textDecode(encoding, value) {
    if (encoding) {
        try {
            var decoder = new TextDecoder(encoding, { fatal: true });
            var bytes = Array.from(value, function (c) { return c.charCodeAt(0); });
            if (bytes.every(function (code) { return code <= 0xFF; })) {
                value = decoder.decode(new Uint8Array(bytes));
                needsEncodingFixup = false;
            }
        }
        catch (_a) { }
    }
    return value;
}
function getFilename(header) {
    needsEncodingFixup = true;
    var matches = FILENAME_STAR_REGEX.exec(header);
    if (matches) {
        var filename_1 = matches[1];
        return fixupEncoding(rfc2047decode(rfc5987decode(unescape((0, headers_ts_1.unquote)(filename_1)))));
    }
    var filename = rfc2231getParam(header);
    if (filename) {
        return fixupEncoding(rfc2047decode(filename));
    }
    matches = FILENAME_REGEX.exec(header);
    if (matches) {
        var filename_2 = matches[1];
        return fixupEncoding(rfc2047decode((0, headers_ts_1.unquote)(filename_2)));
    }
    return "";
}
exports.getFilename = getFilename;
