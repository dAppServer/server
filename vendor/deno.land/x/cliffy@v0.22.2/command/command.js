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
exports.Command = void 0;
var _errors_ts_1 = require("../flags/_errors.ts");
var _errors_ts_2 = require("./_errors.ts");
var flags_ts_1 = require("../flags/flags.ts");
var _utils_ts_1 = require("./_utils.ts");
var deps_ts_1 = require("./deps.ts");
var _errors_ts_3 = require("./_errors.ts");
var boolean_ts_1 = require("./types/boolean.ts");
var number_ts_1 = require("./types/number.ts");
var string_ts_1 = require("./types/string.ts");
var type_ts_1 = require("./type.ts");
var _help_generator_ts_1 = require("./help/_help_generator.ts");
var integer_ts_1 = require("./types/integer.ts");
var _utils_ts_2 = require("../flags/_utils.ts");
var Command = (function () {
    function Command() {
        this.types = new Map();
        this.rawArgs = [];
        this.literalArgs = [];
        this._name = "COMMAND";
        this.desc = "";
        this.options = [];
        this.commands = new Map();
        this.examples = [];
        this.envVars = [];
        this.aliases = [];
        this.completions = new Map();
        this.cmd = this;
        this.isExecutable = false;
        this.throwOnError = false;
        this._allowEmpty = true;
        this._stopEarly = false;
        this._useRawArgs = false;
        this.args = [];
        this.isHidden = false;
        this.isGlobal = false;
        this.hasDefaults = false;
        this._meta = {};
    }
    Command.prototype.versionOption = function (flags, desc, opts) {
        this._versionOption = flags === false ? flags : {
            flags: flags,
            desc: desc,
            opts: typeof opts === "function" ? { action: opts } : opts
        };
        return this;
    };
    Command.prototype.helpOption = function (flags, desc, opts) {
        this._helpOption = flags === false ? flags : {
            flags: flags,
            desc: desc,
            opts: typeof opts === "function" ? { action: opts } : opts
        };
        return this;
    };
    Command.prototype.command = function (nameAndArguments, cmdOrDescription, override) {
        var result = (0, _utils_ts_1.splitArguments)(nameAndArguments);
        var name = result.flags.shift();
        var aliases = result.flags;
        if (!name) {
            throw new _errors_ts_3.MissingCommandName();
        }
        if (this.getBaseCommand(name, true)) {
            if (!override) {
                throw new _errors_ts_3.DuplicateCommandName(name);
            }
            this.removeCommand(name);
        }
        var description;
        var cmd;
        if (typeof cmdOrDescription === "string") {
            description = cmdOrDescription;
        }
        if (cmdOrDescription instanceof Command) {
            cmd = cmdOrDescription.reset();
        }
        else {
            cmd = new Command();
        }
        cmd._name = name;
        cmd._parent = this;
        if (description) {
            cmd.description(description);
        }
        if (result.typeDefinition) {
            cmd.arguments(result.typeDefinition);
        }
        aliases.forEach(function (alias) { return cmd.alias(alias); });
        this.commands.set(name, cmd);
        this.select(name);
        return this;
    };
    Command.prototype.alias = function (alias) {
        if (this.cmd._name === alias || this.cmd.aliases.includes(alias)) {
            throw new _errors_ts_3.DuplicateCommandAlias(alias);
        }
        this.cmd.aliases.push(alias);
        return this;
    };
    Command.prototype.reset = function () {
        this.cmd = this;
        return this;
    };
    Command.prototype.select = function (name) {
        var cmd = this.getBaseCommand(name, true);
        if (!cmd) {
            throw new _errors_ts_3.CommandNotFound(name, this.getBaseCommands(true));
        }
        this.cmd = cmd;
        return this;
    };
    Command.prototype.name = function (name) {
        this.cmd._name = name;
        return this;
    };
    Command.prototype.version = function (version) {
        if (typeof version === "string") {
            this.cmd.ver = function () { return version; };
        }
        else if (typeof version === "function") {
            this.cmd.ver = version;
        }
        return this;
    };
    Command.prototype.meta = function (name, value) {
        this.cmd._meta[name] = value;
        return this;
    };
    Command.prototype.getMeta = function (name) {
        return typeof name === "undefined" ? this._meta : this._meta[name];
    };
    Command.prototype.help = function (help) {
        if (typeof help === "string") {
            this.cmd._help = function () { return help; };
        }
        else if (typeof help === "function") {
            this.cmd._help = help;
        }
        else {
            this.cmd._help = function (cmd, options) {
                return _help_generator_ts_1.HelpGenerator.generate(cmd, __assign(__assign({}, help), options));
            };
        }
        return this;
    };
    Command.prototype.description = function (description) {
        this.cmd.desc = description;
        return this;
    };
    Command.prototype.usage = function (usage) {
        this.cmd._usage = usage;
        return this;
    };
    Command.prototype.hidden = function () {
        this.cmd.isHidden = true;
        return this;
    };
    Command.prototype.global = function () {
        this.cmd.isGlobal = true;
        return this;
    };
    Command.prototype.executable = function () {
        this.cmd.isExecutable = true;
        return this;
    };
    Command.prototype.arguments = function (args) {
        this.cmd.argsDefinition = args;
        return this;
    };
    Command.prototype.action = function (fn) {
        this.cmd.fn = fn;
        return this;
    };
    Command.prototype.allowEmpty = function (allowEmpty) {
        if (allowEmpty === void 0) { allowEmpty = true; }
        this.cmd._allowEmpty = allowEmpty;
        return this;
    };
    Command.prototype.stopEarly = function (stopEarly) {
        if (stopEarly === void 0) { stopEarly = true; }
        this.cmd._stopEarly = stopEarly;
        return this;
    };
    Command.prototype.useRawArgs = function (useRawArgs) {
        if (useRawArgs === void 0) { useRawArgs = true; }
        this.cmd._useRawArgs = useRawArgs;
        return this;
    };
    Command.prototype["default"] = function (name) {
        this.cmd.defaultCommand = name;
        return this;
    };
    Command.prototype.globalType = function (name, type, options) {
        return this.type(name, type, __assign(__assign({}, options), { global: true }));
    };
    Command.prototype.type = function (name, handler, options) {
        if (this.cmd.types.get(name) && !(options === null || options === void 0 ? void 0 : options.override)) {
            throw new _errors_ts_3.DuplicateType(name);
        }
        this.cmd.types.set(name, __assign(__assign({}, options), { name: name, handler: handler }));
        if (handler instanceof type_ts_1.Type &&
            (typeof handler.complete !== "undefined" ||
                typeof handler.values !== "undefined")) {
            var completeHandler = function (cmd, parent) { var _a; return ((_a = handler.complete) === null || _a === void 0 ? void 0 : _a.call(handler, cmd, parent)) || []; };
            this.complete(name, completeHandler, options);
        }
        return this;
    };
    Command.prototype.globalComplete = function (name, complete, options) {
        return this.complete(name, complete, __assign(__assign({}, options), { global: true }));
    };
    Command.prototype.complete = function (name, complete, options) {
        if (this.cmd.completions.has(name) && !(options === null || options === void 0 ? void 0 : options.override)) {
            throw new _errors_ts_3.DuplicateCompletion(name);
        }
        this.cmd.completions.set(name, __assign({ name: name, complete: complete }, options));
        return this;
    };
    Command.prototype.throwErrors = function () {
        this.cmd.throwOnError = true;
        return this;
    };
    Command.prototype.noExit = function () {
        this.cmd._shouldExit = false;
        this.throwErrors();
        return this;
    };
    Command.prototype.shouldThrowErrors = function () {
        var _a;
        return this.cmd.throwOnError || !!((_a = this.cmd._parent) === null || _a === void 0 ? void 0 : _a.shouldThrowErrors());
    };
    Command.prototype.shouldExit = function () {
        var _a, _b, _c;
        return (_c = (_a = this.cmd._shouldExit) !== null && _a !== void 0 ? _a : (_b = this.cmd._parent) === null || _b === void 0 ? void 0 : _b.shouldExit()) !== null && _c !== void 0 ? _c : true;
    };
    Command.prototype.globalOption = function (flags, desc, opts) {
        if (typeof opts === "function") {
            return this.option(flags, desc, { value: opts, global: true });
        }
        return this.option(flags, desc, __assign(__assign({}, opts), { global: true }));
    };
    Command.prototype.option = function (flags, desc, opts) {
        if (typeof opts === "function") {
            return this.option(flags, desc, { value: opts });
        }
        var result = (0, _utils_ts_1.splitArguments)(flags);
        var args = result.typeDefinition
            ? (0, _utils_ts_1.parseArgumentsDefinition)(result.typeDefinition)
            : [];
        var option = __assign(__assign({}, opts), { name: "", description: desc, args: args, flags: result.flags, typeDefinition: result.typeDefinition });
        if (option.separator) {
            for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                var arg = args_1[_i];
                if (arg.list) {
                    arg.separator = option.separator;
                }
            }
        }
        for (var _a = 0, _b = option.flags; _a < _b.length; _a++) {
            var part = _b[_a];
            var arg = part.trim();
            var isLong = /^--/.test(arg);
            var name_1 = isLong ? arg.slice(2) : arg.slice(1);
            if (this.cmd.getBaseOption(name_1, true)) {
                if (opts === null || opts === void 0 ? void 0 : opts.override) {
                    this.removeOption(name_1);
                }
                else {
                    throw new _errors_ts_3.DuplicateOptionName(name_1);
                }
            }
            if (!option.name && isLong) {
                option.name = name_1;
            }
            else if (!option.aliases) {
                option.aliases = [name_1];
            }
            else {
                option.aliases.push(name_1);
            }
        }
        if (option.prepend) {
            this.cmd.options.unshift(option);
        }
        else {
            this.cmd.options.push(option);
        }
        return this;
    };
    Command.prototype.example = function (name, description) {
        if (this.cmd.hasExample(name)) {
            throw new _errors_ts_3.DuplicateExample(name);
        }
        this.cmd.examples.push({ name: name, description: description });
        return this;
    };
    Command.prototype.globalEnv = function (name, description, options) {
        return this.env(name, description, __assign(__assign({}, options), { global: true }));
    };
    Command.prototype.env = function (name, description, options) {
        var _this = this;
        var result = (0, _utils_ts_1.splitArguments)(name);
        if (!result.typeDefinition) {
            result.typeDefinition = "<value:boolean>";
        }
        if (result.flags.some(function (envName) { return _this.cmd.getBaseEnvVar(envName, true); })) {
            throw new _errors_ts_3.DuplicateEnvironmentVariable(name);
        }
        var details = (0, _utils_ts_1.parseArgumentsDefinition)(result.typeDefinition);
        if (details.length > 1) {
            throw new _errors_ts_3.EnvironmentVariableSingleValue(name);
        }
        else if (details.length && details[0].optionalValue) {
            throw new _errors_ts_3.EnvironmentVariableOptionalValue(name);
        }
        else if (details.length && details[0].variadic) {
            throw new _errors_ts_3.EnvironmentVariableVariadicValue(name);
        }
        this.cmd.envVars.push(__assign({ name: result.flags[0], names: result.flags, description: description, type: details[0].type, details: details.shift() }, options));
        return this;
    };
    Command.prototype.parse = function (args) {
        if (args === void 0) { args = Deno.args; }
        return __awaiter(this, void 0, void 0, function () {
            var subCommand, env, _a, actionOption, flags, unknown, literal, env, options, params, error_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, , 12]);
                        this.reset();
                        this.registerDefaults();
                        this.rawArgs = args;
                        if (args.length > 0) {
                            subCommand = this.getCommand(args[0], true);
                            if (subCommand) {
                                subCommand._globalParent = this;
                                return [2, subCommand.parse(this.rawArgs.slice(1))];
                            }
                        }
                        if (!this.isExecutable) return [3, 2];
                        return [4, this.executeExecutable(this.rawArgs)];
                    case 1:
                        _c.sent();
                        return [2, {
                                options: {},
                                args: [],
                                cmd: this,
                                literal: []
                            }];
                    case 2:
                        if (!this._useRawArgs) return [3, 5];
                        return [4, this.parseEnvVars()];
                    case 3:
                        env = _c.sent();
                        return [4, this.execute.apply(this, __spreadArray([env], this.rawArgs, false))];
                    case 4: return [2, _c.sent()];
                    case 5:
                        _a = this.parseFlags(this.rawArgs), actionOption = _a.actionOption, flags = _a.flags, unknown = _a.unknown, literal = _a.literal;
                        this.literalArgs = literal;
                        return [4, this.parseEnvVars()];
                    case 6:
                        env = _c.sent();
                        options = __assign(__assign({}, env), flags);
                        params = this.parseArguments(unknown, options);
                        if (!actionOption) return [3, 8];
                        return [4, (_b = actionOption.action).call.apply(_b, __spreadArray([this, options], params, false))];
                    case 7:
                        _c.sent();
                        if (actionOption.standalone) {
                            return [2, {
                                    options: options,
                                    args: params,
                                    cmd: this,
                                    literal: this.literalArgs
                                }];
                        }
                        _c.label = 8;
                    case 8: return [4, this.execute.apply(this, __spreadArray([options], params, false))];
                    case 9: return [2, _c.sent()];
                    case 10: return [3, 12];
                    case 11:
                        error_1 = _c.sent();
                        if (error_1 instanceof Error) {
                            throw this.error(error_1);
                        }
                        else {
                            throw this.error(new Error("[non-error-thrown] ".concat(error_1)));
                        }
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    Command.prototype.registerDefaults = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.hasDefaults || this.getParent()) {
            return this;
        }
        this.hasDefaults = true;
        this.reset();
        !this.types.has("string") &&
            this.type("string", new string_ts_1.StringType(), { global: true });
        !this.types.has("number") &&
            this.type("number", new number_ts_1.NumberType(), { global: true });
        !this.types.has("integer") &&
            this.type("integer", new integer_ts_1.IntegerType(), { global: true });
        !this.types.has("boolean") &&
            this.type("boolean", new boolean_ts_1.BooleanType(), { global: true });
        if (!this._help) {
            this.help({
                hints: true,
                types: false
            });
        }
        if (this._versionOption !== false && (this._versionOption || this.ver)) {
            this.option(((_a = this._versionOption) === null || _a === void 0 ? void 0 : _a.flags) || "-V, --version", ((_b = this._versionOption) === null || _b === void 0 ? void 0 : _b.desc) ||
                "Show the version number for this program.", __assign({ standalone: true, prepend: true, action: function () {
                    this.showVersion();
                    this.exit();
                } }, ((_d = (_c = this._versionOption) === null || _c === void 0 ? void 0 : _c.opts) !== null && _d !== void 0 ? _d : {})));
        }
        if (this._helpOption !== false) {
            this.option(((_e = this._helpOption) === null || _e === void 0 ? void 0 : _e.flags) || "-h, --help", ((_f = this._helpOption) === null || _f === void 0 ? void 0 : _f.desc) || "Show this help.", __assign({ standalone: true, global: true, prepend: true, action: function () {
                    this.showHelp({
                        long: this.getRawArgs().includes("--".concat(helpOption_1.name))
                    });
                    this.exit();
                } }, ((_h = (_g = this._helpOption) === null || _g === void 0 ? void 0 : _g.opts) !== null && _h !== void 0 ? _h : {})));
            var helpOption_1 = this.options[0];
        }
        return this;
    };
    Command.prototype.execute = function (options) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var cmd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.fn) return [3, 2];
                        return [4, this.fn.apply(this, __spreadArray([options], args, false))];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        if (!this.defaultCommand) return [3, 4];
                        cmd = this.getCommand(this.defaultCommand, true);
                        if (!cmd) {
                            throw new _errors_ts_3.DefaultCommandNotFound(this.defaultCommand, this.getCommands());
                        }
                        cmd._globalParent = this;
                        return [4, cmd.execute.apply(cmd, __spreadArray([options], args, false))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2, { options: options, args: args, cmd: this, literal: this.literalArgs }];
                }
            });
        });
    };
    Command.prototype.executeExecutable = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var command, process, status_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.getPath().replace(/\s+/g, "-");
                        return [4, Deno.permissions.request({ name: "run", command: command })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        process = Deno.run({
                            cmd: __spreadArray([command], args, true)
                        });
                        return [4, process.status()];
                    case 3:
                        status_1 = _a.sent();
                        if (!status_1.success) {
                            Deno.exit(status_1.code);
                        }
                        return [3, 5];
                    case 4:
                        error_2 = _a.sent();
                        if (error_2 instanceof Deno.errors.NotFound) {
                            throw new _errors_ts_3.CommandExecutableNotFound(command);
                        }
                        throw error_2;
                    case 5: return [2];
                }
            });
        });
    };
    Command.prototype.parseFlags = function (args) {
        var _this = this;
        try {
            var actionOption_1;
            var result = (0, flags_ts_1.parseFlags)(args, {
                stopEarly: this._stopEarly,
                allowEmpty: this._allowEmpty,
                flags: this.getOptions(true),
                parse: function (type) { return _this.parseType(type); },
                option: function (option) {
                    if (!actionOption_1 && option.action) {
                        actionOption_1 = option;
                    }
                }
            });
            return __assign(__assign({}, result), { actionOption: actionOption_1 });
        }
        catch (error) {
            if (error instanceof _errors_ts_1.ValidationError) {
                throw new _errors_ts_3.ValidationError(error.message);
            }
            throw error;
        }
    };
    Command.prototype.parseType = function (type) {
        var typeSettings = this.getType(type.type);
        if (!typeSettings) {
            throw new _errors_ts_1.UnknownType(type.type, this.getTypes().map(function (type) { return type.name; }));
        }
        return typeSettings.handler instanceof type_ts_1.Type
            ? typeSettings.handler.parse(type)
            : typeSettings.handler(type);
    };
    Command.prototype.parseEnvVars = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var envVars, result, hasEnvPermissions, _i, envVars_1, env, name_2, propertyName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        envVars = this.getEnvVars(true);
                        result = {};
                        if (!envVars.length) {
                            return [2, result];
                        }
                        return [4, Deno.permissions.query({
                                name: "env"
                            })];
                    case 1:
                        hasEnvPermissions = (_b.sent()).state === "granted";
                        for (_i = 0, envVars_1 = envVars; _i < envVars_1.length; _i++) {
                            env = envVars_1[_i];
                            name_2 = hasEnvPermissions && env.names.find(function (name) { return !!Deno.env.get(name); });
                            if (name_2) {
                                propertyName = (0, _utils_ts_2.underscoreToCamelCase)(env.prefix
                                    ? env.names[0].replace(new RegExp("^".concat(env.prefix)), "")
                                    : env.names[0]);
                                result[propertyName] = this.parseType({
                                    label: "Environment variable",
                                    type: env.type,
                                    name: name_2,
                                    value: (_a = Deno.env.get(name_2)) !== null && _a !== void 0 ? _a : ""
                                });
                                if (env.value && typeof result[propertyName] !== "undefined") {
                                    result[propertyName] = env.value(result[propertyName]);
                                }
                            }
                            else if (env.required) {
                                throw new _errors_ts_2.MissingRequiredEnvVar(env);
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    Command.prototype.parseArguments = function (args, flags) {
        var _this = this;
        var params = [];
        args = args.slice(0);
        if (!this.hasArguments()) {
            if (args.length) {
                if (this.hasCommands(true)) {
                    throw new _errors_ts_3.UnknownCommand(args[0], this.getCommands());
                }
                else {
                    throw new _errors_ts_3.NoArgumentsAllowed(this.getPath());
                }
            }
        }
        else {
            if (!args.length) {
                var required = this.getArguments()
                    .filter(function (expectedArg) { return !expectedArg.optionalValue; })
                    .map(function (expectedArg) { return expectedArg.name; });
                if (required.length) {
                    var flagNames = Object.keys(flags);
                    var hasStandaloneOption = !!flagNames.find(function (name) { var _a; return (_a = _this.getOption(name, true)) === null || _a === void 0 ? void 0 : _a.standalone; });
                    if (!hasStandaloneOption) {
                        throw new _errors_ts_3.MissingArguments(required);
                    }
                }
            }
            else {
                var _loop_1 = function (expectedArg) {
                    if (!args.length) {
                        if (expectedArg.optionalValue) {
                            return "break";
                        }
                        throw new _errors_ts_3.MissingArgument("Missing argument: ".concat(expectedArg.name));
                    }
                    var arg = void 0;
                    if (expectedArg.variadic) {
                        arg = args.splice(0, args.length)
                            .map(function (value) {
                            return _this.parseType({
                                label: "Argument",
                                type: expectedArg.type,
                                name: expectedArg.name,
                                value: value
                            });
                        });
                    }
                    else {
                        arg = this_1.parseType({
                            label: "Argument",
                            type: expectedArg.type,
                            name: expectedArg.name,
                            value: args.shift()
                        });
                    }
                    if (typeof arg !== "undefined") {
                        params.push(arg);
                    }
                };
                var this_1 = this;
                for (var _i = 0, _a = this.getArguments(); _i < _a.length; _i++) {
                    var expectedArg = _a[_i];
                    var state_1 = _loop_1(expectedArg);
                    if (state_1 === "break")
                        break;
                }
                if (args.length) {
                    throw new _errors_ts_3.TooManyArguments(args);
                }
            }
        }
        return params;
    };
    Command.prototype.error = function (error) {
        if (this.shouldThrowErrors() || !(error instanceof _errors_ts_3.ValidationError)) {
            return error;
        }
        this.showHelp();
        console.error((0, deps_ts_1.red)("  ".concat((0, deps_ts_1.bold)("error"), ": ").concat(error.message, "\n")));
        Deno.exit(error instanceof _errors_ts_3.ValidationError ? error.exitCode : 1);
    };
    Command.prototype.getName = function () {
        return this._name;
    };
    Command.prototype.getParent = function () {
        return this._parent;
    };
    Command.prototype.getGlobalParent = function () {
        return this._globalParent;
    };
    Command.prototype.getMainCommand = function () {
        var _a, _b;
        return (_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.getMainCommand()) !== null && _b !== void 0 ? _b : this;
    };
    Command.prototype.getAliases = function () {
        return this.aliases;
    };
    Command.prototype.getPath = function () {
        return this._parent
            ? this._parent.getPath() + " " + this._name
            : this._name;
    };
    Command.prototype.getArgsDefinition = function () {
        return this.argsDefinition;
    };
    Command.prototype.getArgument = function (name) {
        return this.getArguments().find(function (arg) { return arg.name === name; });
    };
    Command.prototype.getArguments = function () {
        if (!this.args.length && this.argsDefinition) {
            this.args = (0, _utils_ts_1.parseArgumentsDefinition)(this.argsDefinition);
        }
        return this.args;
    };
    Command.prototype.hasArguments = function () {
        return !!this.argsDefinition;
    };
    Command.prototype.getVersion = function () {
        var _a;
        return (_a = this.getVersionHandler()) === null || _a === void 0 ? void 0 : _a.call(this, this);
    };
    Command.prototype.getVersionHandler = function () {
        var _a, _b;
        return (_a = this.ver) !== null && _a !== void 0 ? _a : (_b = this._parent) === null || _b === void 0 ? void 0 : _b.getVersionHandler();
    };
    Command.prototype.getDescription = function () {
        return typeof this.desc === "function"
            ? this.desc = this.desc()
            : this.desc;
    };
    Command.prototype.getUsage = function () {
        var _a;
        return (_a = this._usage) !== null && _a !== void 0 ? _a : this.getArgsDefinition();
    };
    Command.prototype.getShortDescription = function () {
        return this.getDescription()
            .trim()
            .split("\n", 1)[0];
    };
    Command.prototype.getRawArgs = function () {
        return this.rawArgs;
    };
    Command.prototype.getLiteralArgs = function () {
        return this.literalArgs;
    };
    Command.prototype.showVersion = function () {
        console.log(this.getVersion());
    };
    Command.prototype.showHelp = function (options) {
        console.log(this.getHelp(options));
    };
    Command.prototype.getHelp = function (options) {
        this.registerDefaults();
        return this.getHelpHandler().call(this, this, options !== null && options !== void 0 ? options : {});
    };
    Command.prototype.getHelpHandler = function () {
        var _a, _b;
        return (_a = this._help) !== null && _a !== void 0 ? _a : (_b = this._parent) === null || _b === void 0 ? void 0 : _b.getHelpHandler();
    };
    Command.prototype.exit = function (code) {
        if (code === void 0) { code = 0; }
        if (this.shouldExit()) {
            Deno.exit(code);
        }
    };
    Command.prototype.hasOptions = function (hidden) {
        return this.getOptions(hidden).length > 0;
    };
    Command.prototype.getOptions = function (hidden) {
        return this.getGlobalOptions(hidden).concat(this.getBaseOptions(hidden));
    };
    Command.prototype.getBaseOptions = function (hidden) {
        if (!this.options.length) {
            return [];
        }
        return hidden
            ? this.options.slice(0)
            : this.options.filter(function (opt) { return !opt.hidden; });
    };
    Command.prototype.getGlobalOptions = function (hidden) {
        var _this = this;
        var getOptions = function (cmd, options, names) {
            if (options === void 0) { options = []; }
            if (names === void 0) { names = []; }
            if (cmd) {
                if (cmd.options.length) {
                    cmd.options.forEach(function (option) {
                        if (option.global &&
                            !_this.options.find(function (opt) { return opt.name === option.name; }) &&
                            names.indexOf(option.name) === -1 &&
                            (hidden || !option.hidden)) {
                            names.push(option.name);
                            options.push(option);
                        }
                    });
                }
                return getOptions(cmd._parent, options, names);
            }
            return options;
        };
        return getOptions(this._parent);
    };
    Command.prototype.hasOption = function (name, hidden) {
        return !!this.getOption(name, hidden);
    };
    Command.prototype.getOption = function (name, hidden) {
        var _a;
        return (_a = this.getBaseOption(name, hidden)) !== null && _a !== void 0 ? _a : this.getGlobalOption(name, hidden);
    };
    Command.prototype.getBaseOption = function (name, hidden) {
        var option = this.options.find(function (option) { return option.name === name; });
        return option && (hidden || !option.hidden) ? option : undefined;
    };
    Command.prototype.getGlobalOption = function (name, hidden) {
        if (!this._parent) {
            return;
        }
        var option = this._parent.getBaseOption(name, hidden);
        if (!option || !option.global) {
            return this._parent.getGlobalOption(name, hidden);
        }
        return option;
    };
    Command.prototype.removeOption = function (name) {
        var index = this.options.findIndex(function (option) { return option.name === name; });
        if (index === -1) {
            return;
        }
        return this.options.splice(index, 1)[0];
    };
    Command.prototype.hasCommands = function (hidden) {
        return this.getCommands(hidden).length > 0;
    };
    Command.prototype.getCommands = function (hidden) {
        return this.getGlobalCommands(hidden).concat(this.getBaseCommands(hidden));
    };
    Command.prototype.getBaseCommands = function (hidden) {
        var commands = Array.from(this.commands.values());
        return hidden ? commands : commands.filter(function (cmd) { return !cmd.isHidden; });
    };
    Command.prototype.getGlobalCommands = function (hidden) {
        var _this = this;
        var getCommands = function (cmd, commands, names) {
            if (commands === void 0) { commands = []; }
            if (names === void 0) { names = []; }
            if (cmd) {
                if (cmd.commands.size) {
                    cmd.commands.forEach(function (cmd) {
                        if (cmd.isGlobal &&
                            _this !== cmd &&
                            !_this.commands.has(cmd._name) &&
                            names.indexOf(cmd._name) === -1 &&
                            (hidden || !cmd.isHidden)) {
                            names.push(cmd._name);
                            commands.push(cmd);
                        }
                    });
                }
                return getCommands(cmd._parent, commands, names);
            }
            return commands;
        };
        return getCommands(this._parent);
    };
    Command.prototype.hasCommand = function (name, hidden) {
        return !!this.getCommand(name, hidden);
    };
    Command.prototype.getCommand = function (name, hidden) {
        var _a;
        return (_a = this.getBaseCommand(name, hidden)) !== null && _a !== void 0 ? _a : this.getGlobalCommand(name, hidden);
    };
    Command.prototype.getBaseCommand = function (name, hidden) {
        for (var _i = 0, _a = this.commands.values(); _i < _a.length; _i++) {
            var cmd = _a[_i];
            if (cmd._name === name || cmd.aliases.includes(name)) {
                return (cmd && (hidden || !cmd.isHidden) ? cmd : undefined);
            }
        }
    };
    Command.prototype.getGlobalCommand = function (name, hidden) {
        if (!this._parent) {
            return;
        }
        var cmd = this._parent.getBaseCommand(name, hidden);
        if (!(cmd === null || cmd === void 0 ? void 0 : cmd.isGlobal)) {
            return this._parent.getGlobalCommand(name, hidden);
        }
        return cmd;
    };
    Command.prototype.removeCommand = function (name) {
        var command = this.getBaseCommand(name, true);
        if (command) {
            this.commands["delete"](command._name);
        }
        return command;
    };
    Command.prototype.getTypes = function () {
        return this.getGlobalTypes().concat(this.getBaseTypes());
    };
    Command.prototype.getBaseTypes = function () {
        return Array.from(this.types.values());
    };
    Command.prototype.getGlobalTypes = function () {
        var _this = this;
        var getTypes = function (cmd, types, names) {
            if (types === void 0) { types = []; }
            if (names === void 0) { names = []; }
            if (cmd) {
                if (cmd.types.size) {
                    cmd.types.forEach(function (type) {
                        if (type.global &&
                            !_this.types.has(type.name) &&
                            names.indexOf(type.name) === -1) {
                            names.push(type.name);
                            types.push(type);
                        }
                    });
                }
                return getTypes(cmd._parent, types, names);
            }
            return types;
        };
        return getTypes(this._parent);
    };
    Command.prototype.getType = function (name) {
        var _a;
        return (_a = this.getBaseType(name)) !== null && _a !== void 0 ? _a : this.getGlobalType(name);
    };
    Command.prototype.getBaseType = function (name) {
        return this.types.get(name);
    };
    Command.prototype.getGlobalType = function (name) {
        if (!this._parent) {
            return;
        }
        var cmd = this._parent.getBaseType(name);
        if (!(cmd === null || cmd === void 0 ? void 0 : cmd.global)) {
            return this._parent.getGlobalType(name);
        }
        return cmd;
    };
    Command.prototype.getCompletions = function () {
        return this.getGlobalCompletions().concat(this.getBaseCompletions());
    };
    Command.prototype.getBaseCompletions = function () {
        return Array.from(this.completions.values());
    };
    Command.prototype.getGlobalCompletions = function () {
        var _this = this;
        var getCompletions = function (cmd, completions, names) {
            if (completions === void 0) { completions = []; }
            if (names === void 0) { names = []; }
            if (cmd) {
                if (cmd.completions.size) {
                    cmd.completions.forEach(function (completion) {
                        if (completion.global &&
                            !_this.completions.has(completion.name) &&
                            names.indexOf(completion.name) === -1) {
                            names.push(completion.name);
                            completions.push(completion);
                        }
                    });
                }
                return getCompletions(cmd._parent, completions, names);
            }
            return completions;
        };
        return getCompletions(this._parent);
    };
    Command.prototype.getCompletion = function (name) {
        var _a;
        return (_a = this.getBaseCompletion(name)) !== null && _a !== void 0 ? _a : this.getGlobalCompletion(name);
    };
    Command.prototype.getBaseCompletion = function (name) {
        return this.completions.get(name);
    };
    Command.prototype.getGlobalCompletion = function (name) {
        if (!this._parent) {
            return;
        }
        var completion = this._parent.getBaseCompletion(name);
        if (!(completion === null || completion === void 0 ? void 0 : completion.global)) {
            return this._parent.getGlobalCompletion(name);
        }
        return completion;
    };
    Command.prototype.hasEnvVars = function (hidden) {
        return this.getEnvVars(hidden).length > 0;
    };
    Command.prototype.getEnvVars = function (hidden) {
        return this.getGlobalEnvVars(hidden).concat(this.getBaseEnvVars(hidden));
    };
    Command.prototype.getBaseEnvVars = function (hidden) {
        if (!this.envVars.length) {
            return [];
        }
        return hidden
            ? this.envVars.slice(0)
            : this.envVars.filter(function (env) { return !env.hidden; });
    };
    Command.prototype.getGlobalEnvVars = function (hidden) {
        var _this = this;
        var getEnvVars = function (cmd, envVars, names) {
            if (envVars === void 0) { envVars = []; }
            if (names === void 0) { names = []; }
            if (cmd) {
                if (cmd.envVars.length) {
                    cmd.envVars.forEach(function (envVar) {
                        if (envVar.global &&
                            !_this.envVars.find(function (env) { return env.names[0] === envVar.names[0]; }) &&
                            names.indexOf(envVar.names[0]) === -1 &&
                            (hidden || !envVar.hidden)) {
                            names.push(envVar.names[0]);
                            envVars.push(envVar);
                        }
                    });
                }
                return getEnvVars(cmd._parent, envVars, names);
            }
            return envVars;
        };
        return getEnvVars(this._parent);
    };
    Command.prototype.hasEnvVar = function (name, hidden) {
        return !!this.getEnvVar(name, hidden);
    };
    Command.prototype.getEnvVar = function (name, hidden) {
        var _a;
        return (_a = this.getBaseEnvVar(name, hidden)) !== null && _a !== void 0 ? _a : this.getGlobalEnvVar(name, hidden);
    };
    Command.prototype.getBaseEnvVar = function (name, hidden) {
        var envVar = this.envVars.find(function (env) {
            return env.names.indexOf(name) !== -1;
        });
        return envVar && (hidden || !envVar.hidden) ? envVar : undefined;
    };
    Command.prototype.getGlobalEnvVar = function (name, hidden) {
        if (!this._parent) {
            return;
        }
        var envVar = this._parent.getBaseEnvVar(name, hidden);
        if (!(envVar === null || envVar === void 0 ? void 0 : envVar.global)) {
            return this._parent.getGlobalEnvVar(name, hidden);
        }
        return envVar;
    };
    Command.prototype.hasExamples = function () {
        return this.examples.length > 0;
    };
    Command.prototype.getExamples = function () {
        return this.examples;
    };
    Command.prototype.hasExample = function (name) {
        return !!this.getExample(name);
    };
    Command.prototype.getExample = function (name) {
        return this.examples.find(function (example) { return example.name === name; });
    };
    return Command;
}());
exports.Command = Command;
