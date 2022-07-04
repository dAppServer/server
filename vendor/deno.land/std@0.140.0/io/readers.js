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
exports.LimitedReader = exports.MultiReader = exports.StringReader = void 0;
var buffer_ts_1 = require("./buffer.ts");
var StringReader = (function (_super) {
    __extends(StringReader, _super);
    function StringReader(s) {
        return _super.call(this, new TextEncoder().encode(s).buffer) || this;
    }
    return StringReader;
}(buffer_ts_1.Buffer));
exports.StringReader = StringReader;
var MultiReader = (function () {
    function MultiReader(readers) {
        this.currentIndex = 0;
        this.readers = __spreadArray([], readers, true);
    }
    MultiReader.prototype.read = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var r, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = this.readers[this.currentIndex];
                        if (!r)
                            return [2, null];
                        return [4, r.read(p)];
                    case 1:
                        result = _a.sent();
                        if (result === null) {
                            this.currentIndex++;
                            return [2, 0];
                        }
                        return [2, result];
                }
            });
        });
    };
    return MultiReader;
}());
exports.MultiReader = MultiReader;
var LimitedReader = (function () {
    function LimitedReader(reader, limit) {
        this.reader = reader;
        this.limit = limit;
    }
    LimitedReader.prototype.read = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var n;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.limit <= 0) {
                            return [2, null];
                        }
                        if (p.length > this.limit) {
                            p = p.subarray(0, this.limit);
                        }
                        return [4, this.reader.read(p)];
                    case 1:
                        n = _a.sent();
                        if (n == null) {
                            return [2, null];
                        }
                        this.limit -= n;
                        return [2, n];
                }
            });
        });
    };
    return LimitedReader;
}());
exports.LimitedReader = LimitedReader;
