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
exports.moveSync = exports.move = void 0;
var exists_ts_1 = require("./exists.ts");
var _util_ts_1 = require("./_util.ts");
function move(src, dest, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.overwrite, overwrite = _c === void 0 ? false : _c;
    return __awaiter(this, void 0, void 0, function () {
        var srcStat;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, Deno.stat(src)];
                case 1:
                    srcStat = _d.sent();
                    if (srcStat.isDirectory && (0, _util_ts_1.isSubdir)(src, dest)) {
                        throw new Error("Cannot move '".concat(src, "' to a subdirectory of itself, '").concat(dest, "'."));
                    }
                    if (!overwrite) return [3, 5];
                    return [4, (0, exists_ts_1.exists)(dest)];
                case 2:
                    if (!_d.sent()) return [3, 4];
                    return [4, Deno.remove(dest, { recursive: true })];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4: return [3, 7];
                case 5: return [4, (0, exists_ts_1.exists)(dest)];
                case 6:
                    if (_d.sent()) {
                        throw new Error("dest already exists.");
                    }
                    _d.label = 7;
                case 7: return [4, Deno.rename(src, dest)];
                case 8:
                    _d.sent();
                    return [2];
            }
        });
    });
}
exports.move = move;
function moveSync(src, dest, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.overwrite, overwrite = _c === void 0 ? false : _c;
    var srcStat = Deno.statSync(src);
    if (srcStat.isDirectory && (0, _util_ts_1.isSubdir)(src, dest)) {
        throw new Error("Cannot move '".concat(src, "' to a subdirectory of itself, '").concat(dest, "'."));
    }
    if (overwrite) {
        if ((0, exists_ts_1.existsSync)(dest)) {
            Deno.removeSync(dest, { recursive: true });
        }
    }
    else {
        if ((0, exists_ts_1.existsSync)(dest)) {
            throw new Error("dest already exists.");
        }
    }
    Deno.renameSync(src, dest);
}
exports.moveSync = moveSync;
