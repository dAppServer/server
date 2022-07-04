"use strict";
var _a, _b, _c;
exports.__esModule = true;
exports.NATIVE_OS = exports.isWindows = exports.CHAR_9 = exports.CHAR_0 = exports.CHAR_EQUAL = exports.CHAR_AMPERSAND = exports.CHAR_AT = exports.CHAR_GRAVE_ACCENT = exports.CHAR_CIRCUMFLEX_ACCENT = exports.CHAR_SEMICOLON = exports.CHAR_PERCENT = exports.CHAR_SINGLE_QUOTE = exports.CHAR_DOUBLE_QUOTE = exports.CHAR_PLUS = exports.CHAR_HYPHEN_MINUS = exports.CHAR_RIGHT_CURLY_BRACKET = exports.CHAR_LEFT_CURLY_BRACKET = exports.CHAR_RIGHT_ANGLE_BRACKET = exports.CHAR_LEFT_ANGLE_BRACKET = exports.CHAR_RIGHT_SQUARE_BRACKET = exports.CHAR_LEFT_SQUARE_BRACKET = exports.CHAR_ZERO_WIDTH_NOBREAK_SPACE = exports.CHAR_NO_BREAK_SPACE = exports.CHAR_SPACE = exports.CHAR_HASH = exports.CHAR_EXCLAMATION_MARK = exports.CHAR_FORM_FEED = exports.CHAR_TAB = exports.CHAR_CARRIAGE_RETURN = exports.CHAR_LINE_FEED = exports.CHAR_UNDERSCORE = exports.CHAR_QUESTION_MARK = exports.CHAR_COLON = exports.CHAR_VERTICAL_LINE = exports.CHAR_BACKWARD_SLASH = exports.CHAR_FORWARD_SLASH = exports.CHAR_DOT = exports.CHAR_LOWERCASE_Z = exports.CHAR_UPPERCASE_Z = exports.CHAR_LOWERCASE_A = exports.CHAR_UPPERCASE_A = void 0;
exports.CHAR_UPPERCASE_A = 65;
exports.CHAR_LOWERCASE_A = 97;
exports.CHAR_UPPERCASE_Z = 90;
exports.CHAR_LOWERCASE_Z = 122;
exports.CHAR_DOT = 46;
exports.CHAR_FORWARD_SLASH = 47;
exports.CHAR_BACKWARD_SLASH = 92;
exports.CHAR_VERTICAL_LINE = 124;
exports.CHAR_COLON = 58;
exports.CHAR_QUESTION_MARK = 63;
exports.CHAR_UNDERSCORE = 95;
exports.CHAR_LINE_FEED = 10;
exports.CHAR_CARRIAGE_RETURN = 13;
exports.CHAR_TAB = 9;
exports.CHAR_FORM_FEED = 12;
exports.CHAR_EXCLAMATION_MARK = 33;
exports.CHAR_HASH = 35;
exports.CHAR_SPACE = 32;
exports.CHAR_NO_BREAK_SPACE = 160;
exports.CHAR_ZERO_WIDTH_NOBREAK_SPACE = 65279;
exports.CHAR_LEFT_SQUARE_BRACKET = 91;
exports.CHAR_RIGHT_SQUARE_BRACKET = 93;
exports.CHAR_LEFT_ANGLE_BRACKET = 60;
exports.CHAR_RIGHT_ANGLE_BRACKET = 62;
exports.CHAR_LEFT_CURLY_BRACKET = 123;
exports.CHAR_RIGHT_CURLY_BRACKET = 125;
exports.CHAR_HYPHEN_MINUS = 45;
exports.CHAR_PLUS = 43;
exports.CHAR_DOUBLE_QUOTE = 34;
exports.CHAR_SINGLE_QUOTE = 39;
exports.CHAR_PERCENT = 37;
exports.CHAR_SEMICOLON = 59;
exports.CHAR_CIRCUMFLEX_ACCENT = 94;
exports.CHAR_GRAVE_ACCENT = 96;
exports.CHAR_AT = 64;
exports.CHAR_AMPERSAND = 38;
exports.CHAR_EQUAL = 61;
exports.CHAR_0 = 48;
exports.CHAR_9 = 57;
var NATIVE_OS = "linux";
exports.NATIVE_OS = NATIVE_OS;
var navigator = globalThis.navigator;
if (globalThis.Deno != null) {
    exports.NATIVE_OS = NATIVE_OS = Deno.build.os;
}
else if ((_c = (_b = (_a = navigator === null || navigator === void 0 ? void 0 : navigator.appVersion) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, "Win")) !== null && _c !== void 0 ? _c : false) {
    exports.NATIVE_OS = NATIVE_OS = "windows";
}
exports.isWindows = NATIVE_OS == "windows";
