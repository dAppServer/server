"use strict";
/*!
 * Ported from: https://github.com/jshttp/mime-types and licensed as:
 *
 * (The MIT License)
 *
 * Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 * Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 * Copyright (c) 2020 the Deno authors
 * Copyright (c) 2020-2022 the oak authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
exports.__esModule = true;
exports.extension = exports.contentType = exports.lookup = exports.charset = exports.types = exports.extensions = void 0;
var mod_ts_1 = require("https://deno.land/std@0.140.0/path/mod.ts");
var db_json_1 = require("https://raw.githubusercontent.com/jshttp/mime-db/v1.52.0/db.json");
var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
var TEXT_TYPE_REGEXP = /^text\//i;
exports.extensions = new Map();
exports.types = new Map();
function populateMaps(extensions, types) {
    var preference = ["nginx", "apache", undefined, "iana"];
    for (var _i = 0, _a = Object.keys(db_json_1["default"]); _i < _a.length; _i++) {
        var type = _a[_i];
        var mime = db_json_1["default"][type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
            continue;
        }
        extensions.set(type, exts);
        for (var _b = 0, exts_1 = exts; _b < exts_1.length; _b++) {
            var ext = exts_1[_b];
            var current = types.get(ext);
            if (current) {
                var from = preference.indexOf(db_json_1["default"][current].source);
                var to = preference.indexOf(mime.source);
                if (current !== "application/octet-stream" &&
                    (from > to ||
                        (from === to && current.startsWith("application/")))) {
                    continue;
                }
            }
            types.set(ext, type);
        }
    }
}
populateMaps(exports.extensions, exports.types);
function charset(type) {
    var m = EXTRACT_TYPE_REGEXP.exec(type);
    if (!m) {
        return undefined;
    }
    var match = m[0];
    var mime = db_json_1["default"][match.toLowerCase()];
    if (mime && mime.charset) {
        return mime.charset;
    }
    if (TEXT_TYPE_REGEXP.test(match)) {
        return "UTF-8";
    }
    return undefined;
}
exports.charset = charset;
function lookup(path) {
    var extension = (0, mod_ts_1.extname)("x.".concat(path))
        .toLowerCase()
        .substring(1);
    return exports.types.get(extension);
}
exports.lookup = lookup;
function contentType(str) {
    var mime = str.includes("/") ? str : lookup(str);
    if (!mime) {
        return undefined;
    }
    if (!mime.includes("charset")) {
        var cs = charset(mime);
        if (cs) {
            mime += "; charset=".concat(cs.toLowerCase());
        }
    }
    return mime;
}
exports.contentType = contentType;
function extension(type) {
    var match = EXTRACT_TYPE_REGEXP.exec(type);
    if (!match) {
        return undefined;
    }
    var exts = exports.extensions.get(match[1].toLowerCase());
    if (!exts || !exts.length) {
        return undefined;
    }
    return exts[0];
}
exports.extension = extension;
