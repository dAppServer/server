"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.assert = exports.DenoStdInternalError = void 0;
var DenoStdInternalError = (function (_super) {
    __extends(DenoStdInternalError, _super);
    function DenoStdInternalError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "DenoStdInternalError";
        return _this;
    }
    return DenoStdInternalError;
}(Error));
exports.DenoStdInternalError = DenoStdInternalError;
function assert(expr, msg) {
    if (msg === void 0) { msg = ""; }
    if (!expr) {
        throw new DenoStdInternalError(msg);
    }
}
exports.assert = assert;
