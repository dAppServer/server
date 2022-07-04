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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KeyStack_instances, _KeyStack_cryptoKeys, _KeyStack_keys, _KeyStack_toCryptoKey;
exports.__esModule = true;
exports.KeyStack = void 0;
var tssCompare_ts_1 = require("./tssCompare.ts");
var util_ts_1 = require("./util.ts");
var KeyStack = (function () {
    function KeyStack(keys) {
        _KeyStack_instances.add(this);
        _KeyStack_cryptoKeys.set(this, new Map());
        _KeyStack_keys.set(this, void 0);
        if (!(0 in keys)) {
            throw new TypeError("keys must contain at least one value");
        }
        __classPrivateFieldSet(this, _KeyStack_keys, keys, "f");
    }
    Object.defineProperty(KeyStack.prototype, "length", {
        get: function () {
            return __classPrivateFieldGet(this, _KeyStack_keys, "f").length;
        },
        enumerable: false,
        configurable: true
    });
    KeyStack.prototype.sign = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var key, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, __classPrivateFieldGet(this, _KeyStack_instances, "m", _KeyStack_toCryptoKey).call(this, __classPrivateFieldGet(this, _KeyStack_keys, "f")[0])];
                    case 1:
                        key = _b.sent();
                        _a = util_ts_1.encodeBase64Safe;
                        return [4, (0, util_ts_1.sign)(data, key)];
                    case 2: return [2, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    KeyStack.prototype.verify = function (data, digest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.indexOf(data, digest)];
                    case 1: return [2, (_a.sent()) > -1];
                }
            });
        });
    };
    KeyStack.prototype.indexOf = function (data, digest) {
        return __awaiter(this, void 0, void 0, function () {
            var i, cryptoKey, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(i < __classPrivateFieldGet(this, _KeyStack_keys, "f").length)) return [3, 6];
                        return [4, __classPrivateFieldGet(this, _KeyStack_instances, "m", _KeyStack_toCryptoKey).call(this, __classPrivateFieldGet(this, _KeyStack_keys, "f")[i])];
                    case 2:
                        cryptoKey = _d.sent();
                        _a = tssCompare_ts_1.compare;
                        _b = [digest];
                        _c = util_ts_1.encodeBase64Safe;
                        return [4, (0, util_ts_1.sign)(data, cryptoKey)];
                    case 3: return [4, _a.apply(void 0, _b.concat([_c.apply(void 0, [_d.sent()])]))];
                    case 4:
                        if (_d.sent()) {
                            return [2, i];
                        }
                        _d.label = 5;
                    case 5:
                        i++;
                        return [3, 1];
                    case 6: return [2, -1];
                }
            });
        });
    };
    KeyStack.prototype[(_KeyStack_cryptoKeys = new WeakMap(), _KeyStack_keys = new WeakMap(), _KeyStack_instances = new WeakSet(), _KeyStack_toCryptoKey = async function _KeyStack_toCryptoKey(key) {
        if (!__classPrivateFieldGet(this, _KeyStack_cryptoKeys, "f").has(key)) {
            __classPrivateFieldGet(this, _KeyStack_cryptoKeys, "f").set(key, await (0, util_ts_1.importKey)(key));
        }
        return __classPrivateFieldGet(this, _KeyStack_cryptoKeys, "f").get(key);
    }, Symbol["for"]("Deno.customInspect"))] = function (inspect) {
        var length = this.length;
        return "".concat(this.constructor.name, " ").concat(inspect({ length: length }));
    };
    KeyStack.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        var length = this.length;
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({ length: length }, newOptions));
    };
    return KeyStack;
}());
exports.KeyStack = KeyStack;
