"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.validate = exports.validateData = exports.validateValue = void 0;
var utils_ts_1 = require("./utils.ts");
var messages_ts_1 = require("./messages.ts");
var getValue = function (input, key) {
    return input[key];
};
var validateValue = function (value, rules, utils) { return __awaiter(void 0, void 0, void 0, function () {
    var results, _i, rules_1, rule, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((0, utils_ts_1.isOptionalValue)(value) && (0, utils_ts_1.isOptional)(rules)) {
                    return [2, []];
                }
                if (typeof value === "object" && value === null && (0, utils_ts_1.isNullable)(rules)) {
                    return [2, []];
                }
                results = [];
                _i = 0, rules_1 = rules;
                _a.label = 1;
            case 1:
                if (!(_i < rules_1.length)) return [3, 5];
                rule = rules_1[_i];
                res = rule(value, utils);
                if (!(res instanceof Promise)) return [3, 3];
                return [4, res];
            case 2:
                res = _a.sent();
                _a.label = 3;
            case 3:
                if (res !== undefined) {
                    results.push(res);
                    if (res.implicit === true) {
                        return [3, 5];
                    }
                }
                _a.label = 4;
            case 4:
                _i++;
                return [3, 1];
            case 5: return [2, results];
        }
    });
}); };
exports.validateValue = validateValue;
var validateData = function (input, rules) { return __awaiter(void 0, void 0, void 0, function () {
    var results, utils, _a, _b, _i, key, keyRules, value, errors;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                results = {};
                utils = (0, utils_ts_1.makeValidationUtils)(input);
                _a = [];
                for (_b in rules)
                    _a.push(_b);
                _i = 0;
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3, 4];
                key = _a[_i];
                keyRules = (rules[key] instanceof Array
                    ? rules[key]
                    : [rules[key]]);
                value = getValue(input, key);
                return [4, (0, exports.validateValue)(value, keyRules, utils)];
            case 2:
                errors = _c.sent();
                if (errors.length) {
                    results[key] = errors;
                }
                _c.label = 3;
            case 3:
                _i++;
                return [3, 1];
            case 4: return [2, results];
        }
    });
}); };
exports.validateData = validateData;
var validate = function (input, rules, options) {
    if (options === void 0) { options = {
        messages: messages_ts_1.defaultMessages
    }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var rawErrors, passes, errors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, exports.validateData)(input, rules)];
                case 1:
                    rawErrors = _a.sent();
                    passes = Object.keys(rawErrors).length === 0;
                    errors = passes ? {} : (0, utils_ts_1.resolveErrorMessages)(rawErrors, options);
                    return [2, [passes, errors]];
            }
        });
    });
};
exports.validate = validate;
