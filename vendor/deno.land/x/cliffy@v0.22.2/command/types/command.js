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
exports.CommandType = void 0;
var string_ts_1 = require("./string.ts");
var CommandType = (function (_super) {
    __extends(CommandType, _super);
    function CommandType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandType.prototype.complete = function (_cmd, parent) {
        return (parent === null || parent === void 0 ? void 0 : parent.getCommands(false).map(function (cmd) { return cmd.getName(); })) || [];
    };
    return CommandType;
}(string_ts_1.StringType));
exports.CommandType = CommandType;
