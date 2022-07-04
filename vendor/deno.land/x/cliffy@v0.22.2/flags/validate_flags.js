"use strict";
exports.__esModule = true;
exports.validateFlags = void 0;
var _utils_ts_1 = require("./_utils.ts");
var _errors_ts_1 = require("./_errors.ts");
function validateFlags(flags, values, _knownFlaks, allowEmpty, optionNames) {
    var _a, _b, _c, _d, _e;
    if (optionNames === void 0) { optionNames = {}; }
    var defaultValues = {};
    for (var _i = 0, flags_1 = flags; _i < flags_1.length; _i++) {
        var option = flags_1[_i];
        var name_1 = void 0;
        var defaultValue = undefined;
        if (option.name.startsWith("no-")) {
            var propName = option.name.replace(/^no-/, "");
            if (propName in values) {
                continue;
            }
            var positiveOption = (0, _utils_ts_1.getOption)(flags, propName);
            if (positiveOption) {
                continue;
            }
            name_1 = (0, _utils_ts_1.paramCaseToCamelCase)(propName);
            defaultValue = true;
        }
        if (!name_1) {
            name_1 = (0, _utils_ts_1.paramCaseToCamelCase)(option.name);
        }
        if (!(name_1 in optionNames)) {
            optionNames[name_1] = option.name;
        }
        var hasDefaultValue = typeof values[name_1] === "undefined" && (typeof option["default"] !== "undefined" ||
            typeof defaultValue !== "undefined");
        if (hasDefaultValue) {
            values[name_1] = (_a = (0, _utils_ts_1.getDefaultValue)(option)) !== null && _a !== void 0 ? _a : defaultValue;
            defaultValues[option.name] = true;
            if (typeof option.value === "function") {
                values[name_1] = option.value(values[name_1]);
            }
        }
    }
    var keys = Object.keys(values);
    if (keys.length === 0 && allowEmpty) {
        return;
    }
    var options = keys.map(function (name) { return ({
        name: name,
        option: (0, _utils_ts_1.getOption)(flags, optionNames[name])
    }); });
    var _loop_1 = function (name_2, option) {
        if (!option) {
            throw new _errors_ts_1.UnknownOption(name_2, flags);
        }
        if (option.standalone) {
            if (keys.length > 1) {
                if (options.every(function (_a) {
                    var opt = _a.option;
                    return opt &&
                        (option === opt || defaultValues[opt.name]);
                })) {
                    return { value: void 0 };
                }
                throw new _errors_ts_1.OptionNotCombinable(option.name);
            }
            return { value: void 0 };
        }
        (_b = option.conflicts) === null || _b === void 0 ? void 0 : _b.forEach(function (flag) {
            if (isset(flag, values)) {
                throw new _errors_ts_1.ConflictingOption(option.name, flag);
            }
        });
        (_c = option.depends) === null || _c === void 0 ? void 0 : _c.forEach(function (flag) {
            if (!isset(flag, values) && !defaultValues[option.name]) {
                throw new _errors_ts_1.DependingOption(option.name, flag);
            }
        });
        var isArray = (((_d = option.args) === null || _d === void 0 ? void 0 : _d.length) || 0) > 1;
        (_e = option.args) === null || _e === void 0 ? void 0 : _e.forEach(function (arg, i) {
            if (arg.requiredValue &&
                (typeof values[name_2] === "undefined" ||
                    (isArray &&
                        typeof values[name_2][i] === "undefined"))) {
                throw new _errors_ts_1.MissingOptionValue(option.name);
            }
        });
    };
    for (var _f = 0, options_1 = options; _f < options_1.length; _f++) {
        var _g = options_1[_f], name_2 = _g.name, option = _g.option;
        var state_1 = _loop_1(name_2, option);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    var _loop_2 = function (option) {
        if (option.required && !((0, _utils_ts_1.paramCaseToCamelCase)(option.name) in values)) {
            if ((!option.conflicts ||
                !option.conflicts.find(function (flag) { return !!values[flag]; })) &&
                !options.find(function (opt) { var _a, _b; return (_b = (_a = opt.option) === null || _a === void 0 ? void 0 : _a.conflicts) === null || _b === void 0 ? void 0 : _b.find(function (flag) { return flag === option.name; }); })) {
                throw new _errors_ts_1.MissingRequiredOption(option.name);
            }
        }
    };
    for (var _h = 0, flags_2 = flags; _h < flags_2.length; _h++) {
        var option = flags_2[_h];
        _loop_2(option);
    }
    if (keys.length === 0 && !allowEmpty) {
        throw new _errors_ts_1.NoArguments();
    }
}
exports.validateFlags = validateFlags;
function isset(flag, values) {
    var name = (0, _utils_ts_1.paramCaseToCamelCase)(flag);
    return typeof values[name] !== "undefined";
}
