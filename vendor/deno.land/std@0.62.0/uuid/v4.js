"use strict";
exports.__esModule = true;
exports.generate = exports.validate = void 0;
var _common_ts_1 = require("./_common.ts");
var UUID_RE = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", "i");
function validate(id) {
    return UUID_RE.test(id);
}
exports.validate = validate;
function generate() {
    var rnds = crypto.getRandomValues(new Uint8Array(16));
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    return (0, _common_ts_1.bytesToUuid)(rnds);
}
exports.generate = generate;
