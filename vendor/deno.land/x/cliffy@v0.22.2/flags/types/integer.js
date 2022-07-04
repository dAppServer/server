"use strict";
exports.__esModule = true;
exports.integer = void 0;
var _errors_ts_1 = require("../_errors.ts");
var integer = function (type) {
    var value = Number(type.value);
    if (Number.isInteger(value)) {
        return value;
    }
    throw new _errors_ts_1.InvalidTypeError(type);
};
exports.integer = integer;
