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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.HelpCommand = void 0;
var command_ts_1 = require("../command.ts");
var _errors_ts_1 = require("../_errors.ts");
var command_ts_2 = require("../types/command.ts");
var HelpCommand = (function (_super) {
    __extends(HelpCommand, _super);
    function HelpCommand(cmd) {
        var _this = _super.call(this) || this;
        _this.type("command", new command_ts_2.CommandType())
            .arguments("[command:command]")
            .description("Show this help or the help of a sub-command.")
            .action(function (_, name) {
            var _a, _b;
            if (!cmd) {
                cmd = name
                    ? (_a = _this.getGlobalParent()) === null || _a === void 0 ? void 0 : _a.getBaseCommand(name)
                    : _this.getGlobalParent();
            }
            if (!cmd) {
                var cmds = (_b = _this.getGlobalParent()) === null || _b === void 0 ? void 0 : _b.getCommands();
                throw new _errors_ts_1.UnknownCommand(name !== null && name !== void 0 ? name : "", cmds !== null && cmds !== void 0 ? cmds : [], __spreadArray([
                    _this.getName()
                ], _this.getAliases(), true));
            }
            cmd.showHelp();
            Deno.exit(0);
        });
        return _this;
    }
    return HelpCommand;
}(command_ts_1.Command));
exports.HelpCommand = HelpCommand;
