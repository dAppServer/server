"use strict";
exports.__esModule = true;
exports.format = exports.detect = exports.EOL = void 0;
var EOL;
(function (EOL) {
    EOL["LF"] = "\n";
    EOL["CRLF"] = "\r\n";
})(EOL = exports.EOL || (exports.EOL = {}));
var regDetect = /(?:\r?\n)/g;
function detect(content) {
    var d = content.match(regDetect);
    if (!d || d.length === 0) {
        return null;
    }
    var hasCRLF = d.some(function (x) { return x === EOL.CRLF; });
    return hasCRLF ? EOL.CRLF : EOL.LF;
}
exports.detect = detect;
function format(content, eol) {
    return content.replace(regDetect, eol);
}
exports.format = format;
