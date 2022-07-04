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
exports.InvalidTypeError = exports.NoArguments = exports.ArgumentFollowsVariadicArgument = exports.RequiredArgumentFollowsOptionalArgument = exports.MissingRequiredOption = exports.DependingOption = exports.ConflictingOption = exports.OptionNotCombinable = exports.InvalidOptionValue = exports.MissingOptionValue = exports.UnknownOption = exports.InvalidOption = exports.DuplicateOption = exports.ValidationError = exports.UnknownType = exports.UnknownConflictingOption = exports.UnknownRequiredOption = exports.FlagsError = void 0;
var _utils_ts_1 = require("./_utils.ts");
var FlagsError = (function (_super) {
    __extends(FlagsError, _super);
    function FlagsError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, FlagsError.prototype);
        return _this;
    }
    return FlagsError;
}(Error));
exports.FlagsError = FlagsError;
var UnknownRequiredOption = (function (_super) {
    __extends(UnknownRequiredOption, _super);
    function UnknownRequiredOption(option, options) {
        var _this = _super.call(this, "Unknown required option \"".concat((0, _utils_ts_1.getFlag)(option), "\".").concat((0, _utils_ts_1.didYouMeanOption)(option, options))) || this;
        Object.setPrototypeOf(_this, UnknownRequiredOption.prototype);
        return _this;
    }
    return UnknownRequiredOption;
}(FlagsError));
exports.UnknownRequiredOption = UnknownRequiredOption;
var UnknownConflictingOption = (function (_super) {
    __extends(UnknownConflictingOption, _super);
    function UnknownConflictingOption(option, options) {
        var _this = _super.call(this, "Unknown conflicting option \"".concat((0, _utils_ts_1.getFlag)(option), "\".").concat((0, _utils_ts_1.didYouMeanOption)(option, options))) || this;
        Object.setPrototypeOf(_this, UnknownConflictingOption.prototype);
        return _this;
    }
    return UnknownConflictingOption;
}(FlagsError));
exports.UnknownConflictingOption = UnknownConflictingOption;
var UnknownType = (function (_super) {
    __extends(UnknownType, _super);
    function UnknownType(type, types) {
        var _this = _super.call(this, "Unknown type \"".concat(type, "\".").concat((0, _utils_ts_1.didYouMeanType)(type, types))) || this;
        Object.setPrototypeOf(_this, UnknownType.prototype);
        return _this;
    }
    return UnknownType;
}(FlagsError));
exports.UnknownType = UnknownType;
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ValidationError.prototype);
        return _this;
    }
    return ValidationError;
}(FlagsError));
exports.ValidationError = ValidationError;
var DuplicateOption = (function (_super) {
    __extends(DuplicateOption, _super);
    function DuplicateOption(name) {
        var _this = _super.call(this, "Option \"".concat((0, _utils_ts_1.getFlag)(name).replace(/^--no-/, "--"), "\" can only occur once, but was found several times.")) || this;
        Object.setPrototypeOf(_this, DuplicateOption.prototype);
        return _this;
    }
    return DuplicateOption;
}(ValidationError));
exports.DuplicateOption = DuplicateOption;
var InvalidOption = (function (_super) {
    __extends(InvalidOption, _super);
    function InvalidOption(option, options) {
        var _this = _super.call(this, "Invalid option \"".concat((0, _utils_ts_1.getFlag)(option), "\".").concat((0, _utils_ts_1.didYouMeanOption)(option, options))) || this;
        Object.setPrototypeOf(_this, InvalidOption.prototype);
        return _this;
    }
    return InvalidOption;
}(ValidationError));
exports.InvalidOption = InvalidOption;
var UnknownOption = (function (_super) {
    __extends(UnknownOption, _super);
    function UnknownOption(option, options) {
        var _this = _super.call(this, "Unknown option \"".concat((0, _utils_ts_1.getFlag)(option), "\".").concat((0, _utils_ts_1.didYouMeanOption)(option, options))) || this;
        Object.setPrototypeOf(_this, UnknownOption.prototype);
        return _this;
    }
    return UnknownOption;
}(ValidationError));
exports.UnknownOption = UnknownOption;
var MissingOptionValue = (function (_super) {
    __extends(MissingOptionValue, _super);
    function MissingOptionValue(option) {
        var _this = _super.call(this, "Missing value for option \"".concat((0, _utils_ts_1.getFlag)(option), "\".")) || this;
        Object.setPrototypeOf(_this, MissingOptionValue.prototype);
        return _this;
    }
    return MissingOptionValue;
}(ValidationError));
exports.MissingOptionValue = MissingOptionValue;
var InvalidOptionValue = (function (_super) {
    __extends(InvalidOptionValue, _super);
    function InvalidOptionValue(option, expected, value) {
        var _this = _super.call(this, "Option \"".concat((0, _utils_ts_1.getFlag)(option), "\" must be of type \"").concat(expected, "\", but got \"").concat(value, "\".")) || this;
        Object.setPrototypeOf(_this, InvalidOptionValue.prototype);
        return _this;
    }
    return InvalidOptionValue;
}(ValidationError));
exports.InvalidOptionValue = InvalidOptionValue;
var OptionNotCombinable = (function (_super) {
    __extends(OptionNotCombinable, _super);
    function OptionNotCombinable(option) {
        var _this = _super.call(this, "Option \"".concat((0, _utils_ts_1.getFlag)(option), "\" cannot be combined with other options.")) || this;
        Object.setPrototypeOf(_this, OptionNotCombinable.prototype);
        return _this;
    }
    return OptionNotCombinable;
}(ValidationError));
exports.OptionNotCombinable = OptionNotCombinable;
var ConflictingOption = (function (_super) {
    __extends(ConflictingOption, _super);
    function ConflictingOption(option, conflictingOption) {
        var _this = _super.call(this, "Option \"".concat((0, _utils_ts_1.getFlag)(option), "\" conflicts with option \"").concat((0, _utils_ts_1.getFlag)(conflictingOption), "\".")) || this;
        Object.setPrototypeOf(_this, ConflictingOption.prototype);
        return _this;
    }
    return ConflictingOption;
}(ValidationError));
exports.ConflictingOption = ConflictingOption;
var DependingOption = (function (_super) {
    __extends(DependingOption, _super);
    function DependingOption(option, dependingOption) {
        var _this = _super.call(this, "Option \"".concat((0, _utils_ts_1.getFlag)(option), "\" depends on option \"").concat((0, _utils_ts_1.getFlag)(dependingOption), "\".")) || this;
        Object.setPrototypeOf(_this, DependingOption.prototype);
        return _this;
    }
    return DependingOption;
}(ValidationError));
exports.DependingOption = DependingOption;
var MissingRequiredOption = (function (_super) {
    __extends(MissingRequiredOption, _super);
    function MissingRequiredOption(option) {
        var _this = _super.call(this, "Missing required option \"".concat((0, _utils_ts_1.getFlag)(option), "\".")) || this;
        Object.setPrototypeOf(_this, MissingRequiredOption.prototype);
        return _this;
    }
    return MissingRequiredOption;
}(ValidationError));
exports.MissingRequiredOption = MissingRequiredOption;
var RequiredArgumentFollowsOptionalArgument = (function (_super) {
    __extends(RequiredArgumentFollowsOptionalArgument, _super);
    function RequiredArgumentFollowsOptionalArgument(arg) {
        var _this = _super.call(this, "An required argument cannot follow an optional argument, but \"".concat(arg, "\"  is defined as required.")) || this;
        Object.setPrototypeOf(_this, RequiredArgumentFollowsOptionalArgument.prototype);
        return _this;
    }
    return RequiredArgumentFollowsOptionalArgument;
}(ValidationError));
exports.RequiredArgumentFollowsOptionalArgument = RequiredArgumentFollowsOptionalArgument;
var ArgumentFollowsVariadicArgument = (function (_super) {
    __extends(ArgumentFollowsVariadicArgument, _super);
    function ArgumentFollowsVariadicArgument(arg) {
        var _this = _super.call(this, "An argument cannot follow an variadic argument, but got \"".concat(arg, "\".")) || this;
        Object.setPrototypeOf(_this, ArgumentFollowsVariadicArgument.prototype);
        return _this;
    }
    return ArgumentFollowsVariadicArgument;
}(ValidationError));
exports.ArgumentFollowsVariadicArgument = ArgumentFollowsVariadicArgument;
var NoArguments = (function (_super) {
    __extends(NoArguments, _super);
    function NoArguments() {
        var _this = _super.call(this, "No arguments.") || this;
        Object.setPrototypeOf(_this, NoArguments.prototype);
        return _this;
    }
    return NoArguments;
}(ValidationError));
exports.NoArguments = NoArguments;
var InvalidTypeError = (function (_super) {
    __extends(InvalidTypeError, _super);
    function InvalidTypeError(_a, expected) {
        var label = _a.label, name = _a.name, value = _a.value, type = _a.type;
        var _this = _super.call(this, "".concat(label, " \"").concat(name, "\" must be of type \"").concat(type, "\", but got \"").concat(value, "\".") + (expected
            ? " Expected values: ".concat(expected.map(function (value) { return "\"".concat(value, "\""); }).join(", "))
            : "")) || this;
        Object.setPrototypeOf(_this, MissingOptionValue.prototype);
        return _this;
    }
    return InvalidTypeError;
}(ValidationError));
exports.InvalidTypeError = InvalidTypeError;
