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
exports.preferredMediaTypes = void 0;
var common_ts_1 = require("./common.ts");
var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function quoteCount(str) {
    var count = 0;
    var index = 0;
    while ((index = str.indexOf("\"", index)) !== -1) {
        count++;
        index++;
    }
    return count;
}
function splitMediaTypes(accept) {
    var accepts = accept.split(",");
    var j = 0;
    for (var i = 1; i < accepts.length; i++) {
        if (quoteCount(accepts[j]) % 2 === 0) {
            accepts[++j] = accepts[i];
        }
        else {
            accepts[j] += ",".concat(accepts[i]);
        }
    }
    accepts.length = j + 1;
    return accepts;
}
function splitParameters(str) {
    var parameters = str.split(";");
    var j = 0;
    for (var i = 1; i < parameters.length; i++) {
        if (quoteCount(parameters[j]) % 2 === 0) {
            parameters[++j] = parameters[i];
        }
        else {
            parameters[j] += ";".concat(parameters[i]);
        }
    }
    parameters.length = j + 1;
    return parameters.map(function (p) { return p.trim(); });
}
function splitKeyValuePair(str) {
    var _a = str.split("="), key = _a[0], value = _a[1];
    return [key.toLowerCase(), value];
}
function parseMediaType(str, i) {
    var match = simpleMediaTypeRegExp.exec(str);
    if (!match) {
        return;
    }
    var params = Object.create(null);
    var q = 1;
    var type = match[1], subtype = match[2], parameters = match[3];
    if (parameters) {
        var kvps = splitParameters(parameters).map(splitKeyValuePair);
        for (var _i = 0, kvps_1 = kvps; _i < kvps_1.length; _i++) {
            var _a = kvps_1[_i], key = _a[0], val = _a[1];
            var value = val && val[0] === "\"" && val[val.length - 1] === "\""
                ? val.substr(1, val.length - 2)
                : val;
            if (key === "q" && value) {
                q = parseFloat(value);
                break;
            }
            params[key] = value;
        }
    }
    return { type: type, subtype: subtype, params: params, q: q, i: i };
}
function parseAccept(accept) {
    var accepts = splitMediaTypes(accept);
    var mediaTypes = [];
    for (var i = 0; i < accepts.length; i++) {
        var mediaType = parseMediaType(accepts[i].trim(), i);
        if (mediaType) {
            mediaTypes.push(mediaType);
        }
    }
    return mediaTypes;
}
function getFullType(spec) {
    return "".concat(spec.type, "/").concat(spec.subtype);
}
function specify(type, spec, index) {
    var p = parseMediaType(type, index);
    if (!p) {
        return;
    }
    var s = 0;
    if (spec.type.toLowerCase() === p.type.toLowerCase()) {
        s |= 4;
    }
    else if (spec.type !== "*") {
        return;
    }
    if (spec.subtype.toLowerCase() === p.subtype.toLowerCase()) {
        s |= 2;
    }
    else if (spec.subtype !== "*") {
        return;
    }
    var keys = Object.keys(spec.params);
    if (keys.length) {
        if (keys.every(function (key) {
            return (spec.params[key] || "").toLowerCase() ===
                (p.params[key] || "").toLowerCase();
        })) {
            s |= 1;
        }
        else {
            return;
        }
    }
    return {
        i: index,
        o: spec.o,
        q: spec.q,
        s: s
    };
}
function getMediaTypePriority(type, accepted, index) {
    var priority = { o: -1, q: 0, s: 0, i: index };
    for (var _i = 0, accepted_1 = accepted; _i < accepted_1.length; _i++) {
        var accepts = accepted_1[_i];
        var spec = specify(type, accepts, index);
        if (spec &&
            ((priority.s || 0) - (spec.s || 0) ||
                (priority.q || 0) - (spec.q || 0) ||
                (priority.o || 0) - (spec.o || 0)) < 0) {
            priority = spec;
        }
    }
    return priority;
}
function preferredMediaTypes(accept, provided) {
    var accepts = parseAccept(accept === undefined ? "*/*" : accept || "");
    if (!provided) {
        return accepts
            .filter(common_ts_1.isQuality)
            .sort(common_ts_1.compareSpecs)
            .map(getFullType);
    }
    var priorities = provided.map(function (type, index) {
        return getMediaTypePriority(type, accepts, index);
    });
    return priorities
        .filter(common_ts_1.isQuality)
        .sort(common_ts_1.compareSpecs)
        .map(function (priority) { return provided[priorities.indexOf(priority)]; });
}
exports.preferredMediaTypes = preferredMediaTypes;
