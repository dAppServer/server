"use strict";
exports.__esModule = true;
exports.requiredIf = void 0;
var required_ts_1 = require("./required.ts");
function requiredIf(field, fieldValue) {
    return function requiredIfRule(value, _a) {
        var getValue = _a.getValue;
        var val = getValue(field);
        if (val === fieldValue) {
            return (0, required_ts_1.required)(value);
        }
    };
}
exports.requiredIf = requiredIf;
