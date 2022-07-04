"use strict";
exports.__esModule = true;
exports.nullable = void 0;
var utils_ts_1 = require("../utils.ts");
function nullable(value) {
    if (typeof value === "undefined") {
        return (0, utils_ts_1.invalid)("nullable", { value: value }, true);
    }
}
exports.nullable = nullable;
