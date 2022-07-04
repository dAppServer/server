"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.makeValidationUtils = exports.hasValue = exports.getValue = exports.isStringInt = exports.resolveErrorMessages = exports.findBestMessage = exports.resolveErrorMessage = exports.flattenMessages = exports.firstMessages = exports.isOptionalValue = exports.isOptional = exports.isNullable = exports.invalid = void 0;
var required_ts_1 = require("./rules/required.ts");
var nullable_ts_1 = require("./rules/nullable.ts");
function invalid(rule, params, implicit) {
    if (params === void 0) { params = {}; }
    if (implicit === void 0) { implicit = false; }
    return { rule: rule, params: params, implicit: implicit };
}
exports.invalid = invalid;
function isNullable(rules) {
    return rules.find(function (rule) { return rule === nullable_ts_1.nullable; }) ? true : false;
}
exports.isNullable = isNullable;
function isOptional(rules) {
    return rules.find(function (rule) { return rule === required_ts_1.required; }) ? false : true;
}
exports.isOptional = isOptional;
function isOptionalValue(value) {
    return value === undefined || value === null || value === "";
}
exports.isOptionalValue = isOptionalValue;
function firstMessages(messages) {
    var results = {};
    for (var key in messages) {
        var ruleNames = Object.keys(messages[key]);
        var firstRule = ruleNames[0];
        var firstMessage = messages[key][firstRule];
        if (firstRule === "validateObject" || firstRule === "validateArray") {
            results[key] = firstMessages(firstMessage);
        }
        else {
            results[key] = firstMessage;
        }
    }
    return results;
}
exports.firstMessages = firstMessages;
function flattenMessages(messages, firstMessagesOnly) {
    if (firstMessagesOnly === void 0) { firstMessagesOnly = false; }
    var flatten = function (data, prefix) {
        if (prefix === void 0) { prefix = ""; }
        if (typeof data !== "object") {
            return {};
        }
        var results = {};
        for (var key in data) {
            var d = data[key];
            var resKey = "".concat(prefix ? prefix + "." : "").concat(key).replace(/\.validate(Array|Object)/g, "");
            if (typeof d === "object" && d !== null) {
                results = __assign(__assign({}, results), flatten(d, resKey));
            }
            else {
                results[resKey] = d;
            }
        }
        return results;
    };
    var results = __assign(__assign({}, (firstMessagesOnly ? {} : flatten(messages))), flatten(firstMessages(messages)));
    return results;
}
exports.flattenMessages = flattenMessages;
var resolveErrorMessage = function (msg, params, attr) {
    params.attr = attr;
    for (var key in params) {
        msg = msg.replace(":".concat(key), params[key]);
    }
    return msg;
};
exports.resolveErrorMessage = resolveErrorMessage;
var findBestMessage = function (messages, key, ruleName, ruleKey, defaultMessage) {
    return messages["".concat(key, ".").concat(ruleName)] || messages["".concat(key, ".").concat(ruleKey)] ||
        messages[key] ||
        messages[ruleName] || messages[ruleKey] || defaultMessage;
};
exports.findBestMessage = findBestMessage;
var resolveErrorMessages = function (rawErrors, _a) {
    var messages = _a.messages, attributes = _a.attributes;
    var errorMessages = {};
    var defaultMessage = (messages || {})["default"] || ":attr is invalid";
    for (var key in rawErrors) {
        var errs = rawErrors[key];
        var attr = (attributes || {})[key] || key;
        errorMessages[key] = {};
        for (var _i = 0, errs_1 = errs; _i < errs_1.length; _i++) {
            var err = errs_1[_i];
            var ruleKey = err.rule.replace(/\:\w+$/, "");
            if (err.rule === "validateObject" && err.params.errors) {
                errorMessages[key][ruleKey] = (0, exports.resolveErrorMessages)(err.params.errors, { messages: messages, attributes: attributes });
            }
            else if (err.rule === "validateArray" && err.params.errors) {
                errorMessages[key][ruleKey] = (0, exports.resolveErrorMessages)(err.params.errors, { messages: messages, attributes: attributes });
            }
            else {
                var msg = (0, exports.findBestMessage)(messages || {}, key, err.rule, ruleKey, defaultMessage);
                errorMessages[key][ruleKey] = (0, exports.resolveErrorMessage)(msg, err.params, attr);
            }
        }
    }
    return errorMessages;
};
exports.resolveErrorMessages = resolveErrorMessages;
var isStringInt = function (value) {
    return value.match(/^\d+$/) ? true : false;
};
exports.isStringInt = isStringInt;
var getValue = function (input, key) {
    if (typeof input[key] !== "undefined") {
        return input[key];
    }
    var paths = key.split(".");
    var value = paths.reduce(function (data, path) {
        if (data && typeof data === "object") {
            return data[path];
        }
        else if (data instanceof Array && (0, exports.isStringInt)(path)) {
            var index = parseInt(path);
            return data[index];
        }
    }, __assign({}, input));
    return value;
};
exports.getValue = getValue;
var hasValue = function (input, key) {
    var value = (0, exports.getValue)(input, key);
    return typeof value !== "undefined";
};
exports.hasValue = hasValue;
var makeValidationUtils = function (input) {
    return {
        getValue: function (key) { return (0, exports.getValue)(input, key); },
        hasValue: function (key) { return (0, exports.hasValue)(input, key); }
    };
};
exports.makeValidationUtils = makeValidationUtils;
