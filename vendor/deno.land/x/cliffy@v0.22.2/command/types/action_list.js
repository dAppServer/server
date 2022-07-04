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
exports.ActionListType = void 0;
var string_ts_1 = require("./string.ts");
var ActionListType = (function (_super) {
    __extends(ActionListType, _super);
    function ActionListType(cmd) {
        var _this = _super.call(this) || this;
        _this.cmd = cmd;
        return _this;
    }
    ActionListType.prototype.complete = function () {
        return this.cmd.getCompletions()
            .map(function (type) { return type.name; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
    return ActionListType;
}(string_ts_1.StringType));
exports.ActionListType = ActionListType;
