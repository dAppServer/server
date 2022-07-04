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
exports.TooManyArguments = exports.MissingArgument = exports.MissingArguments = exports.NoArgumentsAllowed = exports.UnknownCommand = exports.UnknownCompletionCommand = exports.CommandExecutableNotFound = exports.DefaultCommandNotFound = exports.EnvironmentVariableVariadicValue = exports.EnvironmentVariableOptionalValue = exports.EnvironmentVariableSingleValue = exports.MissingRequiredEnvVar = exports.DuplicateEnvironmentVariable = exports.DuplicateExample = exports.DuplicateCompletion = exports.DuplicateType = exports.CommandNotFound = exports.DuplicateCommandAlias = exports.DuplicateCommandName = exports.MissingCommandName = exports.DuplicateOptionName = exports.ValidationError = exports.CommandError = void 0;
var _utils_ts_1 = require("./_utils.ts");
var _utils_ts_2 = require("../flags/_utils.ts");
var CommandError = (function (_super) {
    __extends(CommandError, _super);
    function CommandError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CommandError.prototype);
        return _this;
    }
    return CommandError;
}(Error));
exports.CommandError = CommandError;
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, _a) {
        var _b = _a === void 0 ? {} : _a, exitCode = _b.exitCode;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ValidationError.prototype);
        _this.exitCode = exitCode !== null && exitCode !== void 0 ? exitCode : 1;
        return _this;
    }
    return ValidationError;
}(CommandError));
exports.ValidationError = ValidationError;
var DuplicateOptionName = (function (_super) {
    __extends(DuplicateOptionName, _super);
    function DuplicateOptionName(name) {
        var _this = _super.call(this, "Option with name \"".concat((0, _utils_ts_2.getFlag)(name), "\" already exists.")) || this;
        Object.setPrototypeOf(_this, DuplicateOptionName.prototype);
        return _this;
    }
    return DuplicateOptionName;
}(CommandError));
exports.DuplicateOptionName = DuplicateOptionName;
var MissingCommandName = (function (_super) {
    __extends(MissingCommandName, _super);
    function MissingCommandName() {
        var _this = _super.call(this, "Missing command name.") || this;
        Object.setPrototypeOf(_this, MissingCommandName.prototype);
        return _this;
    }
    return MissingCommandName;
}(CommandError));
exports.MissingCommandName = MissingCommandName;
var DuplicateCommandName = (function (_super) {
    __extends(DuplicateCommandName, _super);
    function DuplicateCommandName(name) {
        var _this = _super.call(this, "Duplicate command name \"".concat(name, "\".")) || this;
        Object.setPrototypeOf(_this, DuplicateCommandName.prototype);
        return _this;
    }
    return DuplicateCommandName;
}(CommandError));
exports.DuplicateCommandName = DuplicateCommandName;
var DuplicateCommandAlias = (function (_super) {
    __extends(DuplicateCommandAlias, _super);
    function DuplicateCommandAlias(alias) {
        var _this = _super.call(this, "Duplicate command alias \"".concat(alias, "\".")) || this;
        Object.setPrototypeOf(_this, DuplicateCommandAlias.prototype);
        return _this;
    }
    return DuplicateCommandAlias;
}(CommandError));
exports.DuplicateCommandAlias = DuplicateCommandAlias;
var CommandNotFound = (function (_super) {
    __extends(CommandNotFound, _super);
    function CommandNotFound(name, commands, excluded) {
        var _this = _super.call(this, "Unknown command \"".concat(name, "\".").concat((0, _utils_ts_1.didYouMeanCommand)(name, commands, excluded))) || this;
        Object.setPrototypeOf(_this, UnknownCommand.prototype);
        return _this;
    }
    return CommandNotFound;
}(CommandError));
exports.CommandNotFound = CommandNotFound;
var DuplicateType = (function (_super) {
    __extends(DuplicateType, _super);
    function DuplicateType(name) {
        var _this = _super.call(this, "Type with name \"".concat(name, "\" already exists.")) || this;
        Object.setPrototypeOf(_this, DuplicateType.prototype);
        return _this;
    }
    return DuplicateType;
}(CommandError));
exports.DuplicateType = DuplicateType;
var DuplicateCompletion = (function (_super) {
    __extends(DuplicateCompletion, _super);
    function DuplicateCompletion(name) {
        var _this = _super.call(this, "Completion with name \"".concat(name, "\" already exists.")) || this;
        Object.setPrototypeOf(_this, DuplicateCompletion.prototype);
        return _this;
    }
    return DuplicateCompletion;
}(CommandError));
exports.DuplicateCompletion = DuplicateCompletion;
var DuplicateExample = (function (_super) {
    __extends(DuplicateExample, _super);
    function DuplicateExample(name) {
        var _this = _super.call(this, "Example with name \"".concat(name, "\" already exists.")) || this;
        Object.setPrototypeOf(_this, DuplicateExample.prototype);
        return _this;
    }
    return DuplicateExample;
}(CommandError));
exports.DuplicateExample = DuplicateExample;
var DuplicateEnvironmentVariable = (function (_super) {
    __extends(DuplicateEnvironmentVariable, _super);
    function DuplicateEnvironmentVariable(name) {
        var _this = _super.call(this, "Environment variable with name \"".concat(name, "\" already exists.")) || this;
        Object.setPrototypeOf(_this, DuplicateEnvironmentVariable.prototype);
        return _this;
    }
    return DuplicateEnvironmentVariable;
}(CommandError));
exports.DuplicateEnvironmentVariable = DuplicateEnvironmentVariable;
var MissingRequiredEnvVar = (function (_super) {
    __extends(MissingRequiredEnvVar, _super);
    function MissingRequiredEnvVar(envVar) {
        var _this = _super.call(this, "Missing required environment variable \"".concat(envVar.names[0], "\".")) || this;
        Object.setPrototypeOf(_this, MissingRequiredEnvVar.prototype);
        return _this;
    }
    return MissingRequiredEnvVar;
}(ValidationError));
exports.MissingRequiredEnvVar = MissingRequiredEnvVar;
var EnvironmentVariableSingleValue = (function (_super) {
    __extends(EnvironmentVariableSingleValue, _super);
    function EnvironmentVariableSingleValue(name) {
        var _this = _super.call(this, "An environment variable can only have one value, but \"".concat(name, "\" has more than one.")) || this;
        Object.setPrototypeOf(_this, EnvironmentVariableSingleValue.prototype);
        return _this;
    }
    return EnvironmentVariableSingleValue;
}(CommandError));
exports.EnvironmentVariableSingleValue = EnvironmentVariableSingleValue;
var EnvironmentVariableOptionalValue = (function (_super) {
    __extends(EnvironmentVariableOptionalValue, _super);
    function EnvironmentVariableOptionalValue(name) {
        var _this = _super.call(this, "An environment variable cannot have an optional value, but \"".concat(name, "\" is defined as optional.")) || this;
        Object.setPrototypeOf(_this, EnvironmentVariableOptionalValue.prototype);
        return _this;
    }
    return EnvironmentVariableOptionalValue;
}(CommandError));
exports.EnvironmentVariableOptionalValue = EnvironmentVariableOptionalValue;
var EnvironmentVariableVariadicValue = (function (_super) {
    __extends(EnvironmentVariableVariadicValue, _super);
    function EnvironmentVariableVariadicValue(name) {
        var _this = _super.call(this, "An environment variable cannot have an variadic value, but \"".concat(name, "\" is defined as variadic.")) || this;
        Object.setPrototypeOf(_this, EnvironmentVariableVariadicValue.prototype);
        return _this;
    }
    return EnvironmentVariableVariadicValue;
}(CommandError));
exports.EnvironmentVariableVariadicValue = EnvironmentVariableVariadicValue;
var DefaultCommandNotFound = (function (_super) {
    __extends(DefaultCommandNotFound, _super);
    function DefaultCommandNotFound(name, commands) {
        var _this = _super.call(this, "Default command \"".concat(name, "\" not found.").concat((0, _utils_ts_1.didYouMeanCommand)(name, commands))) || this;
        Object.setPrototypeOf(_this, DefaultCommandNotFound.prototype);
        return _this;
    }
    return DefaultCommandNotFound;
}(CommandError));
exports.DefaultCommandNotFound = DefaultCommandNotFound;
var CommandExecutableNotFound = (function (_super) {
    __extends(CommandExecutableNotFound, _super);
    function CommandExecutableNotFound(name) {
        var _this = _super.call(this, "Command executable not found: ".concat(name)) || this;
        Object.setPrototypeOf(_this, CommandExecutableNotFound.prototype);
        return _this;
    }
    return CommandExecutableNotFound;
}(CommandError));
exports.CommandExecutableNotFound = CommandExecutableNotFound;
var UnknownCompletionCommand = (function (_super) {
    __extends(UnknownCompletionCommand, _super);
    function UnknownCompletionCommand(name, commands) {
        var _this = _super.call(this, "Auto-completion failed. Unknown command \"".concat(name, "\".").concat((0, _utils_ts_1.didYouMeanCommand)(name, commands))) || this;
        Object.setPrototypeOf(_this, UnknownCompletionCommand.prototype);
        return _this;
    }
    return UnknownCompletionCommand;
}(CommandError));
exports.UnknownCompletionCommand = UnknownCompletionCommand;
var UnknownCommand = (function (_super) {
    __extends(UnknownCommand, _super);
    function UnknownCommand(name, commands, excluded) {
        var _this = _super.call(this, "Unknown command \"".concat(name, "\".").concat((0, _utils_ts_1.didYouMeanCommand)(name, commands, excluded))) || this;
        Object.setPrototypeOf(_this, UnknownCommand.prototype);
        return _this;
    }
    return UnknownCommand;
}(ValidationError));
exports.UnknownCommand = UnknownCommand;
var NoArgumentsAllowed = (function (_super) {
    __extends(NoArgumentsAllowed, _super);
    function NoArgumentsAllowed(name) {
        var _this = _super.call(this, "No arguments allowed for command \"".concat(name, "\".")) || this;
        Object.setPrototypeOf(_this, NoArgumentsAllowed.prototype);
        return _this;
    }
    return NoArgumentsAllowed;
}(ValidationError));
exports.NoArgumentsAllowed = NoArgumentsAllowed;
var MissingArguments = (function (_super) {
    __extends(MissingArguments, _super);
    function MissingArguments(args) {
        var _this = _super.call(this, "Missing argument(s): " + args.join(", ")) || this;
        Object.setPrototypeOf(_this, MissingArguments.prototype);
        return _this;
    }
    return MissingArguments;
}(ValidationError));
exports.MissingArguments = MissingArguments;
var MissingArgument = (function (_super) {
    __extends(MissingArgument, _super);
    function MissingArgument(arg) {
        var _this = _super.call(this, "Missing argument \"".concat(arg, "\".")) || this;
        Object.setPrototypeOf(_this, MissingArgument.prototype);
        return _this;
    }
    return MissingArgument;
}(ValidationError));
exports.MissingArgument = MissingArgument;
var TooManyArguments = (function (_super) {
    __extends(TooManyArguments, _super);
    function TooManyArguments(args) {
        var _this = _super.call(this, "Too many arguments: ".concat(args.join(" "))) || this;
        Object.setPrototypeOf(_this, TooManyArguments.prototype);
        return _this;
    }
    return TooManyArguments;
}(ValidationError));
exports.TooManyArguments = TooManyArguments;
