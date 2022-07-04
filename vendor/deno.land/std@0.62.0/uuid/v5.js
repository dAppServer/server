"use strict";
exports.__esModule = true;
exports.generate = exports.validate = void 0;
var _common_ts_1 = require("./_common.ts");
var sha1_ts_1 = require("../hash/sha1.ts");
var util_ts_1 = require("../node/util.ts");
var assert_ts_1 = require("../_util/assert.ts");
var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function validate(id) {
    return UUID_RE.test(id);
}
exports.validate = validate;
function generate(options, buf, offset) {
    var i = (buf && offset) || 0;
    var value = options.value, namespace = options.namespace;
    if ((0, util_ts_1.isString)(value))
        value = (0, _common_ts_1.stringToBytes)(value);
    if ((0, util_ts_1.isString)(namespace))
        namespace = (0, _common_ts_1.uuidToBytes)(namespace);
    (0, assert_ts_1.assert)(namespace.length === 16, "namespace must be uuid string or an Array of 16 byte values");
    var content = namespace.concat(value);
    var bytes = new sha1_ts_1.Sha1().update((0, _common_ts_1.createBuffer)(content)).digest();
    bytes[6] = (bytes[6] & 0x0f) | 0x50;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    if (buf) {
        for (var idx = 0; idx < 16; ++idx) {
            buf[i + idx] = bytes[idx];
        }
    }
    return buf || (0, _common_ts_1.bytesToUuid)(bytes);
}
exports.generate = generate;
