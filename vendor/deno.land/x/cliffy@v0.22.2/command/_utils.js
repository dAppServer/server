"use strict";
exports.__esModule = true;
exports.parseArgumentsDefinition = exports.splitArguments = exports.didYouMeanCommand = void 0;
var _utils_ts_1 = require("../flags/_utils.ts");
var _errors_ts_1 = require("../flags/_errors.ts");
var types_ts_1 = require("../flags/types.ts");
function didYouMeanCommand(command, commands, excludes) {
    if (excludes === void 0) { excludes = []; }
    var commandNames = commands
        .map(function (command) { return command.getName(); })
        .filter(function (command) { return !excludes.includes(command); });
    return (0, _utils_ts_1.didYouMean)(" Did you mean command", command, commandNames);
}
exports.didYouMeanCommand = didYouMeanCommand;
var ARGUMENT_REGEX = /^[<\[].+[\]>]$/;
var ARGUMENT_DETAILS_REGEX = /[<\[:>\]]/;
function splitArguments(args) {
    var parts = args.trim().split(/[, =] */g);
    var typeParts = [];
    while (parts[parts.length - 1] &&
        ARGUMENT_REGEX.test(parts[parts.length - 1])) {
        typeParts.unshift(parts.pop());
    }
    var typeDefinition = typeParts.join(" ");
    return { flags: parts, typeDefinition: typeDefinition };
}
exports.splitArguments = splitArguments;
function parseArgumentsDefinition(argsDefinition, validate, all) {
    if (validate === void 0) { validate = true; }
    var argumentDetails = [];
    var hasOptional = false;
    var hasVariadic = false;
    var parts = argsDefinition.split(/ +/);
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var arg = parts_1[_i];
        if (validate && hasVariadic) {
            throw new _errors_ts_1.ArgumentFollowsVariadicArgument(arg);
        }
        var parts_2 = arg.split(ARGUMENT_DETAILS_REGEX);
        if (!parts_2[1]) {
            if (all) {
                argumentDetails.push(parts_2[0]);
            }
            continue;
        }
        var type = parts_2[2] || types_ts_1.OptionType.STRING;
        var details = {
            optionalValue: arg[0] === "[",
            requiredValue: arg[0] === "<",
            name: parts_2[1],
            action: parts_2[3] || type,
            variadic: false,
            list: type ? arg.indexOf(type + "[]") !== -1 : false,
            type: type
        };
        if (validate && !details.optionalValue && hasOptional) {
            throw new _errors_ts_1.RequiredArgumentFollowsOptionalArgument(details.name);
        }
        if (arg[0] === "[") {
            hasOptional = true;
        }
        if (details.name.length > 3) {
            var istVariadicLeft = details.name.slice(0, 3) === "...";
            var istVariadicRight = details.name.slice(-3) === "...";
            hasVariadic = details.variadic = istVariadicLeft || istVariadicRight;
            if (istVariadicLeft) {
                details.name = details.name.slice(3);
            }
            else if (istVariadicRight) {
                details.name = details.name.slice(0, -3);
            }
        }
        argumentDetails.push(details);
    }
    return argumentDetails;
}
exports.parseArgumentsDefinition = parseArgumentsDefinition;
