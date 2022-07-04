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
var _a;
exports.__esModule = true;
exports.parseFlags = void 0;
var _utils_ts_1 = require("./_utils.ts");
var _errors_ts_1 = require("./_errors.ts");
var types_ts_1 = require("./types.ts");
var boolean_ts_1 = require("./types/boolean.ts");
var number_ts_1 = require("./types/number.ts");
var string_ts_1 = require("./types/string.ts");
var validate_flags_ts_1 = require("./validate_flags.ts");
var integer_ts_1 = require("./types/integer.ts");
var Types = (_a = {},
    _a[types_ts_1.OptionType.STRING] = string_ts_1.string,
    _a[types_ts_1.OptionType.NUMBER] = number_ts_1.number,
    _a[types_ts_1.OptionType.INTEGER] = integer_ts_1.integer,
    _a[types_ts_1.OptionType.BOOLEAN] = boolean_ts_1.boolean,
    _a);
function parseFlags(args, opts) {
    var _a, _b, _c;
    if (opts === void 0) { opts = {}; }
    args = args.slice();
    !opts.flags && (opts.flags = []);
    var inLiteral = false;
    var negate = false;
    var flags = {};
    var optionNames = {};
    var literal = [];
    var unknown = [];
    var stopEarly = null;
    opts.flags.forEach(function (opt) {
        var _a, _b;
        (_a = opt.depends) === null || _a === void 0 ? void 0 : _a.forEach(function (flag) {
            var _a;
            if (!opts.flags || !(0, _utils_ts_1.getOption)(opts.flags, flag)) {
                throw new _errors_ts_1.UnknownRequiredOption(flag, (_a = opts.flags) !== null && _a !== void 0 ? _a : []);
            }
        });
        (_b = opt.conflicts) === null || _b === void 0 ? void 0 : _b.forEach(function (flag) {
            var _a;
            if (!opts.flags || !(0, _utils_ts_1.getOption)(opts.flags, flag)) {
                throw new _errors_ts_1.UnknownConflictingOption(flag, (_a = opts.flags) !== null && _a !== void 0 ? _a : []);
            }
        });
    });
    var _loop_1 = function (argsIndex) {
        var option = void 0;
        var optionArgs = void 0;
        var current = args[argsIndex];
        var currentValue;
        if (inLiteral) {
            literal.push(current);
            return out_argsIndex_1 = argsIndex, "continue";
        }
        if (current === "--") {
            inLiteral = true;
            return out_argsIndex_1 = argsIndex, "continue";
        }
        var isFlag = current.length > 1 && current[0] === "-";
        var next = function () { return currentValue !== null && currentValue !== void 0 ? currentValue : args[argsIndex + 1]; };
        if (isFlag) {
            var isShort = current[1] !== "-";
            var isLong = isShort ? false : current.length > 3 && current[2] !== "-";
            if (!isShort && !isLong) {
                throw new _errors_ts_1.InvalidOption(current, opts.flags);
            }
            var equalSignIndex = current.indexOf("=");
            if (equalSignIndex > -1) {
                currentValue = current.slice(equalSignIndex + 1) || undefined;
                current = current.slice(0, equalSignIndex);
            }
            if (isShort && current.length > 2 && current[2] !== ".") {
                args.splice.apply(args, __spreadArray([argsIndex, 1], splitFlags(current), false));
                current = args[argsIndex];
            }
            else if (isLong && current.startsWith("--no-")) {
                negate = true;
            }
            option = (0, _utils_ts_1.getOption)(opts.flags, current);
            if (!option) {
                if (opts.flags.length) {
                    throw new _errors_ts_1.UnknownOption(current, opts.flags);
                }
                option = {
                    name: current.replace(/^-+/, ""),
                    optionalValue: true,
                    type: types_ts_1.OptionType.STRING
                };
            }
            var positiveName = negate
                ? option.name.replace(/^no-?/, "")
                : option.name;
            var propName_1 = (0, _utils_ts_1.paramCaseToCamelCase)(positiveName);
            if (typeof flags[propName_1] !== "undefined") {
                if (!opts.flags.length) {
                    option.collect = true;
                }
                else if (!option.collect) {
                    throw new _errors_ts_1.DuplicateOption(current);
                }
            }
            optionArgs = ((_a = option.args) === null || _a === void 0 ? void 0 : _a.length) ? option.args : [{
                    type: option.type,
                    requiredValue: option.requiredValue,
                    optionalValue: option.optionalValue,
                    variadic: option.variadic,
                    list: option.list,
                    separator: option.separator
                }];
            var optionArgsIndex_1 = 0;
            var inOptionalArg_1 = false;
            var previous = flags[propName_1];
            parseNext(option, optionArgs);
            if (typeof flags[propName_1] === "undefined") {
                if (optionArgs[optionArgsIndex_1].requiredValue) {
                    throw new _errors_ts_1.MissingOptionValue(option.name);
                }
                else if (typeof option["default"] !== "undefined") {
                    flags[propName_1] = (0, _utils_ts_1.getDefaultValue)(option);
                }
                else {
                    flags[propName_1] = true;
                }
            }
            if (option.value) {
                flags[propName_1] = option.value(flags[propName_1], previous);
            }
            else if (option.collect) {
                var value = typeof previous !== "undefined"
                    ? (Array.isArray(previous) ? previous : [previous])
                    : [];
                value.push(flags[propName_1]);
                flags[propName_1] = value;
            }
            optionNames[propName_1] = option.name;
            (_b = opts.option) === null || _b === void 0 ? void 0 : _b.call(opts, option, flags[propName_1]);
            function parseNext(option, optionArgs) {
                var _a, _b;
                var arg = optionArgs[optionArgsIndex_1];
                if (!arg) {
                    var flag = next();
                    throw new _errors_ts_1.UnknownOption(flag, (_a = opts.flags) !== null && _a !== void 0 ? _a : []);
                }
                if (!arg.type) {
                    arg.type = types_ts_1.OptionType.BOOLEAN;
                }
                if ((_b = option.args) === null || _b === void 0 ? void 0 : _b.length) {
                    if ((typeof arg.optionalValue === "undefined" ||
                        arg.optionalValue === false) &&
                        typeof arg.requiredValue === "undefined") {
                        arg.requiredValue = true;
                    }
                }
                else {
                    if (arg.type !== types_ts_1.OptionType.BOOLEAN &&
                        (typeof arg.optionalValue === "undefined" ||
                            arg.optionalValue === false) &&
                        typeof arg.requiredValue === "undefined") {
                        arg.requiredValue = true;
                    }
                }
                if (arg.requiredValue) {
                    if (inOptionalArg_1) {
                        throw new _errors_ts_1.RequiredArgumentFollowsOptionalArgument(option.name);
                    }
                }
                else {
                    inOptionalArg_1 = true;
                }
                if (negate) {
                    flags[propName_1] = false;
                    return;
                }
                var result;
                var increase = false;
                if (arg.list && hasNext(arg)) {
                    var parsed = next()
                        .split(arg.separator || ",")
                        .map(function (nextValue) {
                        var _a;
                        var value = parseValue(option, arg, nextValue);
                        if (typeof value === "undefined") {
                            throw new _errors_ts_1.InvalidOptionValue(option.name, (_a = arg.type) !== null && _a !== void 0 ? _a : "?", nextValue);
                        }
                        return value;
                    });
                    if (parsed === null || parsed === void 0 ? void 0 : parsed.length) {
                        result = parsed;
                    }
                }
                else {
                    if (hasNext(arg)) {
                        result = parseValue(option, arg, next());
                    }
                    else if (arg.optionalValue && arg.type === types_ts_1.OptionType.BOOLEAN) {
                        result = true;
                    }
                }
                if (increase && typeof currentValue === "undefined") {
                    argsIndex++;
                    if (!arg.variadic) {
                        optionArgsIndex_1++;
                    }
                    else if (optionArgs[optionArgsIndex_1 + 1]) {
                        throw new _errors_ts_1.ArgumentFollowsVariadicArgument(next());
                    }
                }
                if (typeof result !== "undefined" &&
                    (optionArgs.length > 1 || arg.variadic)) {
                    if (!flags[propName_1]) {
                        flags[propName_1] = [];
                    }
                    flags[propName_1].push(result);
                    if (hasNext(arg)) {
                        parseNext(option, optionArgs);
                    }
                }
                else {
                    flags[propName_1] = result;
                }
                function hasNext(arg) {
                    var nextValue = currentValue !== null && currentValue !== void 0 ? currentValue : args[argsIndex + 1];
                    if (!currentValue && !nextValue) {
                        return false;
                    }
                    if (arg.requiredValue) {
                        return true;
                    }
                    if (arg.optionalValue || arg.variadic) {
                        return nextValue[0] !== "-" ||
                            (arg.type === types_ts_1.OptionType.NUMBER && !isNaN(Number(nextValue)));
                    }
                    return false;
                }
                function parseValue(option, arg, value) {
                    var type = arg.type || types_ts_1.OptionType.STRING;
                    var result = opts.parse
                        ? opts.parse({
                            label: "Option",
                            type: type,
                            name: "--".concat(option.name),
                            value: value
                        })
                        : parseFlagValue(option, arg, value);
                    if (typeof result !== "undefined") {
                        increase = true;
                    }
                    return result;
                }
            }
        }
        else {
            if (opts.stopEarly) {
                stopEarly = current;
                return out_argsIndex_1 = argsIndex, "break";
            }
            unknown.push(current);
        }
        out_argsIndex_1 = argsIndex;
    };
    var out_argsIndex_1;
    for (var argsIndex = 0; argsIndex < args.length; argsIndex++) {
        var state_1 = _loop_1(argsIndex);
        argsIndex = out_argsIndex_1;
        if (state_1 === "break")
            break;
    }
    if (stopEarly) {
        var stopEarlyArgIndex = args.indexOf(stopEarly);
        if (stopEarlyArgIndex !== -1) {
            var doubleDashIndex = args.indexOf("--");
            unknown = args.slice(stopEarlyArgIndex, doubleDashIndex === -1 ? undefined : doubleDashIndex);
            if (doubleDashIndex !== -1) {
                literal = args.slice(doubleDashIndex + 1);
            }
        }
    }
    if ((_c = opts.flags) === null || _c === void 0 ? void 0 : _c.length) {
        (0, validate_flags_ts_1.validateFlags)(opts.flags, flags, opts.knownFlaks, opts.allowEmpty, optionNames);
    }
    var result = Object.keys(flags)
        .reduce(function (result, key) {
        if (~key.indexOf(".")) {
            key.split(".").reduce(function (result, subKey, index, parts) {
                var _a;
                if (index === parts.length - 1) {
                    result[subKey] = flags[key];
                }
                else {
                    result[subKey] = (_a = result[subKey]) !== null && _a !== void 0 ? _a : {};
                }
                return result[subKey];
            }, result);
        }
        else {
            result[key] = flags[key];
        }
        return result;
    }, {});
    return { flags: result, unknown: unknown, literal: literal };
}
exports.parseFlags = parseFlags;
function splitFlags(flag) {
    var normalized = [];
    var flags = flag.slice(1).split("");
    if (isNaN(Number(flag[flag.length - 1]))) {
        flags.forEach(function (val) { return normalized.push("-".concat(val)); });
    }
    else {
        normalized.push("-".concat(flags.shift()));
        if (flags.length) {
            normalized.push(flags.join(""));
        }
    }
    return normalized;
}
function parseFlagValue(option, arg, value) {
    var type = arg.type || types_ts_1.OptionType.STRING;
    var parseType = Types[type];
    if (!parseType) {
        throw new _errors_ts_1.UnknownType(type, Object.keys(Types));
    }
    return parseType({
        label: "Option",
        type: type,
        name: "--".concat(option.name),
        value: value
    });
}
