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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
exports.__esModule = true;
exports.MuxAsyncIterator = void 0;
var deferred_ts_1 = require("./deferred.ts");
var MuxAsyncIterator = (function () {
    function MuxAsyncIterator() {
        this.iteratorCount = 0;
        this.yields = [];
        this.throws = [];
        this.signal = (0, deferred_ts_1.deferred)();
    }
    MuxAsyncIterator.prototype.add = function (iterable) {
        ++this.iteratorCount;
        this.callIteratorNext(iterable[Symbol.asyncIterator]());
    };
    MuxAsyncIterator.prototype.callIteratorNext = function (iterator) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, value, done, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, iterator.next()];
                    case 1:
                        _a = _b.sent(), value = _a.value, done = _a.done;
                        if (done) {
                            --this.iteratorCount;
                        }
                        else {
                            this.yields.push({ iterator: iterator, value: value });
                        }
                        return [3, 3];
                    case 2:
                        e_1 = _b.sent();
                        this.throws.push(e_1);
                        return [3, 3];
                    case 3:
                        this.signal.resolve();
                        return [2];
                }
            });
        });
    };
    MuxAsyncIterator.prototype.iterate = function () {
        return __asyncGenerator(this, arguments, function iterate_1() {
            var i, _a, iterator, value, _i, _b, e;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.iteratorCount > 0)) return [3, 7];
                        return [4, __await(this.signal)];
                    case 1:
                        _c.sent();
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < this.yields.length)) return [3, 6];
                        _a = this.yields[i], iterator = _a.iterator, value = _a.value;
                        return [4, __await(value)];
                    case 3: return [4, _c.sent()];
                    case 4:
                        _c.sent();
                        this.callIteratorNext(iterator);
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3, 2];
                    case 6:
                        if (this.throws.length) {
                            for (_i = 0, _b = this.throws; _i < _b.length; _i++) {
                                e = _b[_i];
                                throw e;
                            }
                            this.throws.length = 0;
                        }
                        this.yields.length = 0;
                        this.signal = (0, deferred_ts_1.deferred)();
                        return [3, 0];
                    case 7: return [2];
                }
            });
        });
    };
    MuxAsyncIterator.prototype[Symbol.asyncIterator] = function () {
        return this.iterate();
    };
    return MuxAsyncIterator;
}());
exports.MuxAsyncIterator = MuxAsyncIterator;
