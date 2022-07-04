"use strict";
exports.__esModule = true;
exports.FishCompletionsGenerator = void 0;
var FishCompletionsGenerator = (function () {
    function FishCompletionsGenerator(cmd) {
        this.cmd = cmd;
    }
    FishCompletionsGenerator.generate = function (cmd) {
        return new FishCompletionsGenerator(cmd).generate();
    };
    FishCompletionsGenerator.prototype.generate = function () {
        var path = this.cmd.getPath();
        var version = this.cmd.getVersion()
            ? " v".concat(this.cmd.getVersion())
            : "";
        return "#!/usr/bin/env fish\n# fish completion support for ".concat(path).concat(version, "\n\nfunction __fish_").concat(replaceSpecialChars(this.cmd.getName()), "_using_command\n  set cmds ").concat(getCommandFnNames(this.cmd).join(" "), "\n  set words (commandline -opc)\n  set cmd \"_\"\n  for word in $words\n    switch $word\n      case '-*'\n        continue\n      case '*'\n        set word (string replace -r -a '\\W' '_' $word)\n        set cmd_tmp $cmd\"_$word\"\n        if contains $cmd_tmp $cmds\n          set cmd $cmd_tmp\n        end\n    end\n  end\n  if [ \"$cmd\" = \"$argv[1]\" ]\n    return 0\n  end\n  return 1\nend\n\n").concat(this.generateCompletions(this.cmd).trim());
    };
    FishCompletionsGenerator.prototype.generateCompletions = function (command) {
        var parent = command.getParent();
        var result = "";
        if (parent) {
            result += "\n" + this.complete(parent, {
                description: command.getShortDescription(),
                arguments: command.getName()
            });
        }
        var commandArgs = command.getArguments();
        if (commandArgs.length) {
            result += "\n" + this.complete(command, {
                arguments: commandArgs.length
                    ? this.getCompletionCommand(commandArgs[0].action + " " + getCompletionsPath(command))
                    : undefined
            });
        }
        for (var _i = 0, _a = command.getOptions(false); _i < _a.length; _i++) {
            var option = _a[_i];
            result += "\n" + this.completeOption(command, option);
        }
        for (var _b = 0, _c = command.getCommands(false); _b < _c.length; _b++) {
            var subCommand = _c[_b];
            result += this.generateCompletions(subCommand);
        }
        return result;
    };
    FishCompletionsGenerator.prototype.completeOption = function (command, option) {
        var _a, _b;
        var shortOption = (_a = option.flags
            .find(function (flag) { return flag.length === 2; })) === null || _a === void 0 ? void 0 : _a.replace(/^(-)+/, "");
        var longOption = (_b = option.flags
            .find(function (flag) { return flag.length > 2; })) === null || _b === void 0 ? void 0 : _b.replace(/^(-)+/, "");
        return this.complete(command, {
            description: option.description,
            shortOption: shortOption,
            longOption: longOption,
            required: true,
            standalone: option.standalone,
            arguments: option.args.length
                ? this.getCompletionCommand(option.args[0].action + " " + getCompletionsPath(command))
                : undefined
        });
    };
    FishCompletionsGenerator.prototype.complete = function (command, options) {
        var cmd = ["complete"];
        cmd.push("-c", this.cmd.getName());
        cmd.push("-n", "'__fish_".concat(replaceSpecialChars(this.cmd.getName()), "_using_command __").concat(replaceSpecialChars(command.getPath()), "'"));
        options.shortOption && cmd.push("-s", options.shortOption);
        options.longOption && cmd.push("-l", options.longOption);
        options.standalone && cmd.push("-x");
        cmd.push("-k");
        cmd.push("-f");
        if (options.arguments) {
            options.required && cmd.push("-r");
            cmd.push("-a", options.arguments);
        }
        options.description &&
            cmd.push("-d", "'".concat(options.description.split("\n", 1)[0], "'"));
        return cmd.join(" ");
    };
    FishCompletionsGenerator.prototype.getCompletionCommand = function (cmd) {
        return "'(".concat(this.cmd.getName(), " completions complete ").concat(cmd.trim(), ")'");
    };
    return FishCompletionsGenerator;
}());
exports.FishCompletionsGenerator = FishCompletionsGenerator;
function getCommandFnNames(cmd, cmds) {
    if (cmds === void 0) { cmds = []; }
    cmds.push("__".concat(replaceSpecialChars(cmd.getPath())));
    cmd.getCommands(false).forEach(function (command) {
        getCommandFnNames(command, cmds);
    });
    return cmds;
}
function getCompletionsPath(command) {
    return command.getPath()
        .split(" ")
        .slice(1)
        .join(" ");
}
function replaceSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "_");
}
