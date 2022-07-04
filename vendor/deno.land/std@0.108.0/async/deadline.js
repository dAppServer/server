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
exports.deadline = exports.DeadlineError = void 0;
var deferred_ts_1 = require("./deferred.ts");
var DeadlineError = (function (_super) {
    __extends(DeadlineError, _super);
    function DeadlineError() {
        var _this = _super.call(this, "Deadline") || this;
        _this.name = "DeadlineError";
        return _this;
    }
    return DeadlineError;
}(Error));
exports.DeadlineError = DeadlineError;
function deadline(p, delay) {
    var d = (0, deferred_ts_1.deferred)();
    var t = setTimeout(function () { return d.reject(new DeadlineError()); }, delay);
    return Promise.race([p, d])["finally"](function () { return clearTimeout(t); });
}
exports.deadline = deadline;
