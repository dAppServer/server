"use strict";
exports.__esModule = true;
exports.hasOwnProperty = void 0;
function hasOwnProperty(obj, v) {
    if (obj == null) {
        return false;
    }
    return Object.prototype.hasOwnProperty.call(obj, v);
}
exports.hasOwnProperty = hasOwnProperty;
