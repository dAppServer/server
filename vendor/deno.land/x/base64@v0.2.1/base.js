"use strict";
exports.__esModule = true;
exports.init = void 0;
function getLengths(b64) {
    var len = b64.length;
    var validLen = b64.indexOf("=");
    if (validLen === -1) {
        validLen = len;
    }
    var placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4);
    return [validLen, placeHoldersLen];
}
function init(lookup, revLookup, urlsafe) {
    if (urlsafe === void 0) { urlsafe = false; }
    function _byteLength(validLen, placeHoldersLen) {
        return Math.floor(((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen);
    }
    function tripletToBase64(num) {
        return (lookup[(num >> 18) & 0x3f] +
            lookup[(num >> 12) & 0x3f] +
            lookup[(num >> 6) & 0x3f] +
            lookup[num & 0x3f]);
    }
    function encodeChunk(buf, start, end) {
        var out = new Array((end - start) / 3);
        for (var i = start, curTriplet = 0; i < end; i += 3) {
            out[curTriplet++] = tripletToBase64((buf[i] << 16) + (buf[i + 1] << 8) + buf[i + 2]);
        }
        return out.join("");
    }
    return {
        byteLength: function (b64) {
            return _byteLength.apply(null, getLengths(b64));
        },
        toUint8Array: function (b64) {
            var _a = getLengths(b64), validLen = _a[0], placeHoldersLen = _a[1];
            var buf = new Uint8Array(_byteLength(validLen, placeHoldersLen));
            var len = placeHoldersLen ? validLen - 4 : validLen;
            var tmp;
            var curByte = 0;
            var i;
            for (i = 0; i < len; i += 4) {
                tmp = (revLookup[b64.charCodeAt(i)] << 18) |
                    (revLookup[b64.charCodeAt(i + 1)] << 12) |
                    (revLookup[b64.charCodeAt(i + 2)] << 6) |
                    revLookup[b64.charCodeAt(i + 3)];
                buf[curByte++] = (tmp >> 16) & 0xff;
                buf[curByte++] = (tmp >> 8) & 0xff;
                buf[curByte++] = tmp & 0xff;
            }
            if (placeHoldersLen === 2) {
                tmp = (revLookup[b64.charCodeAt(i)] << 2) |
                    (revLookup[b64.charCodeAt(i + 1)] >> 4);
                buf[curByte++] = tmp & 0xff;
            }
            else if (placeHoldersLen === 1) {
                tmp = (revLookup[b64.charCodeAt(i)] << 10) |
                    (revLookup[b64.charCodeAt(i + 1)] << 4) |
                    (revLookup[b64.charCodeAt(i + 2)] >> 2);
                buf[curByte++] = (tmp >> 8) & 0xff;
                buf[curByte++] = tmp & 0xff;
            }
            return buf;
        },
        fromUint8Array: function (buf) {
            var maxChunkLength = 16383;
            var len = buf.length;
            var extraBytes = len % 3;
            var len2 = len - extraBytes;
            var parts = new Array(Math.ceil(len2 / maxChunkLength) + (extraBytes ? 1 : 0));
            var curChunk = 0;
            var chunkEnd;
            for (var i = 0; i < len2; i += maxChunkLength) {
                chunkEnd = i + maxChunkLength;
                parts[curChunk++] = encodeChunk(buf, i, chunkEnd > len2 ? len2 : chunkEnd);
            }
            var tmp;
            if (extraBytes === 1) {
                tmp = buf[len2];
                parts[curChunk] = lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f];
                if (!urlsafe)
                    parts[curChunk] += "==";
            }
            else if (extraBytes === 2) {
                tmp = (buf[len2] << 8) | (buf[len2 + 1] & 0xff);
                parts[curChunk] = lookup[tmp >> 10] +
                    lookup[(tmp >> 4) & 0x3f] +
                    lookup[(tmp << 2) & 0x3f];
                if (!urlsafe)
                    parts[curChunk] += "=";
            }
            return parts.join("");
        }
    };
}
exports.init = init;
