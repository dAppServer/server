"use strict";
exports.__esModule = true;
exports.toURL = void 0;
var deps_ts_1 = require("./deps.ts");
function toURL(url) {
    if (typeof url === "string") {
        if (url.startsWith("http:") || url.startsWith("https:") ||
            url.startsWith("file:")) {
            url = new URL(url);
        }
        else {
            url = (0, deps_ts_1.toFileUrl)((0, deps_ts_1.resolve)(url));
        }
    }
    else if (url.protocol === "file:") {
        url = (0, deps_ts_1.toFileUrl)((0, deps_ts_1.resolve)((0, deps_ts_1.fromFileUrl)(url)));
    }
    return url;
}
exports.toURL = toURL;
