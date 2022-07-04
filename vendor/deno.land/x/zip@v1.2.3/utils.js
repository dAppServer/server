"use strict";
exports.__esModule = true;
exports.getFileNameFromPath = void 0;
var getFileNameFromPath = function (filePath) {
    var _a;
    return ((_a = filePath.split('/').at(-1)) === null || _a === void 0 ? void 0 : _a.split('.').slice(0, -1).join('.')) || "";
};
exports.getFileNameFromPath = getFileNameFromPath;
