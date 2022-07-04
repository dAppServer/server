"use strict";
exports.__esModule = true;
exports.required = void 0;
var utils_ts_1 = require("../utils.ts");
function required(value) {
    return (0, utils_ts_1.isOptionalValue)(value)
        ? (0, utils_ts_1.invalid)("required", { value: value }, true)
        : undefined;
}
exports.required = required;
