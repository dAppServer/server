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
exports.preferredEncodings = void 0;
var common_ts_1 = require("./common.ts");
var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function parseEncoding(str, i) {
    var match = simpleEncodingRegExp.exec(str);
    if (!match) {
        return undefined;
    }
    var encoding = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(";");
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            var p = param.trim().split("=");
            if (p[0] === "q") {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return { encoding: encoding, q: q, i: i };
}
function specify(encoding, spec, i) {
    if (i === void 0) { i = -1; }
    if (!spec.encoding) {
        return;
    }
    var s = 0;
    if (spec.encoding.toLocaleLowerCase() === encoding.toLocaleLowerCase()) {
        s = 1;
    }
    else if (spec.encoding !== "*") {
        return;
    }
    return {
        i: i,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
function parseAcceptEncoding(accept) {
    var accepts = accept.split(",");
    var parsedAccepts = [];
    var hasIdentity = false;
    var minQuality = 1;
    for (var i = 0; i < accepts.length; i++) {
        var encoding = parseEncoding(accepts[i].trim(), i);
        if (encoding) {
            parsedAccepts.push(encoding);
            hasIdentity = hasIdentity || !!specify("identity", encoding);
            minQuality = Math.min(minQuality, encoding.q || 1);
        }
    }
    if (!hasIdentity) {
        parsedAccepts.push({
            encoding: "identity",
            q: minQuality,
            i: accepts.length - 1
        });
    }
    return parsedAccepts;
}
function getEncodingPriority(encoding, accepted, index) {
    var priority = { o: -1, q: 0, s: 0, i: 0 };
    for (var _i = 0, accepted_1 = accepted; _i < accepted_1.length; _i++) {
        var s = accepted_1[_i];
        var spec = specify(encoding, s, index);
        if (spec &&
            (priority.s - spec.s || priority.q - spec.q ||
                priority.o - spec.o) <
                0) {
            priority = spec;
        }
    }
    return priority;
}
function preferredEncodings(accept, provided) {
    var accepts = parseAcceptEncoding(accept);
    if (!provided) {
        return accepts
            .filter(common_ts_1.isQuality)
            .sort(common_ts_1.compareSpecs)
            .map(function (spec) { return spec.encoding; });
    }
    var priorities = provided.map(function (type, index) {
        return getEncodingPriority(type, accepts, index);
    });
    return priorities
        .filter(common_ts_1.isQuality)
        .sort(common_ts_1.compareSpecs)
        .map(function (priority) { return provided[priorities.indexOf(priority)]; });
}
exports.preferredEncodings = preferredEncodings;
