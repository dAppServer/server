"use strict";
exports.__esModule = true;
exports.generate = exports.validate = void 0;
var _common_ts_1 = require("./_common.ts");
var UUID_RE = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", "i");
function validate(id) {
    return UUID_RE.test(id);
}
exports.validate = validate;
var _nodeId;
var _clockseq;
var _lastMSecs = 0;
var _lastNSecs = 0;
function generate(options, buf, offset) {
    var i = (buf && offset) || 0;
    var b = buf || [];
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
    if (node == null || clockseq == null) {
        var seedBytes = options.random ||
            options.rng ||
            crypto.getRandomValues(new Uint8Array(16));
        if (node == null) {
            node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5],
            ];
        }
        if (clockseq == null) {
            clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 0x3fff;
        }
    }
    var msecs = options.msecs !== undefined
        ? options.msecs
        : new Date().getTime();
    var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = (clockseq + 1) & 0x3fff;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    }
    if (nsecs >= 10000) {
        throw new Error("Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 12219292800000;
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = (tl >>> 24) & 0xff;
    b[i++] = (tl >>> 16) & 0xff;
    b[i++] = (tl >>> 8) & 0xff;
    b[i++] = tl & 0xff;
    var tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    b[i++] = (tmh >>> 8) & 0xff;
    b[i++] = tmh & 0xff;
    b[i++] = ((tmh >>> 24) & 0xf) | 0x10;
    b[i++] = (tmh >>> 16) & 0xff;
    b[i++] = (clockseq >>> 8) | 0x80;
    b[i++] = clockseq & 0xff;
    for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
    }
    return buf ? buf : (0, _common_ts_1.bytesToUuid)(b);
}
exports.generate = generate;
