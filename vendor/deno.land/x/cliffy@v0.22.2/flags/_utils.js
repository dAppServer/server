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
exports.getDefaultValue = exports.getFlag = exports.didYouMean = exports.didYouMeanType = exports.didYouMeanOption = exports.getOption = exports.underscoreToCamelCase = exports.paramCaseToCamelCase = void 0;
var distance_ts_1 = require("../_utils/distance.ts");
function paramCaseToCamelCase(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}
exports.paramCaseToCamelCase = paramCaseToCamelCase;
function underscoreToCamelCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toLowerCase()
        .replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
}
exports.underscoreToCamelCase = underscoreToCamelCase;
function getOption(flags, name) {
    while (name[0] === "-") {
        name = name.slice(1);
    }
    for (var _i = 0, flags_1 = flags; _i < flags_1.length; _i++) {
        var flag = flags_1[_i];
        if (isOption(flag, name)) {
            return flag;
        }
    }
    return;
}
exports.getOption = getOption;
function didYouMeanOption(option, options) {
    var optionNames = options
        .map(function (option) { var _a; return __spreadArray([option.name], ((_a = option.aliases) !== null && _a !== void 0 ? _a : []), true); })
        .flat()
        .map(function (option) { return getFlag(option); });
    return didYouMean(" Did you mean option", getFlag(option), optionNames);
}
exports.didYouMeanOption = didYouMeanOption;
function didYouMeanType(type, types) {
    return didYouMean(" Did you mean type", type, types);
}
exports.didYouMeanType = didYouMeanType;
function didYouMean(message, type, types) {
    var match = closest(type, types);
    return match ? "".concat(message, " \"").concat(match, "\"?") : "";
}
exports.didYouMean = didYouMean;
function getFlag(name) {
    if (name.startsWith("-")) {
        return name;
    }
    if (name.length > 1) {
        return "--".concat(name);
    }
    return "-".concat(name);
}
exports.getFlag = getFlag;
function isOption(option, name) {
    return option.name === name ||
        (option.aliases && option.aliases.indexOf(name) !== -1);
}
function closest(str, arr) {
    var minDistance = Infinity;
    var minIndex = 0;
    for (var i = 0; i < arr.length; i++) {
        var dist = (0, distance_ts_1.distance)(str, arr[i]);
        if (dist < minDistance) {
            minDistance = dist;
            minIndex = i;
        }
    }
    return arr[minIndex];
}
function getDefaultValue(option) {
    return typeof option["default"] === "function"
        ? option["default"]()
        : option["default"];
}
exports.getDefaultValue = getDefaultValue;
