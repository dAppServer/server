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
exports.BashCompletionsGenerator = void 0;
var BashCompletionsGenerator = (function () {
    function BashCompletionsGenerator(cmd) {
        this.cmd = cmd;
    }
    BashCompletionsGenerator.generate = function (cmd) {
        return new BashCompletionsGenerator(cmd).generate();
    };
    BashCompletionsGenerator.prototype.generate = function () {
        var path = this.cmd.getPath();
        var version = this.cmd.getVersion()
            ? " v".concat(this.cmd.getVersion())
            : "";
        return "#!/usr/bin/env bash\n# bash completion support for ".concat(path).concat(version, "\n\n_").concat(replaceSpecialChars(path), "() {\n  local word cur prev\n  local -a opts\n  COMPREPLY=()\n  cur=\"${COMP_WORDS[COMP_CWORD]}\"\n  prev=\"${COMP_WORDS[COMP_CWORD-1]}\"\n  cmd=\"_\"\n  opts=()\n\n  _").concat(replaceSpecialChars(this.cmd.getName()), "_complete() {\n    local action=\"$1\"; shift\n    mapfile -t values < <( ").concat(this.cmd.getName(), " completions complete \"${action}\" \"${@}\" )\n    for i in \"${values[@]}\"; do\n      opts+=(\"$i\")\n    done\n  }\n\n  ").concat(this.generateCompletions(this.cmd).trim(), "\n\n  for word in \"${COMP_WORDS[@]}\"; do\n    case \"${word}\" in\n      -*) ;;\n      *)\n        cmd_tmp=\"${cmd}_${word//[^[:alnum:]]/_}\"\n        if type \"${cmd_tmp}\" &>/dev/null; then\n          cmd=\"${cmd_tmp}\"\n        fi\n    esac\n  done\n\n  ${cmd}\n\n  if [[ ${#opts[@]} -eq 0 ]]; then\n    # shellcheck disable=SC2207\n    COMPREPLY=($(compgen -f \"${cur}\"))\n    return 0\n  fi\n\n  local values\n  values=\"$( printf \"\\n%s\" \"${opts[@]}\" )\"\n  local IFS=$'\\n'\n  # shellcheck disable=SC2207\n  local result=($(compgen -W \"${values[@]}\" -- \"${cur}\"))\n  if [[ ${#result[@]} -eq 0 ]]; then\n    # shellcheck disable=SC2207\n    COMPREPLY=($(compgen -f \"${cur}\"))\n  else\n    # shellcheck disable=SC2207\n    COMPREPLY=($(printf '%q\\n' \"${result[@]}\"))\n  fi\n\n  return 0\n}\n\ncomplete -F _").concat(replaceSpecialChars(path), " -o bashdefault -o default ").concat(path);
    };
    BashCompletionsGenerator.prototype.generateCompletions = function (command, path, index) {
        var _this = this;
        if (path === void 0) { path = ""; }
        if (index === void 0) { index = 1; }
        path = (path ? path + " " : "") + command.getName();
        var commandCompletions = this.generateCommandCompletions(command, path, index);
        var childCommandCompletions = command.getCommands(false)
            .filter(function (subCommand) { return subCommand !== command; })
            .map(function (subCommand) {
            return _this.generateCompletions(subCommand, path, index + 1);
        })
            .join("");
        return "".concat(commandCompletions, "\n\n").concat(childCommandCompletions);
    };
    BashCompletionsGenerator.prototype.generateCommandCompletions = function (command, path, index) {
        var flags = this.getFlags(command);
        var childCommandNames = command.getCommands(false)
            .map(function (childCommand) { return childCommand.getName(); });
        var completionsPath = ~path.indexOf(" ")
            ? " " + path.split(" ").slice(1).join(" ")
            : "";
        var optionArguments = this.generateOptionArguments(command, completionsPath);
        var completionsCmd = this.generateCommandCompletionsCommand(command.getArguments(), completionsPath);
        return "  __".concat(replaceSpecialChars(path), "() {\n    opts=(").concat(__spreadArray(__spreadArray([], flags, true), childCommandNames, true).join(" "), ")\n    ").concat(completionsCmd, "\n    if [[ ${cur} == -* || ${COMP_CWORD} -eq ").concat(index, " ]] ; then\n      return 0\n    fi\n    ").concat(optionArguments, "\n  }");
    };
    BashCompletionsGenerator.prototype.getFlags = function (command) {
        return command.getOptions(false)
            .map(function (option) { return option.flags; })
            .flat();
    };
    BashCompletionsGenerator.prototype.generateOptionArguments = function (command, completionsPath) {
        var opts = "";
        var options = command.getOptions(false);
        if (options.length) {
            opts += 'case "${prev}" in';
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var option = options_1[_i];
                var flags = option.flags
                    .map(function (flag) { return flag.trim(); })
                    .join("|");
                var completionsCmd = this.generateOptionCompletionsCommand(option.args, completionsPath, { standalone: option.standalone });
                opts += "\n      ".concat(flags, ") ").concat(completionsCmd, " ;;");
            }
            opts += "\n    esac";
        }
        return opts;
    };
    BashCompletionsGenerator.prototype.generateCommandCompletionsCommand = function (args, path) {
        if (args.length) {
            return "_".concat(replaceSpecialChars(this.cmd.getName()), "_complete ").concat(args[0].action).concat(path);
        }
        return "";
    };
    BashCompletionsGenerator.prototype.generateOptionCompletionsCommand = function (args, path, opts) {
        if (args.length) {
            return "opts=(); _".concat(replaceSpecialChars(this.cmd.getName()), "_complete ").concat(args[0].action).concat(path);
        }
        if (opts === null || opts === void 0 ? void 0 : opts.standalone) {
            return "opts=()";
        }
        return "";
    };
    return BashCompletionsGenerator;
}());
exports.BashCompletionsGenerator = BashCompletionsGenerator;
function replaceSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "_");
}
