"use strict";
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
exports.ZshCompletionsGenerator = void 0;
var ZshCompletionsGenerator = (function () {
    function ZshCompletionsGenerator(cmd) {
        this.cmd = cmd;
        this.actions = new Map();
    }
    ZshCompletionsGenerator.generate = function (cmd) {
        return new ZshCompletionsGenerator(cmd).generate();
    };
    ZshCompletionsGenerator.prototype.generate = function () {
        var path = this.cmd.getPath();
        var name = this.cmd.getName();
        var version = this.cmd.getVersion()
            ? " v".concat(this.cmd.getVersion())
            : "";
        return "#!/usr/bin/env zsh\n# zsh completion support for ".concat(path).concat(version, "\n\nautoload -U is-at-least\n\n# shellcheck disable=SC2154\n(( $+functions[__").concat(replaceSpecialChars(name), "_complete] )) ||\nfunction __").concat(replaceSpecialChars(name), "_complete {\n  local name=\"$1\"; shift\n  local action=\"$1\"; shift\n  integer ret=1\n  local -a values\n  local expl lines\n  _tags \"$name\"\n  while _tags; do\n    if _requested \"$name\"; then\n      # shellcheck disable=SC2034\n      lines=\"$(").concat(name, " completions complete \"${action}\" \"${@}\")\"\n      values=(\"${(ps:\\n:)lines}\")\n      if (( ${#values[@]} )); then\n        while _next_label \"$name\" expl \"$action\"; do\n          compadd -S '' \"${expl[@]}\" \"${values[@]}\"\n        done\n      fi\n    fi\n  done\n}\n\n").concat(this.generateCompletions(this.cmd).trim(), "\n\n# _").concat(replaceSpecialChars(path), " \"${@}\"\n\ncompdef _").concat(replaceSpecialChars(path), " ").concat(path);
    };
    ZshCompletionsGenerator.prototype.generateCompletions = function (command, path) {
        var _this = this;
        if (path === void 0) { path = ""; }
        if (!command.hasCommands(false) && !command.hasOptions(false) &&
            !command.hasArguments()) {
            return "";
        }
        path = (path ? path + " " : "") + command.getName();
        return "# shellcheck disable=SC2154\n(( $+functions[_".concat(replaceSpecialChars(path), "] )) ||\nfunction _").concat(replaceSpecialChars(path), "() {") +
            (!command.getParent()
                ? "\n  local state"
                : "") +
            this.generateCommandCompletions(command, path) +
            this.generateSubCommandCompletions(command, path) +
            this.generateArgumentCompletions(command, path) +
            this.generateActions(command) +
            "\n}\n\n" +
            command.getCommands(false)
                .filter(function (subCommand) { return subCommand !== command; })
                .map(function (subCommand) {
                return _this.generateCompletions(subCommand, path);
            })
                .join("");
    };
    ZshCompletionsGenerator.prototype.generateCommandCompletions = function (command, path) {
        var commands = command.getCommands(false);
        var completions = commands
            .map(function (subCommand) {
            return "'".concat(subCommand.getName(), ":").concat(subCommand.getShortDescription(), "'");
        })
            .join("\n      ");
        if (completions) {
            completions = "\n    local -a commands\n    # shellcheck disable=SC2034\n    commands=(\n      ".concat(completions, "\n    )\n    _describe 'command' commands");
        }
        if (command.hasArguments()) {
            var completionsPath = path.split(" ").slice(1).join(" ");
            var arg = command.getArguments()[0];
            var action = this.addAction(arg, completionsPath);
            if (action && command.getCompletion(arg.action)) {
                completions += "\n    __".concat(replaceSpecialChars(this.cmd.getName()), "_complete ").concat(action.arg.name, " ").concat(action.arg.action, " ").concat(action.cmd);
            }
        }
        if (completions) {
            completions = "\n\n  function _commands() {".concat(completions, "\n  }");
        }
        return completions;
    };
    ZshCompletionsGenerator.prototype.generateSubCommandCompletions = function (command, path) {
        if (command.hasCommands(false)) {
            var actions = command
                .getCommands(false)
                .map(function (command) {
                return "".concat(command.getName(), ") _").concat(replaceSpecialChars(path + " " + command.getName()), " ;;");
            })
                .join("\n      ");
            return "\n\n  function _command_args() {\n    case \"${words[1]}\" in\n      ".concat(actions, "\n    esac\n  }");
        }
        return "";
    };
    ZshCompletionsGenerator.prototype.generateArgumentCompletions = function (command, path) {
        this.actions.clear();
        var options = this.generateOptions(command, path);
        var argIndex = 0;
        var argsCommand = "\n\n  _arguments -w -s -S -C";
        if (command.hasOptions()) {
            argsCommand += " \\\n    ".concat(options.join(" \\\n    "));
        }
        if (command.hasCommands(false) || (command.getArguments()
            .filter(function (arg) { return command.getCompletion(arg.action); }).length)) {
            argsCommand += " \\\n    '".concat(++argIndex, ": :_commands'");
        }
        if (command.hasArguments() || command.hasCommands(false)) {
            var args = [];
            for (var _i = 0, _a = command.getArguments().slice(1); _i < _a.length; _i++) {
                var arg = _a[_i];
                var completionsPath = path.split(" ").slice(1).join(" ");
                var action = this.addAction(arg, completionsPath);
                args.push("".concat(++argIndex).concat(arg.optionalValue ? "::" : ":").concat(action.name));
            }
            argsCommand += args.map(function (arg) { return "\\\n    '".concat(arg, "'"); }).join("");
            if (command.hasCommands(false)) {
                argsCommand += " \\\n    '*:: :->command_args'";
            }
        }
        return argsCommand;
    };
    ZshCompletionsGenerator.prototype.generateOptions = function (command, path) {
        var options = [];
        var cmdArgs = path.split(" ");
        var _baseName = cmdArgs.shift();
        var completionsPath = cmdArgs.join(" ");
        var excludedFlags = command.getOptions(false)
            .map(function (option) { return option.standalone ? option.flags : false; })
            .flat()
            .filter(function (flag) { return typeof flag === "string"; });
        for (var _i = 0, _a = command.getOptions(false); _i < _a.length; _i++) {
            var option = _a[_i];
            options.push(this.generateOption(option, completionsPath, excludedFlags));
        }
        return options;
    };
    ZshCompletionsGenerator.prototype.generateOption = function (option, completionsPath, excludedOptions) {
        var _a;
        var flags = option.flags;
        var excludedFlags = ((_a = option.conflicts) === null || _a === void 0 ? void 0 : _a.length)
            ? __spreadArray(__spreadArray([], excludedOptions, true), option.conflicts.map(function (opt) { return "--" + opt.replace(/^--/, ""); }), true) : excludedOptions;
        excludedFlags = option.collect ? excludedFlags : __spreadArray(__spreadArray([], excludedFlags, true), flags, true);
        var args = "";
        for (var _i = 0, _b = option.args; _i < _b.length; _i++) {
            var arg = _b[_i];
            var action = this.addAction(arg, completionsPath);
            if (arg.variadic) {
                args += "".concat(arg.optionalValue ? "::" : ":").concat(arg.name, ":->").concat(action.name);
            }
            else {
                args += "".concat(arg.optionalValue ? "::" : ":").concat(arg.name, ":->").concat(action.name);
            }
        }
        var description = option.description
            .trim()
            .split("\n")
            .shift();
        description = description
            .replace(/\[/g, "\\[")
            .replace(/]/g, "\\]")
            .replace(/"/g, '\\"')
            .replace(/'/g, "'\"'\"'");
        var collect = option.collect ? "*" : "";
        if (option.standalone) {
            return "'(- *)'{".concat(collect).concat(flags, "}'[").concat(description, "]").concat(args, "'");
        }
        else {
            var excluded = excludedFlags.length
                ? "'(".concat(excludedFlags.join(" "), ")'")
                : "";
            if (collect || flags.length > 1) {
                return "".concat(excluded, "{").concat(collect).concat(flags, "}'[").concat(description, "]").concat(args, "'");
            }
            else {
                return "".concat(excluded).concat(flags, "'[").concat(description, "]").concat(args, "'");
            }
        }
    };
    ZshCompletionsGenerator.prototype.addAction = function (arg, cmd) {
        var action = "".concat(arg.name, "-").concat(arg.action);
        if (!this.actions.has(action)) {
            this.actions.set(action, {
                arg: arg,
                label: "".concat(arg.name, ": ").concat(arg.action),
                name: action,
                cmd: cmd
            });
        }
        return this.actions.get(action);
    };
    ZshCompletionsGenerator.prototype.generateActions = function (command) {
        var _this = this;
        var actions = [];
        if (this.actions.size) {
            actions = Array
                .from(this.actions)
                .map(function (_a) {
                var name = _a[0], action = _a[1];
                return "".concat(name, ") __").concat(replaceSpecialChars(_this.cmd.getName()), "_complete ").concat(action.arg.name, " ").concat(action.arg.action, " ").concat(action.cmd, " ;;");
            });
        }
        if (command.hasCommands(false)) {
            actions.unshift("command_args) _command_args ;;");
        }
        if (actions.length) {
            return "\n\n  case \"$state\" in\n    ".concat(actions.join("\n    "), "\n  esac");
        }
        return "";
    };
    return ZshCompletionsGenerator;
}());
exports.ZshCompletionsGenerator = ZshCompletionsGenerator;
function replaceSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "_");
}
