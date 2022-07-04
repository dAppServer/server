"use strict";
exports.__esModule = true;
exports.getFileInfoType = exports.isSubdir = void 0;
var path = require("../path/mod.ts");
function isSubdir(src, dest, sep) {
    if (sep === void 0) { sep = path.sep; }
    if (src === dest) {
        return false;
    }
    var srcArray = src.split(sep);
    var destArray = dest.split(sep);
    return srcArray.every(function (current, i) { return destArray[i] === current; });
}
exports.isSubdir = isSubdir;
function getFileInfoType(fileInfo) {
    return fileInfo.isFile
        ? "file"
        : fileInfo.isDirectory
            ? "dir"
            : fileInfo.isSymlink
                ? "symlink"
                : undefined;
}
exports.getFileInfoType = getFileInfoType;
