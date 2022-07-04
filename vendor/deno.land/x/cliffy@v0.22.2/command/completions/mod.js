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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CompletionsCommand_cmd;
exports.__esModule = true;
exports.CompletionsCommand = void 0;
var command_ts_1 = require("../command.ts");
var deps_ts_1 = require("../deps.ts");
var bash_ts_1 = require("./bash.ts");
var complete_ts_1 = require("./complete.ts");
var fish_ts_1 = require("./fish.ts");
var zsh_ts_1 = require("./zsh.ts");
var CompletionsCommand = (function (_super) {
    __extends(CompletionsCommand, _super);
    function CompletionsCommand(cmd) {
        var _this = _super.call(this) || this;
        _CompletionsCommand_cmd.set(_this, void 0);
        __classPrivateFieldSet(_this, _CompletionsCommand_cmd, cmd, "f");
        _this.description(function () {
            var baseCmd = __classPrivateFieldGet(_this, _CompletionsCommand_cmd, "f") || _this.getMainCommand();
            return "Generate shell completions.\n\nTo enable shell completions for this program add the following line to your ".concat((0, deps_ts_1.dim)((0, deps_ts_1.italic)("~/.bashrc")), " or similar:\n\n    ").concat((0, deps_ts_1.dim)((0, deps_ts_1.italic)("source <(".concat(baseCmd.getPath(), " completions [shell])"))), "\n\n    For more information run ").concat((0, deps_ts_1.dim)((0, deps_ts_1.italic)("".concat(baseCmd.getPath(), " completions [shell] --help"))), "\n");
        })
            .action(function () { return _this.showHelp(); })
            .command("bash", new bash_ts_1.BashCompletionsCommand(__classPrivateFieldGet(_this, _CompletionsCommand_cmd, "f")))
            .command("fish", new fish_ts_1.FishCompletionsCommand(__classPrivateFieldGet(_this, _CompletionsCommand_cmd, "f")))
            .command("zsh", new zsh_ts_1.ZshCompletionsCommand(__classPrivateFieldGet(_this, _CompletionsCommand_cmd, "f")))
            .command("complete", new complete_ts_1.CompleteCommand(__classPrivateFieldGet(_this, _CompletionsCommand_cmd, "f")).hidden())
            .reset();
        return _this;
    }
    return CompletionsCommand;
}(command_ts_1.Command));
exports.CompletionsCommand = CompletionsCommand;
_CompletionsCommand_cmd = new WeakMap();
