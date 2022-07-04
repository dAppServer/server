"use strict";
exports.__esModule = true;
function convertVariable(str) {
    if (str.match(/\'.+\'/gi) || str.match(/\".+\"/gi)) {
        return str.slice(1, str.length - 1);
    }
    else if (str === "false") {
        return false;
    }
    else if (str === "true") {
        return true;
    }
    else if (str === "null") {
        return null;
    }
    else if (Number(str) != NaN || Number(str) != undefined || Number(str) != null) {
        return Number(str);
    }
    else {
        return null;
    }
}
function parseFunc(str) {
    var obj = {};
    var lines = str.split("\n").filter(function (i) { return i != "" && !(i.startsWith(";")); });
    var reachedBlockName = "";
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var i = lines_1[_i];
        if (i.match(/\[.+\]/gi)) {
            reachedBlockName = i.slice(1, i.length - 1);
            obj[reachedBlockName] = {};
        }
        else {
            var variable = i.split("=").map(function (i) { return i.trim(); });
            obj[reachedBlockName][variable[0]] = convertVariable(variable[1]);
        }
    }
    return obj;
}
function stringifyFunc(obj) {
    var str = "";
    for (var i in obj) {
        str += "[".concat(i, "]\n");
        for (var j in obj[i]) {
            var variable = [j, obj[i][j]];
            if (typeof variable[1] === "string") {
                str += "".concat(variable[0], "=\"").concat(variable[1], "\"\n");
            }
            else {
                str += "".concat(variable[0], "=").concat(variable[1], "\n");
            }
        }
    }
    return str;
}
exports["default"] = {
    parse: parseFunc,
    stringify: stringifyFunc
};
