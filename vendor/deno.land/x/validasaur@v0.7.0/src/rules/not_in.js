"use strict";
exports.__esModule = true;
exports.notIn = void 0;
var utils_ts_1 = require("../utils.ts");
function notIn(disallowedValues) {
    return function notInRule(value) {
        return disallowedValues.indexOf(value) > -1
            ? (0, utils_ts_1.invalid)("notIn", { value: value, disallowedValues: disallowedValues })
            : undefined;
    };
}
exports.notIn = notIn;
