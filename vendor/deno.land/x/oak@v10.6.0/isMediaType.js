"use strict";
/*!
 * Adapted directly from type-is at https://github.com/jshttp/type-is/
 * which is licensed as follows:
 *
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
exports.__esModule = true;
exports.isMediaType = void 0;
var deps_ts_1 = require("./deps.ts");
var mediaTyper_ts_1 = require("./mediaTyper.ts");
function mimeMatch(expected, actual) {
    if (expected === undefined) {
        return false;
    }
    var actualParts = actual.split("/");
    var expectedParts = expected.split("/");
    if (actualParts.length !== 2 || expectedParts.length !== 2) {
        return false;
    }
    var actualType = actualParts[0], actualSubtype = actualParts[1];
    var expectedType = expectedParts[0], expectedSubtype = expectedParts[1];
    if (expectedType !== "*" && expectedType !== actualType) {
        return false;
    }
    if (expectedSubtype.substr(0, 2) === "*+") {
        return (expectedSubtype.length <= actualSubtype.length + 1 &&
            expectedSubtype.substr(1) ===
                actualSubtype.substr(1 - expectedSubtype.length));
    }
    if (expectedSubtype !== "*" && expectedSubtype !== actualSubtype) {
        return false;
    }
    return true;
}
function normalize(type) {
    if (type === "urlencoded") {
        return "application/x-www-form-urlencoded";
    }
    else if (type === "multipart") {
        return "multipart/*";
    }
    else if (type[0] === "+") {
        return "*/*".concat(type);
    }
    return type.includes("/") ? type : (0, deps_ts_1.lookup)(type);
}
function normalizeType(value) {
    try {
        var val = value.split(";");
        var type = (0, mediaTyper_ts_1.parse)(val[0]);
        return (0, mediaTyper_ts_1.format)(type);
    }
    catch (_a) {
        return;
    }
}
function isMediaType(value, types) {
    var val = normalizeType(value);
    if (!val) {
        return false;
    }
    if (!types.length) {
        return val;
    }
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var type = types_1[_i];
        if (mimeMatch(normalize(type), val)) {
            return type[0] === "+" || type.includes("*") ? val : type;
        }
    }
    return false;
}
exports.isMediaType = isMediaType;
