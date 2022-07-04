"use strict";
exports.__esModule = true;
exports.number = void 0;
var _errors_ts_1 = require("../_errors.ts");
var number = function (type) {
    var value = Number(type.value);
    if (Number.isFinite(value)) {
        return value;
    }
    throw new _errors_ts_1.InvalidTypeError(type);
};
exports.number = number;
