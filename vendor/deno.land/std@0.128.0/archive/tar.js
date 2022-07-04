"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _TarEntry_header, _TarEntry_reader, _TarEntry_size, _TarEntry_read, _TarEntry_consumed, _TarEntry_entrySize, _Untar_instances, _Untar_entry, _Untar_checksum, _Untar_getHeader, _Untar_getMetadata;
exports.__esModule = true;
exports.Untar = exports.Tar = void 0;
var readers_ts_1 = require("../io/readers.ts");
var buffer_ts_1 = require("../io/buffer.ts");
var assert_ts_1 = require("../_util/assert.ts");
var conversion_ts_1 = require("../streams/conversion.ts");
var recordSize = 512;
var ustar = "ustar\u000000";
var initialChecksum = 8 * 32;
function readBlock(reader, p) {
    return __awaiter(this, void 0, void 0, function () {
        var bytesRead, rr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bytesRead = 0;
                    _a.label = 1;
                case 1:
                    if (!(bytesRead < p.length)) return [3, 3];
                    return [4, reader.read(p.subarray(bytesRead))];
                case 2:
                    rr = _a.sent();
                    if (rr === null) {
                        if (bytesRead === 0) {
                            return [2, null];
                        }
                        else {
                            throw new buffer_ts_1.PartialReadError();
                        }
                    }
                    bytesRead += rr;
                    return [3, 1];
                case 3: return [2, bytesRead];
            }
        });
    });
}
var FileReader = (function () {
    function FileReader(filePath) {
        this.filePath = filePath;
    }
    FileReader.prototype.read = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.file) return [3, 2];
                        _a = this;
                        return [4, Deno.open(this.filePath, { read: true })];
                    case 1:
                        _a.file = _b.sent();
                        _b.label = 2;
                    case 2: return [4, Deno.read(this.file.rid, p)];
                    case 3:
                        res = _b.sent();
                        if (res === null) {
                            Deno.close(this.file.rid);
                            this.file = undefined;
                        }
                        return [2, res];
                }
            });
        });
    };
    return FileReader;
}());
function trim(buffer) {
    var index = buffer.findIndex(function (v) { return v === 0; });
    if (index < 0)
        return buffer;
    return buffer.subarray(0, index);
}
function clean(length) {
    var buffer = new Uint8Array(length);
    buffer.fill(0, 0, length - 1);
    return buffer;
}
function pad(num, bytes, base) {
    if (base === void 0) { base = 8; }
    var numString = num.toString(base);
    return "000000000000".substr(numString.length + 12 - bytes) + numString;
}
var FileTypes;
(function (FileTypes) {
    FileTypes[FileTypes["file"] = 0] = "file";
    FileTypes[FileTypes["link"] = 1] = "link";
    FileTypes[FileTypes["symlink"] = 2] = "symlink";
    FileTypes[FileTypes["character-device"] = 3] = "character-device";
    FileTypes[FileTypes["block-device"] = 4] = "block-device";
    FileTypes[FileTypes["directory"] = 5] = "directory";
    FileTypes[FileTypes["fifo"] = 6] = "fifo";
    FileTypes[FileTypes["contiguous-file"] = 7] = "contiguous-file";
})(FileTypes || (FileTypes = {}));
var ustarStructure = [
    {
        field: "fileName",
        length: 100
    },
    {
        field: "fileMode",
        length: 8
    },
    {
        field: "uid",
        length: 8
    },
    {
        field: "gid",
        length: 8
    },
    {
        field: "fileSize",
        length: 12
    },
    {
        field: "mtime",
        length: 12
    },
    {
        field: "checksum",
        length: 8
    },
    {
        field: "type",
        length: 1
    },
    {
        field: "linkName",
        length: 100
    },
    {
        field: "ustar",
        length: 8
    },
    {
        field: "owner",
        length: 32
    },
    {
        field: "group",
        length: 32
    },
    {
        field: "majorNumber",
        length: 8
    },
    {
        field: "minorNumber",
        length: 8
    },
    {
        field: "fileNamePrefix",
        length: 155
    },
    {
        field: "padding",
        length: 12
    },
];
function formatHeader(data) {
    var encoder = new TextEncoder(), buffer = clean(512);
    var offset = 0;
    ustarStructure.forEach(function (value) {
        var entry = encoder.encode(data[value.field] || "");
        buffer.set(entry, offset);
        offset += value.length;
    });
    return buffer;
}
function parseHeader(buffer) {
    var data = {};
    var offset = 0;
    ustarStructure.forEach(function (value) {
        var arr = buffer.subarray(offset, offset + value.length);
        data[value.field] = arr;
        offset += value.length;
    });
    return data;
}
var Tar = (function () {
    function Tar() {
        this.data = [];
    }
    Tar.prototype.append = function (fn, opts) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var fileName, fileNamePrefix, i, errMsg, info, mode, mtime, uid, gid, fileSize, type, tarData, checksum, encoder;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (typeof fn !== "string") {
                            throw new Error("file name not specified");
                        }
                        fileName = fn;
                        if (fileName.length > 100) {
                            i = fileName.length;
                            while (i >= 0) {
                                i = fileName.lastIndexOf("/", i);
                                if (i <= 155) {
                                    fileNamePrefix = fileName.substr(0, i);
                                    fileName = fileName.substr(i + 1);
                                    break;
                                }
                                i--;
                            }
                            errMsg = "ustar format does not allow a long file name (length of [file name" +
                                "prefix] + / + [file name] must be shorter than 256 bytes)";
                            if (i < 0 || fileName.length > 100) {
                                throw new Error(errMsg);
                            }
                            else {
                                (0, assert_ts_1.assert)(fileNamePrefix != null);
                                if (fileNamePrefix.length > 155) {
                                    throw new Error(errMsg);
                                }
                            }
                        }
                        opts = opts || {};
                        if (!opts.filePath) return [3, 2];
                        return [4, Deno.stat(opts.filePath)];
                    case 1:
                        info = _d.sent();
                        if (info.isDirectory) {
                            info.size = 0;
                            opts.reader = new buffer_ts_1.Buffer();
                        }
                        _d.label = 2;
                    case 2:
                        mode = opts.fileMode || (info && info.mode) ||
                            parseInt("777", 8) & 0xfff, mtime = Math.floor((_a = opts.mtime) !== null && _a !== void 0 ? _a : ((_b = info === null || info === void 0 ? void 0 : info.mtime) !== null && _b !== void 0 ? _b : new Date()).valueOf() / 1000), uid = opts.uid || 0, gid = opts.gid || 0;
                        if (typeof opts.owner === "string" && opts.owner.length >= 32) {
                            throw new Error("ustar format does not allow owner name length >= 32 bytes");
                        }
                        if (typeof opts.group === "string" && opts.group.length >= 32) {
                            throw new Error("ustar format does not allow group name length >= 32 bytes");
                        }
                        fileSize = (_c = info === null || info === void 0 ? void 0 : info.size) !== null && _c !== void 0 ? _c : opts.contentSize;
                        (0, assert_ts_1.assert)(fileSize != null, "fileSize must be set");
                        type = opts.type
                            ? FileTypes[opts.type]
                            : ((info === null || info === void 0 ? void 0 : info.isDirectory) ? FileTypes.directory : FileTypes.file);
                        tarData = {
                            fileName: fileName,
                            fileNamePrefix: fileNamePrefix,
                            fileMode: pad(mode, 7),
                            uid: pad(uid, 7),
                            gid: pad(gid, 7),
                            fileSize: pad(fileSize, 11),
                            mtime: pad(mtime, 11),
                            checksum: "        ",
                            type: type.toString(),
                            ustar: ustar,
                            owner: opts.owner || "",
                            group: opts.group || "",
                            filePath: opts.filePath,
                            reader: opts.reader
                        };
                        checksum = 0;
                        encoder = new TextEncoder();
                        Object.keys(tarData)
                            .filter(function (key) { return ["filePath", "reader"].indexOf(key) < 0; })
                            .forEach(function (key) {
                            checksum += encoder
                                .encode(tarData[key])
                                .reduce(function (p, c) { return p + c; }, 0);
                        });
                        tarData.checksum = pad(checksum, 6) + "\u0000 ";
                        this.data.push(tarData);
                        return [2];
                }
            });
        });
    };
    Tar.prototype.getReader = function () {
        var readers = [];
        this.data.forEach(function (tarData) {
            var reader = tarData.reader;
            var filePath = tarData.filePath;
            var headerArr = formatHeader(tarData);
            readers.push(new buffer_ts_1.Buffer(headerArr));
            if (!reader) {
                (0, assert_ts_1.assert)(filePath != null);
                reader = new FileReader(filePath);
            }
            readers.push(reader);
            (0, assert_ts_1.assert)(tarData.fileSize != null, "fileSize must be set");
            readers.push(new buffer_ts_1.Buffer(clean(recordSize -
                (parseInt(tarData.fileSize, 8) % recordSize || recordSize))));
        });
        readers.push(new buffer_ts_1.Buffer(clean(recordSize * 2)));
        return new (readers_ts_1.MultiReader.bind.apply(readers_ts_1.MultiReader, __spreadArray([void 0], readers, false)))();
    };
    return Tar;
}());
exports.Tar = Tar;
var TarEntry = (function () {
    function TarEntry(meta, header, reader) {
        _TarEntry_header.set(this, void 0);
        _TarEntry_reader.set(this, void 0);
        _TarEntry_size.set(this, void 0);
        _TarEntry_read.set(this, 0);
        _TarEntry_consumed.set(this, false);
        _TarEntry_entrySize.set(this, void 0);
        Object.assign(this, meta);
        __classPrivateFieldSet(this, _TarEntry_header, header, "f");
        __classPrivateFieldSet(this, _TarEntry_reader, reader, "f");
        __classPrivateFieldSet(this, _TarEntry_size, this.fileSize || 0, "f");
        var blocks = Math.ceil(__classPrivateFieldGet(this, _TarEntry_size, "f") / recordSize);
        __classPrivateFieldSet(this, _TarEntry_entrySize, blocks * recordSize, "f");
    }
    Object.defineProperty(TarEntry.prototype, "consumed", {
        get: function () {
            return __classPrivateFieldGet(this, _TarEntry_consumed, "f");
        },
        enumerable: false,
        configurable: true
    });
    TarEntry.prototype.read = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var entryBytesLeft, bufSize, block, n, bytesLeft, offset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entryBytesLeft = __classPrivateFieldGet(this, _TarEntry_entrySize, "f") - __classPrivateFieldGet(this, _TarEntry_read, "f");
                        bufSize = Math.min(p.length, entryBytesLeft);
                        if (entryBytesLeft <= 0) {
                            __classPrivateFieldSet(this, _TarEntry_consumed, true, "f");
                            return [2, null];
                        }
                        block = new Uint8Array(bufSize);
                        return [4, readBlock(__classPrivateFieldGet(this, _TarEntry_reader, "f"), block)];
                    case 1:
                        n = _a.sent();
                        bytesLeft = __classPrivateFieldGet(this, _TarEntry_size, "f") - __classPrivateFieldGet(this, _TarEntry_read, "f");
                        __classPrivateFieldSet(this, _TarEntry_read, __classPrivateFieldGet(this, _TarEntry_read, "f") + (n || 0), "f");
                        if (n === null || bytesLeft <= 0) {
                            if (n === null)
                                __classPrivateFieldSet(this, _TarEntry_consumed, true, "f");
                            return [2, null];
                        }
                        offset = bytesLeft < n ? bytesLeft : n;
                        p.set(block.subarray(0, offset), 0);
                        return [2, offset < 0 ? n - Math.abs(offset) : offset];
                }
            });
        });
    };
    TarEntry.prototype.discard = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _TarEntry_consumed, "f"))
                            return [2];
                        __classPrivateFieldSet(this, _TarEntry_consumed, true, "f");
                        if (!(typeof __classPrivateFieldGet(this, _TarEntry_reader, "f").seek === "function")) return [3, 2];
                        return [4, __classPrivateFieldGet(this, _TarEntry_reader, "f").seek(__classPrivateFieldGet(this, _TarEntry_entrySize, "f") - __classPrivateFieldGet(this, _TarEntry_read, "f"), Deno.SeekMode.Current)];
                    case 1:
                        _a.sent();
                        __classPrivateFieldSet(this, _TarEntry_read, __classPrivateFieldGet(this, _TarEntry_entrySize, "f"), "f");
                        return [3, 4];
                    case 2: return [4, (0, conversion_ts_1.readAll)(this)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    return TarEntry;
}());
_TarEntry_header = new WeakMap(), _TarEntry_reader = new WeakMap(), _TarEntry_size = new WeakMap(), _TarEntry_read = new WeakMap(), _TarEntry_consumed = new WeakMap(), _TarEntry_entrySize = new WeakMap();
var Untar = (function () {
    function Untar(reader) {
        _Untar_instances.add(this);
        _Untar_entry.set(this, void 0);
        this.reader = reader;
        this.block = new Uint8Array(recordSize);
    }
    Untar.prototype.extract = function () {
        return __awaiter(this, void 0, void 0, function () {
            var header, meta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(__classPrivateFieldGet(this, _Untar_entry, "f") && !__classPrivateFieldGet(this, _Untar_entry, "f").consumed)) return [3, 2];
                        return [4, __classPrivateFieldGet(this, _Untar_entry, "f").discard()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4, __classPrivateFieldGet(this, _Untar_instances, "m", _Untar_getHeader).call(this)];
                    case 3:
                        header = _a.sent();
                        if (header === null)
                            return [2, null];
                        meta = __classPrivateFieldGet(this, _Untar_instances, "m", _Untar_getMetadata).call(this, header);
                        __classPrivateFieldSet(this, _Untar_entry, new TarEntry(meta, header, this.reader), "f");
                        return [2, __classPrivateFieldGet(this, _Untar_entry, "f")];
                }
            });
        });
    };
    Untar.prototype[(_Untar_entry = new WeakMap(), _Untar_instances = new WeakSet(), _Untar_checksum = function _Untar_checksum(header) {
        var sum = initialChecksum;
        for (var i = 0; i < 512; i++) {
            if (i >= 148 && i < 156) {
                continue;
            }
            sum += header[i];
        }
        return sum;
    }, _Untar_getHeader = function _Untar_getHeader() {
        await readBlock(this.reader, this.block);
        var header = parseHeader(this.block);
        var decoder = new TextDecoder();
        var checksum = __classPrivateFieldGet(this, _Untar_instances, "m", _Untar_checksum).call(this, this.block);
        if (parseInt(decoder.decode(header.checksum), 8) !== checksum) {
            if (checksum === initialChecksum) {
                return null;
            }
            throw new Error("checksum error");
        }
        var magic = decoder.decode(header.ustar);
        if (magic.indexOf("ustar")) {
            throw new Error("unsupported archive format: ".concat(magic));
        }
        return header;
    }, _Untar_getMetadata = function _Untar_getMetadata(header) {
        var _a;
        var decoder = new TextDecoder();
        var meta = {
            fileName: decoder.decode(trim(header.fileName))
        };
        var fileNamePrefix = trim(header.fileNamePrefix);
        if (fileNamePrefix.byteLength > 0) {
            meta.fileName = decoder.decode(fileNamePrefix) + "/" + meta.fileName;
        }
        ["fileMode", "mtime", "uid", "gid"].forEach(function (key) {
            var arr = trim(header[key]);
            if (arr.byteLength > 0) {
                meta[key] = parseInt(decoder.decode(arr), 8);
            }
        });
        ["owner", "group", "type"].forEach(function (key) {
            var arr = trim(header[key]);
            if (arr.byteLength > 0) {
                meta[key] = decoder.decode(arr);
            }
        });
        meta.fileSize = parseInt(decoder.decode(header.fileSize), 8);
        meta.type = (_a = FileTypes[parseInt(meta.type)]) !== null && _a !== void 0 ? _a : meta.type;
        return meta;
    }, Symbol.asyncIterator)] = function () {
        return __asyncGenerator(this, arguments, function _a() {
            var entry;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!true) return [3, 6];
                        return [4, __await(this.extract())];
                    case 1:
                        entry = _b.sent();
                        if (!(entry === null)) return [3, 3];
                        return [4, __await(void 0)];
                    case 2: return [2, _b.sent()];
                    case 3: return [4, __await(entry)];
                    case 4: return [4, _b.sent()];
                    case 5:
                        _b.sent();
                        return [3, 0];
                    case 6: return [2];
                }
            });
        });
    };
    return Untar;
}());
exports.Untar = Untar;
