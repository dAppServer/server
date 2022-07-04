"use strict";
/*!
 * Based on https://github.com/jshttp/vary/blob/master/index.js
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * Copyright(c) 2020 Henry Zhuang
 * MIT Licensed
 */
exports.__esModule = true;
exports.vary = exports.append = void 0;
var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function append(header, field) {
    if (header === "*") {
        return header;
    }
    var fields = !Array.isArray(field) ? parse(String(field)) : field;
    for (var j = 0; j < fields.length; j++) {
        if (!FIELD_NAME_REGEXP.test(fields[j])) {
            throw new TypeError("field argument contains an invalid header name `".concat(fields[j], "`"));
        }
    }
    var val = header;
    var vals = parse(header.toLowerCase());
    if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
        return "*";
    }
    for (var i = 0; i < fields.length; i++) {
        var fld = fields[i].toLowerCase();
        if (vals.indexOf(fld) === -1) {
            vals.push(fld);
            val = val ? val + ", " + fields[i] : fields[i];
        }
    }
    return val;
}
exports.append = append;
function parse(header) {
    var end = 0;
    var list = [];
    var start = 0;
    for (var i = 0, len = header.length; i < len; i++) {
        switch (header.charCodeAt(i)) {
            case 0x20:
                if (start === end) {
                    start = end = i + 1;
                }
                break;
            case 0x2c:
                list.push(header.substring(start, end));
                start = end = i + 1;
                break;
            default:
                end = i + 1;
                break;
        }
    }
    list.push(header.substring(start, end));
    return list;
}
function vary(header, field) {
    var val = header.get("vary") || "";
    if ((val = append(val, field))) {
        header.set("vary", val);
    }
}
exports.vary = vary;
