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
exports.Provider = void 0;
var deps_ts_1 = require("../deps.ts");
var _errors_ts_1 = require("../_errors.ts");
var table_ts_1 = require("../../table/table.ts");
var Provider = (function () {
    function Provider() {
        this.maxListSize = 25;
        this.maxCols = 8;
    }
    Provider.prototype.isOutdated = function (name, currentVersion, targetVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, latest, versions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getVersions(name)];
                    case 1:
                        _a = _b.sent(), latest = _a.latest, versions = _a.versions;
                        if (targetVersion === "latest") {
                            targetVersion = latest;
                        }
                        if (targetVersion && !versions.includes(targetVersion)) {
                            throw new _errors_ts_1.ValidationError("The provided version ".concat((0, deps_ts_1.bold)((0, deps_ts_1.red)(targetVersion)), " is not found.\n\n    ").concat((0, deps_ts_1.cyan)("Visit ".concat((0, deps_ts_1.blue)(this.getRepositoryUrl(name)), " for available releases or run again with the ").concat(((0, deps_ts_1.yellow)("-l")), " or ").concat(((0, deps_ts_1.yellow)("--list-versions")), " command."))));
                        }
                        if (latest && latest === currentVersion && latest === targetVersion) {
                            console.warn((0, deps_ts_1.yellow)("You're already using the latest available version ".concat(currentVersion, " of ").concat(name, ".")));
                            return [2, false];
                        }
                        if (targetVersion && currentVersion === targetVersion) {
                            console.warn((0, deps_ts_1.yellow)("You're already using version ".concat(currentVersion, " of ").concat(name, ".")));
                            return [2, false];
                        }
                        return [2, true];
                }
            });
        });
    };
    Provider.prototype.upgrade = function (_a) {
        var name = _a.name, from = _a.from, to = _a.to, importMap = _a.importMap, _b = _a.main, main = _b === void 0 ? "".concat(name, ".ts") : _b, _c = _a.args, args = _c === void 0 ? [] : _c;
        return __awaiter(this, void 0, void 0, function () {
            var latest, registry, cmd, importJson, process, _d, status, stderr;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(to === "latest")) return [3, 2];
                        return [4, this.getVersions(name)];
                    case 1:
                        latest = (_e.sent()).latest;
                        to = latest;
                        _e.label = 2;
                    case 2:
                        registry = new URL(main, this.getRegistryUrl(name, to)).href;
                        cmd = [Deno.execPath(), "install"];
                        if (importMap) {
                            importJson = new URL(importMap, this.getRegistryUrl(name, to)).href;
                            cmd.push("--import-map", importJson);
                        }
                        if (args.length) {
                            cmd.push.apply(cmd, __spreadArray(__spreadArray([], args, false), ["--force", "--name", name, registry], false));
                        }
                        else {
                            cmd.push("--no-check", "--quiet", "--force", "--name", name, registry);
                        }
                        process = Deno.run({ cmd: cmd, stdout: "piped", stderr: "piped" });
                        return [4, Promise.all([
                                process.status(),
                                process.stderrOutput(),
                                process.output(),
                            ])];
                    case 3:
                        _d = _e.sent(), status = _d[0], stderr = _d[1];
                        if (!!status.success) return [3, 5];
                        process.close();
                        return [4, Deno.stderr.write(stderr)];
                    case 4:
                        _e.sent();
                        throw new Error("Failed to upgrade ".concat(name, " from ").concat(from, " to version ").concat(to, "!"));
                    case 5:
                        process.close();
                        console.info("Successfully upgraded ".concat(name, " from ").concat(from, " to version ").concat(to, "! (").concat(this.getRegistryUrl(name, to), ")"));
                        return [2];
                }
            });
        });
    };
    Provider.prototype.listVersions = function (name, currentVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var versions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getVersions(name)];
                    case 1:
                        versions = (_a.sent()).versions;
                        this.printVersions(versions, currentVersion);
                        return [2];
                }
            });
        });
    };
    Provider.prototype.printVersions = function (versions, currentVersion, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.maxCols, maxCols = _c === void 0 ? this.maxCols : _c, _d = _b.indent, indent = _d === void 0 ? 0 : _d;
        versions = versions.slice();
        if (versions === null || versions === void 0 ? void 0 : versions.length) {
            versions = versions.map(function (version) {
                return currentVersion && currentVersion === version
                    ? (0, deps_ts_1.green)("* ".concat(version))
                    : "  ".concat(version);
            });
            if (versions.length > this.maxListSize) {
                var table = new table_ts_1.Table().indent(indent);
                var rowSize = Math.ceil(versions.length / maxCols);
                var colSize = Math.min(versions.length, maxCols);
                var versionIndex = 0;
                for (var colIndex = 0; colIndex < colSize; colIndex++) {
                    for (var rowIndex = 0; rowIndex < rowSize; rowIndex++) {
                        if (!table[rowIndex]) {
                            table[rowIndex] = [];
                        }
                        table[rowIndex][colIndex] = versions[versionIndex++];
                    }
                }
                console.log(table.toString());
            }
            else {
                console.log(versions.map(function (version) { return " ".repeat(indent) + version; }).join("\n"));
            }
        }
    };
    return Provider;
}());
exports.Provider = Provider;
