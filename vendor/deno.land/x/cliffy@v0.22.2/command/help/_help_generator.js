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
exports.HelpGenerator = void 0;
var _utils_ts_1 = require("../../flags/_utils.ts");
var table_ts_1 = require("../../table/table.ts");
var _utils_ts_2 = require("../_utils.ts");
var deps_ts_1 = require("../deps.ts");
var type_ts_1 = require("../type.ts");
var HelpGenerator = (function () {
    function HelpGenerator(cmd, options) {
        if (options === void 0) { options = {}; }
        this.cmd = cmd;
        this.indent = 2;
        this.options = __assign({ types: false, hints: true, colors: true, long: false }, options);
    }
    HelpGenerator.generate = function (cmd, options) {
        return new HelpGenerator(cmd, options).generate();
    };
    HelpGenerator.prototype.generate = function () {
        var areColorsEnabled = (0, deps_ts_1.getColorEnabled)();
        (0, deps_ts_1.setColorEnabled)(this.options.colors);
        var result = this.generateHeader() +
            this.generateMeta() +
            this.generateDescription() +
            this.generateOptions() +
            this.generateCommands() +
            this.generateEnvironmentVariables() +
            this.generateExamples();
        (0, deps_ts_1.setColorEnabled)(areColorsEnabled);
        return result;
    };
    HelpGenerator.prototype.generateHeader = function () {
        var usage = this.cmd.getUsage();
        var rows = [
            [
                (0, deps_ts_1.bold)("Usage:"),
                (0, deps_ts_1.magenta)(this.cmd.getPath() +
                    (usage ? " " + highlightArguments(usage, this.options.types) : "")),
            ],
        ];
        var version = this.cmd.getVersion();
        if (version) {
            rows.push([(0, deps_ts_1.bold)("Version:"), (0, deps_ts_1.yellow)("".concat(this.cmd.getVersion()))]);
        }
        return "\n" +
            table_ts_1.Table.from(rows)
                .indent(this.indent)
                .padding(1)
                .toString() +
            "\n";
    };
    HelpGenerator.prototype.generateMeta = function () {
        var meta = Object.entries(this.cmd.getMeta());
        if (!meta.length) {
            return "";
        }
        var rows = [];
        for (var _i = 0, meta_1 = meta; _i < meta_1.length; _i++) {
            var _a = meta_1[_i], name_1 = _a[0], value = _a[1];
            rows.push([(0, deps_ts_1.bold)("".concat(name_1, ": ")) + value]);
        }
        return "\n" +
            table_ts_1.Table.from(rows)
                .indent(this.indent)
                .padding(1)
                .toString() +
            "\n";
    };
    HelpGenerator.prototype.generateDescription = function () {
        if (!this.cmd.getDescription()) {
            return "";
        }
        return this.label("Description") +
            table_ts_1.Table.from([
                [this.cmd.getDescription()],
            ])
                .indent(this.indent * 2)
                .maxColWidth(140)
                .padding(1)
                .toString() +
            "\n";
    };
    HelpGenerator.prototype.generateOptions = function () {
        var _this = this;
        var options = this.cmd.getOptions(false);
        if (!options.length) {
            return "";
        }
        var hasTypeDefinitions = !!options.find(function (option) {
            return !!option.typeDefinition;
        });
        if (hasTypeDefinitions) {
            return this.label("Options") +
                table_ts_1.Table.from(__spreadArray([], options.map(function (option) { return [
                    option.flags.map(function (flag) { return (0, deps_ts_1.blue)(flag); }).join(", "),
                    highlightArguments(option.typeDefinition || "", _this.options.types),
                    (0, deps_ts_1.red)((0, deps_ts_1.bold)("-")),
                    _this.options.long
                        ? option.description
                        : option.description.split("\n", 1)[0],
                    _this.generateHints(option),
                ]; }), true))
                    .padding([2, 2, 1, 2])
                    .indent(this.indent * 2)
                    .maxColWidth([60, 60, 1, 80, 60])
                    .toString() +
                "\n";
        }
        return this.label("Options") +
            table_ts_1.Table.from(__spreadArray([], options.map(function (option) { return [
                option.flags.map(function (flag) { return (0, deps_ts_1.blue)(flag); }).join(", "),
                (0, deps_ts_1.red)((0, deps_ts_1.bold)("-")),
                _this.options.long
                    ? option.description
                    : option.description.split("\n", 1)[0],
                _this.generateHints(option),
            ]; }), true))
                .indent(this.indent * 2)
                .maxColWidth([60, 1, 80, 60])
                .padding([2, 1, 2])
                .toString() +
            "\n";
    };
    HelpGenerator.prototype.generateCommands = function () {
        var _this = this;
        var commands = this.cmd.getCommands(false);
        if (!commands.length) {
            return "";
        }
        var hasTypeDefinitions = !!commands.find(function (command) {
            return !!command.getArgsDefinition();
        });
        if (hasTypeDefinitions) {
            return this.label("Commands") +
                table_ts_1.Table.from(__spreadArray([], commands.map(function (command) { return [
                    __spreadArray([command.getName()], command.getAliases(), true).map(function (name) {
                        return (0, deps_ts_1.blue)(name);
                    }).join(", "),
                    highlightArguments(command.getArgsDefinition() || "", _this.options.types),
                    (0, deps_ts_1.red)((0, deps_ts_1.bold)("-")),
                    command.getShortDescription(),
                ]; }), true))
                    .indent(this.indent * 2)
                    .maxColWidth([60, 60, 1, 80])
                    .padding([2, 2, 1, 2])
                    .toString() +
                "\n";
        }
        return this.label("Commands") +
            table_ts_1.Table.from(__spreadArray([], commands.map(function (command) { return [
                __spreadArray([command.getName()], command.getAliases(), true).map(function (name) { return (0, deps_ts_1.blue)(name); })
                    .join(", "),
                (0, deps_ts_1.red)((0, deps_ts_1.bold)("-")),
                command.getShortDescription(),
            ]; }), true))
                .maxColWidth([60, 1, 80])
                .padding([2, 1, 2])
                .indent(this.indent * 2)
                .toString() +
            "\n";
    };
    HelpGenerator.prototype.generateEnvironmentVariables = function () {
        var _this = this;
        var envVars = this.cmd.getEnvVars(false);
        if (!envVars.length) {
            return "";
        }
        return this.label("Environment variables") +
            table_ts_1.Table.from(__spreadArray([], envVars.map(function (envVar) { return [
                envVar.names.map(function (name) { return (0, deps_ts_1.blue)(name); }).join(", "),
                highlightArgumentDetails(envVar.details, _this.options.types),
                (0, deps_ts_1.red)((0, deps_ts_1.bold)("-")),
                _this.options.long
                    ? envVar.description
                    : envVar.description.split("\n", 1)[0],
            ]; }), true))
                .padding([2, 2, 1])
                .indent(this.indent * 2)
                .maxColWidth([60, 60, 1, 80])
                .toString() +
            "\n";
    };
    HelpGenerator.prototype.generateExamples = function () {
        var examples = this.cmd.getExamples();
        if (!examples.length) {
            return "";
        }
        return this.label("Examples") +
            table_ts_1.Table.from(examples.map(function (example) { return [
                (0, deps_ts_1.dim)((0, deps_ts_1.bold)("".concat(capitalize(example.name), ":"))),
                example.description,
            ]; }))
                .padding(1)
                .indent(this.indent * 2)
                .maxColWidth(150)
                .toString() +
            "\n";
    };
    HelpGenerator.prototype.generateHints = function (option) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        if (!this.options.hints) {
            return "";
        }
        var hints = [];
        option.required && hints.push((0, deps_ts_1.yellow)("required"));
        typeof option["default"] !== "undefined" && hints.push((0, deps_ts_1.bold)("Default: ") + inspect(option["default"], this.options.colors));
        ((_a = option.depends) === null || _a === void 0 ? void 0 : _a.length) && hints.push((0, deps_ts_1.yellow)((0, deps_ts_1.bold)("Depends: ")) +
            (0, deps_ts_1.italic)(option.depends.map(_utils_ts_1.getFlag).join(", ")));
        ((_b = option.conflicts) === null || _b === void 0 ? void 0 : _b.length) && hints.push((0, deps_ts_1.red)((0, deps_ts_1.bold)("Conflicts: ")) +
            (0, deps_ts_1.italic)(option.conflicts.map(_utils_ts_1.getFlag).join(", ")));
        var type = (_d = this.cmd.getType((_c = option.args[0]) === null || _c === void 0 ? void 0 : _c.type)) === null || _d === void 0 ? void 0 : _d.handler;
        if (type instanceof type_ts_1.Type) {
            var possibleValues = (_e = type.values) === null || _e === void 0 ? void 0 : _e.call(type, this.cmd, this.cmd.getParent());
            if (possibleValues === null || possibleValues === void 0 ? void 0 : possibleValues.length) {
                hints.push((0, deps_ts_1.bold)("Values: ") +
                    possibleValues.map(function (value) {
                        return inspect(value, _this.options.colors);
                    }).join(", "));
            }
        }
        if (hints.length) {
            return "(".concat(hints.join(", "), ")");
        }
        return "";
    };
    HelpGenerator.prototype.label = function (label) {
        return "\n" +
            " ".repeat(this.indent) + (0, deps_ts_1.bold)("".concat(label, ":")) +
            "\n\n";
    };
    return HelpGenerator;
}());
exports.HelpGenerator = HelpGenerator;
function capitalize(string) {
    var _a;
    return (_a = (string === null || string === void 0 ? void 0 : string.charAt(0).toUpperCase()) + string.slice(1)) !== null && _a !== void 0 ? _a : "";
}
function inspect(value, colors) {
    return Deno.inspect(value, { depth: 1, colors: colors, trailingComma: false });
}
function highlightArguments(argsDefinition, types) {
    if (types === void 0) { types = true; }
    if (!argsDefinition) {
        return "";
    }
    return (0, _utils_ts_2.parseArgumentsDefinition)(argsDefinition, false, true)
        .map(function (arg) {
        return typeof arg === "string" ? arg : highlightArgumentDetails(arg, types);
    })
        .join(" ");
}
function highlightArgumentDetails(arg, types) {
    if (types === void 0) { types = true; }
    var str = "";
    str += (0, deps_ts_1.yellow)(arg.optionalValue ? "[" : "<");
    var name = "";
    name += arg.name;
    if (arg.variadic) {
        name += "...";
    }
    name = (0, deps_ts_1.magenta)(name);
    str += name;
    if (types) {
        str += (0, deps_ts_1.yellow)(":");
        str += (0, deps_ts_1.red)(arg.type);
        if (arg.list) {
            str += (0, deps_ts_1.green)("[]");
        }
    }
    str += (0, deps_ts_1.yellow)(arg.optionalValue ? "]" : ">");
    return str;
}
