"use strict";
var _a, _b;
exports.__esModule = true;
exports.stripColor = exports.bgRgb24 = exports.rgb24 = exports.bgRgb8 = exports.rgb8 = exports.bgBrightWhite = exports.bgBrightCyan = exports.bgBrightMagenta = exports.bgBrightBlue = exports.bgBrightYellow = exports.bgBrightGreen = exports.bgBrightRed = exports.bgBrightBlack = exports.bgWhite = exports.bgCyan = exports.bgMagenta = exports.bgBlue = exports.bgYellow = exports.bgGreen = exports.bgRed = exports.bgBlack = exports.brightWhite = exports.brightCyan = exports.brightMagenta = exports.brightBlue = exports.brightYellow = exports.brightGreen = exports.brightRed = exports.brightBlack = exports.gray = exports.white = exports.cyan = exports.magenta = exports.blue = exports.yellow = exports.green = exports.red = exports.black = exports.strikethrough = exports.hidden = exports.inverse = exports.underline = exports.italic = exports.dim = exports.bold = exports.reset = exports.getColorEnabled = exports.setColorEnabled = void 0;
var noColor = (_b = (_a = globalThis.Deno) === null || _a === void 0 ? void 0 : _a.noColor) !== null && _b !== void 0 ? _b : true;
var enabled = !noColor;
function setColorEnabled(value) {
    if (noColor) {
        return;
    }
    enabled = value;
}
exports.setColorEnabled = setColorEnabled;
function getColorEnabled() {
    return enabled;
}
exports.getColorEnabled = getColorEnabled;
function code(open, close) {
    return {
        open: "\u001B[".concat(open.join(";"), "m"),
        close: "\u001B[".concat(close, "m"),
        regexp: new RegExp("\\x1b\\[".concat(close, "m"), "g")
    };
}
function run(str, code) {
    return enabled
        ? "".concat(code.open).concat(str.replace(code.regexp, code.open)).concat(code.close)
        : str;
}
function reset(str) {
    return run(str, code([0], 0));
}
exports.reset = reset;
function bold(str) {
    return run(str, code([1], 22));
}
exports.bold = bold;
function dim(str) {
    return run(str, code([2], 22));
}
exports.dim = dim;
function italic(str) {
    return run(str, code([3], 23));
}
exports.italic = italic;
function underline(str) {
    return run(str, code([4], 24));
}
exports.underline = underline;
function inverse(str) {
    return run(str, code([7], 27));
}
exports.inverse = inverse;
function hidden(str) {
    return run(str, code([8], 28));
}
exports.hidden = hidden;
function strikethrough(str) {
    return run(str, code([9], 29));
}
exports.strikethrough = strikethrough;
function black(str) {
    return run(str, code([30], 39));
}
exports.black = black;
function red(str) {
    return run(str, code([31], 39));
}
exports.red = red;
function green(str) {
    return run(str, code([32], 39));
}
exports.green = green;
function yellow(str) {
    return run(str, code([33], 39));
}
exports.yellow = yellow;
function blue(str) {
    return run(str, code([34], 39));
}
exports.blue = blue;
function magenta(str) {
    return run(str, code([35], 39));
}
exports.magenta = magenta;
function cyan(str) {
    return run(str, code([36], 39));
}
exports.cyan = cyan;
function white(str) {
    return run(str, code([37], 39));
}
exports.white = white;
function gray(str) {
    return brightBlack(str);
}
exports.gray = gray;
function brightBlack(str) {
    return run(str, code([90], 39));
}
exports.brightBlack = brightBlack;
function brightRed(str) {
    return run(str, code([91], 39));
}
exports.brightRed = brightRed;
function brightGreen(str) {
    return run(str, code([92], 39));
}
exports.brightGreen = brightGreen;
function brightYellow(str) {
    return run(str, code([93], 39));
}
exports.brightYellow = brightYellow;
function brightBlue(str) {
    return run(str, code([94], 39));
}
exports.brightBlue = brightBlue;
function brightMagenta(str) {
    return run(str, code([95], 39));
}
exports.brightMagenta = brightMagenta;
function brightCyan(str) {
    return run(str, code([96], 39));
}
exports.brightCyan = brightCyan;
function brightWhite(str) {
    return run(str, code([97], 39));
}
exports.brightWhite = brightWhite;
function bgBlack(str) {
    return run(str, code([40], 49));
}
exports.bgBlack = bgBlack;
function bgRed(str) {
    return run(str, code([41], 49));
}
exports.bgRed = bgRed;
function bgGreen(str) {
    return run(str, code([42], 49));
}
exports.bgGreen = bgGreen;
function bgYellow(str) {
    return run(str, code([43], 49));
}
exports.bgYellow = bgYellow;
function bgBlue(str) {
    return run(str, code([44], 49));
}
exports.bgBlue = bgBlue;
function bgMagenta(str) {
    return run(str, code([45], 49));
}
exports.bgMagenta = bgMagenta;
function bgCyan(str) {
    return run(str, code([46], 49));
}
exports.bgCyan = bgCyan;
function bgWhite(str) {
    return run(str, code([47], 49));
}
exports.bgWhite = bgWhite;
function bgBrightBlack(str) {
    return run(str, code([100], 49));
}
exports.bgBrightBlack = bgBrightBlack;
function bgBrightRed(str) {
    return run(str, code([101], 49));
}
exports.bgBrightRed = bgBrightRed;
function bgBrightGreen(str) {
    return run(str, code([102], 49));
}
exports.bgBrightGreen = bgBrightGreen;
function bgBrightYellow(str) {
    return run(str, code([103], 49));
}
exports.bgBrightYellow = bgBrightYellow;
function bgBrightBlue(str) {
    return run(str, code([104], 49));
}
exports.bgBrightBlue = bgBrightBlue;
function bgBrightMagenta(str) {
    return run(str, code([105], 49));
}
exports.bgBrightMagenta = bgBrightMagenta;
function bgBrightCyan(str) {
    return run(str, code([106], 49));
}
exports.bgBrightCyan = bgBrightCyan;
function bgBrightWhite(str) {
    return run(str, code([107], 49));
}
exports.bgBrightWhite = bgBrightWhite;
function clampAndTruncate(n, max, min) {
    if (max === void 0) { max = 255; }
    if (min === void 0) { min = 0; }
    return Math.trunc(Math.max(Math.min(n, max), min));
}
function rgb8(str, color) {
    return run(str, code([38, 5, clampAndTruncate(color)], 39));
}
exports.rgb8 = rgb8;
function bgRgb8(str, color) {
    return run(str, code([48, 5, clampAndTruncate(color)], 49));
}
exports.bgRgb8 = bgRgb8;
function rgb24(str, color) {
    if (typeof color === "number") {
        return run(str, code([38, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff], 39));
    }
    return run(str, code([
        38,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b),
    ], 39));
}
exports.rgb24 = rgb24;
function bgRgb24(str, color) {
    if (typeof color === "number") {
        return run(str, code([48, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff], 49));
    }
    return run(str, code([
        48,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b),
    ], 49));
}
exports.bgRgb24 = bgRgb24;
var ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
].join("|"), "g");
function stripColor(string) {
    return string.replace(ANSI_PATTERN, "");
}
exports.stripColor = stripColor;
