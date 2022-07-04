"use strict";
exports.__esModule = true;
exports.isIn = void 0;
var utils_ts_1 = require("../utils.ts");
function isIn(allowedValues) {
    return function isInRule(value) {
        if (allowedValues.indexOf(value) < 0) {
            return (0, utils_ts_1.invalid)("isIn", { value: value, allowedValues: allowedValues });
        }
    };
}
exports.isIn = isIn;
