"use strict";
exports.__esModule = true;
exports.notNull = void 0;
var utils_ts_1 = require("../utils.ts");
function notNull(value) {
    return (value === null) ? (0, utils_ts_1.invalid)("notNull", { value: value }, true) : undefined;
}
exports.notNull = notNull;
