"use strict";
/*!
 * Adapted directly from negotiator at https://github.com/jshttp/negotiator/
 * which is licensed as follows:
 *
 * (The MIT License)
 *
 * Copyright (c) 2012-2014 Federico Romero
 * Copyright (c) 2012-2014 Isaac Z. Schlueter
 * Copyright (c) 2014-2015 Douglas Christopher Wilson
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
exports.preferredCharsets = void 0;
var common_ts_1 = require("./common.ts");
var SIMPLE_CHARSET_REGEXP = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function parseCharset(str, i) {
    var match = SIMPLE_CHARSET_REGEXP.exec(str);
    if (!match) {
        return;
    }
    var charset = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(";");
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            var _a = param.trim().split("="), key = _a[0], value = _a[1];
            if (key === "q") {
                q = parseFloat(value);
                break;
            }
        }
    }
    return { charset: charset, q: q, i: i };
}
function parseAcceptCharset(accept) {
    var accepts = accept.split(",");
    var result = [];
    for (var i = 0; i < accepts.length; i++) {
        var charset = parseCharset(accepts[i].trim(), i);
        if (charset) {
            result.push(charset);
        }
    }
    return result;
}
function specify(charset, spec, i) {
    var s = 0;
    if (spec.charset.toLowerCase() === charset.toLocaleLowerCase()) {
        s |= 1;
    }
    else if (spec.charset !== "*") {
        return;
    }
    return { i: i, o: spec.i, q: spec.q, s: s };
}
function getCharsetPriority(charset, accepted, index) {
    var _a, _b, _c, _d;
    var priority = { i: -1, o: -1, q: 0, s: 0 };
    for (var _i = 0, accepted_1 = accepted; _i < accepted_1.length; _i++) {
        var accepts = accepted_1[_i];
        var spec = specify(charset, accepts, index);
        if (spec &&
            (((_a = priority.s) !== null && _a !== void 0 ? _a : 0) - ((_b = spec.s) !== null && _b !== void 0 ? _b : 0) || priority.q - spec.q ||
                ((_c = priority.o) !== null && _c !== void 0 ? _c : 0) - ((_d = spec.o) !== null && _d !== void 0 ? _d : 0)) < 0) {
            priority = spec;
        }
    }
    return priority;
}
function preferredCharsets(accept, provided) {
    if (accept === void 0) { accept = "*"; }
    var accepts = parseAcceptCharset(accept);
    if (!provided) {
        return accepts
            .filter(common_ts_1.isQuality)
            .sort(common_ts_1.compareSpecs)
            .map(function (spec) { return spec.charset; });
    }
    var priorities = provided
        .map(function (type, index) { return getCharsetPriority(type, accepts, index); });
    return priorities
        .filter(common_ts_1.isQuality)
        .sort(common_ts_1.compareSpecs)
        .map(function (priority) { return provided[priorities.indexOf(priority)]; });
}
exports.preferredCharsets = preferredCharsets;
