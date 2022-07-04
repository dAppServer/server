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
exports.GithubProvider = void 0;
var provider_ts_1 = require("../provider.ts");
var deps_ts_1 = require("../../deps.ts");
var GithubProvider = (function (_super) {
    __extends(GithubProvider, _super);
    function GithubProvider(_a) {
        var repository = _a.repository, _b = _a.branches, branches = _b === void 0 ? true : _b, token = _a.token;
        var _this = _super.call(this) || this;
        _this.name = "github";
        _this.repositoryUrl = "https://github.com/";
        _this.registryUrl = "https://raw.githubusercontent.com/";
        _this.apiUrl = "https://api.github.com/repos/";
        _this.repositoryName = repository;
        _this.listBranches = branches;
        _this.githubToken = token;
        return _this;
    }
    GithubProvider.prototype.getVersions = function (_name) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tags, branches, tagNames, branchNames;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, Promise.all([
                            this.gitFetch("git/refs/tags"),
                            this.gitFetch("branches"),
                        ])];
                    case 1:
                        _a = _b.sent(), tags = _a[0], branches = _a[1];
                        tagNames = tags
                            .map(function (tag) { return tag.ref.replace(/^refs\/tags\//, ""); })
                            .reverse();
                        branchNames = branches
                            .sort(function (a, b) {
                            return (a.protected === b.protected) ? 0 : (a.protected ? 1 : -1);
                        })
                            .map(function (tag) {
                            return "".concat(tag.name, " ").concat(tag.protected ? "(".concat((0, deps_ts_1.bold)("Protected"), ")") : "");
                        })
                            .reverse();
                        return [2, {
                                versions: __spreadArray(__spreadArray([], tagNames, true), branchNames, true),
                                latest: tagNames[0],
                                tags: tagNames,
                                branches: branchNames
                            }];
                }
            });
        });
    };
    GithubProvider.prototype.getRepositoryUrl = function (_name) {
        return new URL("".concat(this.repositoryName, "/"), this.repositoryUrl).href;
    };
    GithubProvider.prototype.getRegistryUrl = function (_name, version) {
        return new URL("".concat(this.repositoryName, "/").concat(version, "/"), this.registryUrl).href;
    };
    GithubProvider.prototype.listVersions = function (name, currentVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tags, branches, showBranches, indent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getVersions(name)];
                    case 1:
                        _a = _b.sent(), tags = _a.tags, branches = _a.branches;
                        showBranches = !!this.listBranches && branches.length > 0;
                        indent = showBranches ? 2 : 0;
                        if (showBranches) {
                            console.log("\n" + " ".repeat(indent) + (0, deps_ts_1.bold)((0, deps_ts_1.blue)("Tags:\n")));
                        }
                        _super.prototype.printVersions.call(this, tags, currentVersion, { indent: indent });
                        if (showBranches) {
                            console.log("\n" + " ".repeat(indent) + (0, deps_ts_1.bold)((0, deps_ts_1.blue)("Branches:\n")));
                            _super.prototype.printVersions.call(this, branches, currentVersion, { maxCols: 5, indent: indent });
                            console.log();
                        }
                        return [2];
                }
            });
        });
    };
    GithubProvider.prototype.getApiUrl = function (endpoint) {
        return new URL("".concat(this.repositoryName, "/").concat(endpoint), this.apiUrl).href;
    };
    GithubProvider.prototype.gitFetch = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = new Headers({ "Content-Type": "application/json" });
                        if (this.githubToken) {
                            headers.set("Authorization", this.githubToken ? "token ".concat(this.githubToken) : "");
                        }
                        return [4, fetch(this.getApiUrl(endpoint), {
                                method: "GET",
                                cache: "default",
                                headers: headers
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.status) {
                            throw new Error("couldn't fetch versions - try again after sometime");
                        }
                        return [4, response.json()];
                    case 2:
                        data = _a.sent();
                        if (typeof data === "object" && "message" in data &&
                            "documentation_url" in data) {
                            throw new Error(data.message + " " + data.documentation_url);
                        }
                        return [2, data];
                }
            });
        });
    };
    return GithubProvider;
}(provider_ts_1.Provider));
exports.GithubProvider = GithubProvider;
