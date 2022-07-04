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
exports.tee = void 0;
var noop = function () { };
var AsyncIterableClone = (function () {
    function AsyncIterableClone() {
        var _this = this;
        this.resolveCurrent = noop;
        this.consume = noop;
        this.currentPromise = new Promise(function (resolve) {
            _this.resolveCurrent = resolve;
        });
        this.consumed = new Promise(function (resolve) {
            _this.consume = resolve;
        });
    }
    AsyncIterableClone.prototype.reset = function () {
        var _this = this;
        this.currentPromise = new Promise(function (resolve) {
            _this.resolveCurrent = resolve;
        });
        this.consumed = new Promise(function (resolve) {
            _this.consume = resolve;
        });
    };
    AsyncIterableClone.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.currentPromise];
                    case 1:
                        res = _a.sent();
                        this.consume();
                        this.reset();
                        return [2, res];
                }
            });
        });
    };
    AsyncIterableClone.prototype.push = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.resolveCurrent(res);
                        return [4, this.consumed];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AsyncIterableClone.prototype[Symbol.asyncIterator] = function () {
        return this;
    };
    return AsyncIterableClone;
}());
function tee(src, n) {
    var _this = this;
    if (n === void 0) { n = 2; }
    var clones = Array.from({ length: n }).map(function () { return new AsyncIterableClone(); });
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var iter, _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iter = src[Symbol.asyncIterator]();
                    return [4, Promise.resolve()];
                case 1:
                    _a.sent();
                    _loop_1 = function () {
                        var res;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    res = iter.next();
                                    return [4, Promise.all(clones.map(function (c) { return c.push(res); }))];
                                case 1:
                                    _b.sent();
                                    return [4, res];
                                case 2:
                                    if ((_b.sent()).done) {
                                        return [2, "break"];
                                    }
                                    return [2];
                            }
                        });
                    };
                    _a.label = 2;
                case 2:
                    if (!true) return [3, 4];
                    return [5, _loop_1()];
                case 3:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3, 4];
                    return [3, 2];
                case 4: return [2];
            }
        });
    }); })()["catch"](function (e) {
        console.error(e);
    });
    return clones;
}
exports.tee = tee;
