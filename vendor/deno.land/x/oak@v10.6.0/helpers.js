"use strict";
exports.__esModule = true;
exports.getQuery = void 0;
var util_ts_1 = require("./util.ts");
function getQuery(ctx, _a) {
    var _b = _a === void 0 ? {} : _a, mergeParams = _b.mergeParams, asMap = _b.asMap;
    var result = {};
    if (mergeParams && (0, util_ts_1.isRouterContext)(ctx)) {
        Object.assign(result, ctx.params);
    }
    for (var _i = 0, _c = ctx.request.url.searchParams; _i < _c.length; _i++) {
        var _d = _c[_i], key = _d[0], value = _d[1];
        result[key] = value;
    }
    return asMap ? new Map(Object.entries(result)) : result;
}
exports.getQuery = getQuery;
