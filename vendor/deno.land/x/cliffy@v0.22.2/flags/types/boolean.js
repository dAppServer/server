"use strict";
exports.__esModule = true;
exports.boolean = void 0;
var _errors_ts_1 = require("../_errors.ts");
var boolean = function (type) {
    if (~["1", "true"].indexOf(type.value)) {
        return true;
    }
    if (~["0", "false"].indexOf(type.value)) {
        return false;
    }
    throw new _errors_ts_1.InvalidTypeError(type);
};
exports.boolean = boolean;
