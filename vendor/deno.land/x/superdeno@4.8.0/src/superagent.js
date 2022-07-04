"use strict";
exports.__esModule = true;
exports.superagent = void 0;
var deps_ts_1 = require("../deps.ts");
var xhrSham_js_1 = require("./xhrSham.js");
function getXHR() {
    return new xhrSham_js_1.XMLHttpRequestSham();
}
deps_ts_1.superagent.getXHR = getXHR;
exports.superagent = deps_ts_1.superagent;
