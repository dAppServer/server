"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ERR_EVAL_ESM_CANNOT_PRINT = exports.ERR_ENCODING_NOT_SUPPORTED = exports.errorMap = exports.ERR_ENCODING_INVALID_ENCODED_DATA = exports.ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE = exports.ERR_DOMAIN_CALLBACK_NOT_AVAILABLE = exports.ERR_DNS_SET_SERVERS_FAILED = exports.ERR_DIR_CONCURRENT_OPERATION = exports.ERR_DIR_CLOSED = exports.ERR_CRYPTO_SIGN_KEY_REQUIRED = exports.ERR_CRYPTO_SCRYPT_NOT_SUPPORTED = exports.ERR_CRYPTO_SCRYPT_INVALID_PARAMETER = exports.ERR_CRYPTO_PBKDF2_ERROR = exports.ERR_CRYPTO_INVALID_STATE = exports.ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE = exports.ERR_CRYPTO_INVALID_DIGEST = exports.ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS = exports.ERR_CRYPTO_INCOMPATIBLE_KEY = exports.ERR_CRYPTO_HASH_UPDATE_FAILED = exports.ERR_CRYPTO_HASH_FINALIZED = exports.ERR_CRYPTO_FIPS_UNAVAILABLE = exports.ERR_CRYPTO_FIPS_FORCED = exports.ERR_CRYPTO_ENGINE_UNKNOWN = exports.ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY = exports.ERR_CRYPTO_ECDH_INVALID_FORMAT = exports.ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED = exports.ERR_CPU_USAGE = exports.ERR_CONTEXT_NOT_INITIALIZED = exports.ERR_CONSOLE_WRITABLE_STREAM = exports.ERR_CHILD_PROCESS_STDIO_MAXBUFFER = exports.ERR_CHILD_PROCESS_IPC_REQUIRED = exports.ERR_CHILD_CLOSED_BEFORE_REPLY = exports.ERR_CANNOT_WATCH_SIGINT = exports.ERR_BUFFER_TOO_LARGE = exports.ERR_BUFFER_OUT_OF_BOUNDS = exports.ERR_BROTLI_INVALID_PARAM = exports.ERR_ASYNC_TYPE = exports.ERR_ASYNC_CALLBACK = exports.ERR_ASSERTION = exports.ERR_ARG_NOT_ITERABLE = exports.ERR_AMBIGUOUS_ARGUMENT = exports.ERR_OUT_OF_RANGE = exports.ERR_INVALID_ARG_VALUE = exports.ERR_INVALID_ARG_TYPE = exports.NodeURIError = exports.NodeTypeError = exports.NodeRangeError = exports.NodeSyntaxError = exports.NodeError = exports.NodeErrorAbstraction = void 0;
exports.ERR_HTTP_TRAILER_INVALID = exports.ERR_HTTP_SOCKET_ENCODING = exports.ERR_HTTP_INVALID_STATUS_CODE = exports.ERR_HTTP_INVALID_HEADER_VALUE = exports.ERR_HTTP_HEADERS_SENT = exports.ERR_HTTP2_UNSUPPORTED_PROTOCOL = exports.ERR_HTTP2_TRAILERS_NOT_READY = exports.ERR_HTTP2_TRAILERS_ALREADY_SENT = exports.ERR_HTTP2_STREAM_SELF_DEPENDENCY = exports.ERR_HTTP2_STREAM_ERROR = exports.ERR_HTTP2_STATUS_INVALID = exports.ERR_HTTP2_STATUS_101 = exports.ERR_HTTP2_SOCKET_UNBOUND = exports.ERR_HTTP2_SOCKET_BOUND = exports.ERR_HTTP2_SETTINGS_CANCEL = exports.ERR_HTTP2_SESSION_ERROR = exports.ERR_HTTP2_SEND_FILE_NOSEEK = exports.ERR_HTTP2_SEND_FILE = exports.ERR_HTTP2_PUSH_DISABLED = exports.ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED = exports.ERR_HTTP2_PING_LENGTH = exports.ERR_HTTP2_PING_CANCEL = exports.ERR_HTTP2_PAYLOAD_FORBIDDEN = exports.ERR_HTTP2_OUT_OF_STREAMS = exports.ERR_HTTP2_ORIGIN_LENGTH = exports.ERR_HTTP2_NO_SOCKET_MANIPULATION = exports.ERR_HTTP2_NESTED_PUSH = exports.ERR_HTTP2_MAX_PENDING_SETTINGS_ACK = exports.ERR_HTTP2_INVALID_STREAM = exports.ERR_HTTP2_INVALID_SESSION = exports.ERR_HTTP2_INVALID_PSEUDOHEADER = exports.ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH = exports.ERR_HTTP2_INVALID_ORIGIN = exports.ERR_HTTP2_INVALID_INFO_STATUS = exports.ERR_HTTP2_INVALID_HEADER_VALUE = exports.ERR_HTTP2_INVALID_CONNECTION_HEADERS = exports.ERR_HTTP2_INFO_STATUS_NOT_ALLOWED = exports.ERR_HTTP2_HEADER_SINGLE_VALUE = exports.ERR_HTTP2_HEADERS_SENT = exports.ERR_HTTP2_HEADERS_AFTER_RESPOND = exports.ERR_HTTP2_GOAWAY_SESSION = exports.ERR_HTTP2_CONNECT_SCHEME = exports.ERR_HTTP2_CONNECT_PATH = exports.ERR_HTTP2_CONNECT_AUTHORITY = exports.ERR_HTTP2_ALTSVC_LENGTH = exports.ERR_HTTP2_ALTSVC_INVALID_ORIGIN = exports.ERR_FS_INVALID_SYMLINK_TYPE = exports.ERR_FS_FILE_TOO_LARGE = exports.ERR_FEATURE_UNAVAILABLE_ON_PLATFORM = exports.ERR_EVENT_RECURSION = void 0;
exports.ERR_QUICCLIENTSESSION_FAILED = exports.ERR_NO_ICU = exports.ERR_NO_CRYPTO = exports.ERR_NAPI_INVALID_TYPEDARRAY_LENGTH = exports.ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT = exports.ERR_NAPI_INVALID_DATAVIEW_ARGS = exports.ERR_NAPI_CONS_FUNCTION = exports.ERR_MULTIPLE_CALLBACK = exports.ERR_MISSING_OPTION = exports.ERR_MISSING_ARGS = exports.ERR_METHOD_NOT_IMPLEMENTED = exports.ERR_MANIFEST_UNKNOWN_ONERROR = exports.ERR_MANIFEST_TDZ = exports.ERR_MANIFEST_INVALID_RESOURCE_FIELD = exports.ERR_MANIFEST_INTEGRITY_MISMATCH = exports.ERR_MANIFEST_DEPENDENCY_MISSING = exports.ERR_IPC_SYNC_FORK = exports.ERR_IPC_ONE_PIPE = exports.ERR_IPC_DISCONNECTED = exports.ERR_IPC_CHANNEL_CLOSED = exports.ERR_INVALID_URI = exports.ERR_INVALID_TUPLE = exports.ERR_INVALID_THIS = exports.ERR_INVALID_SYNC_FORK_INPUT = exports.ERR_INVALID_REPL_INPUT = exports.ERR_INVALID_REPL_EVAL_CONFIG = exports.ERR_INVALID_PROTOCOL = exports.ERR_INVALID_PERFORMANCE_MARK = exports.ERR_INVALID_OPT_VALUE_ENCODING = exports.ERR_INVALID_IP_ADDRESS = exports.ERR_INVALID_HTTP_TOKEN = exports.ERR_INVALID_HANDLE_TYPE = exports.ERR_INVALID_FILE_URL_PATH = exports.ERR_INVALID_FILE_URL_HOST = exports.ERR_INVALID_FD_TYPE = exports.ERR_INVALID_FD = exports.ERR_INVALID_CURSOR_POS = exports.ERR_INVALID_CALLBACK = exports.ERR_INVALID_BUFFER_SIZE = exports.ERR_INVALID_ASYNC_ID = exports.ERR_INSPECTOR_NOT_WORKER = exports.ERR_INSPECTOR_NOT_CONNECTED = exports.ERR_INSPECTOR_NOT_AVAILABLE = exports.ERR_INSPECTOR_NOT_ACTIVE = exports.ERR_INSPECTOR_COMMAND = exports.ERR_INSPECTOR_CLOSED = exports.ERR_INSPECTOR_ALREADY_CONNECTED = exports.ERR_INSPECTOR_ALREADY_ACTIVATED = exports.ERR_INPUT_TYPE_NOT_ALLOWED = exports.ERR_INCOMPATIBLE_OPTION_PAIR = void 0;
exports.ERR_UNKNOWN_BUILTIN_MODULE = exports.ERR_UNESCAPED_CHARACTERS = exports.ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET = exports.ERR_UNAVAILABLE_DURING_EXIT = exports.ERR_TRACE_EVENTS_UNAVAILABLE = exports.ERR_TRACE_EVENTS_CATEGORY_REQUIRED = exports.ERR_TLS_SNI_FROM_SERVER = exports.ERR_TLS_SESSION_ATTACK = exports.ERR_TLS_REQUIRED_SERVER_NAME = exports.ERR_TLS_RENEGOTIATION_DISABLED = exports.ERR_TLS_PROTOCOL_VERSION_CONFLICT = exports.ERR_TLS_INVALID_PROTOCOL_VERSION = exports.ERR_TLS_INVALID_STATE = exports.ERR_TLS_INVALID_CONTEXT = exports.ERR_TLS_HANDSHAKE_TIMEOUT = exports.ERR_TLS_DH_PARAM_SIZE = exports.ERR_SYNTHETIC = exports.ERR_STREAM_WRITE_AFTER_END = exports.ERR_STREAM_WRAP = exports.ERR_STREAM_UNSHIFT_AFTER_END_EVENT = exports.ERR_STREAM_PUSH_AFTER_EOF = exports.ERR_STREAM_PREMATURE_CLOSE = exports.ERR_STREAM_NULL_VALUES = exports.ERR_STREAM_DESTROYED = exports.ERR_STREAM_CANNOT_PIPE = exports.ERR_STREAM_ALREADY_FINISHED = exports.ERR_SRI_PARSE = exports.ERR_SOCKET_DGRAM_NOT_RUNNING = exports.ERR_SOCKET_DGRAM_NOT_CONNECTED = exports.ERR_SOCKET_DGRAM_IS_CONNECTED = exports.ERR_SOCKET_CLOSED = exports.ERR_SOCKET_BAD_TYPE = exports.ERR_SOCKET_BAD_BUFFER_SIZE = exports.ERR_SOCKET_ALREADY_BOUND = exports.ERR_SERVER_NOT_RUNNING = exports.ERR_SERVER_ALREADY_LISTEN = exports.ERR_SCRIPT_EXECUTION_INTERRUPTED = exports.ERR_QUIC_TLS13_REQUIRED = exports.ERR_QUICSTREAM_UNSUPPORTED_PUSH = exports.ERR_QUICSTREAM_OPEN_FAILED = exports.ERR_QUICSTREAM_INVALID_PUSH = exports.ERR_QUICSTREAM_DESTROYED = exports.ERR_QUICSOCKET_UNBOUND = exports.ERR_QUICSOCKET_LISTENING = exports.ERR_QUICSOCKET_INVALID_STATELESS_RESET_SECRET_LENGTH = exports.ERR_QUICSOCKET_DESTROYED = exports.ERR_QUICSESSION_UPDATEKEY = exports.ERR_QUICSESSION_INVALID_DCID = exports.ERR_QUICSESSION_DESTROYED = exports.ERR_QUICCLIENTSESSION_FAILED_SETSOCKET = void 0;
exports.ERR_INVALID_URL = exports.ERR_INVALID_RETURN_VALUE = exports.ERR_INVALID_RETURN_PROPERTY_VALUE = exports.ERR_INVALID_RETURN_PROPERTY = exports.ERR_INVALID_OPT_VALUE = exports.ERR_INVALID_CHAR = exports.ERR_INVALID_ADDRESS_FAMILY = exports.ERR_HTTP2_STREAM_CANCEL = exports.ERR_HTTP2_INVALID_SETTING_VALUE = exports.ERR_FALSY_VALUE_REJECTION = exports.ERR_ZLIB_INITIALIZATION_FAILED = exports.ERR_WORKER_UNSUPPORTED_OPERATION = exports.ERR_WORKER_UNSUPPORTED_EXTENSION = exports.ERR_WORKER_UNSERIALIZABLE_ERROR = exports.ERR_WORKER_OUT_OF_MEMORY = exports.ERR_WORKER_NOT_RUNNING = exports.ERR_WORKER_INIT_FAILED = exports.ERR_WASI_ALREADY_STARTED = exports.ERR_VM_MODULE_STATUS = exports.ERR_VM_MODULE_NOT_MODULE = exports.ERR_VM_MODULE_LINKING_ERRORED = exports.ERR_VM_MODULE_DIFFERENT_CONTEXT = exports.ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA = exports.ERR_VM_MODULE_ALREADY_LINKED = exports.ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING = exports.ERR_VALID_PERFORMANCE_ENTRY_TYPE = exports.ERR_V8BREAKITERATOR = exports.ERR_UNSUPPORTED_ESM_URL_SCHEME = exports.ERR_UNSUPPORTED_DIR_IMPORT = exports.ERR_UNKNOWN_SIGNAL = exports.ERR_UNKNOWN_MODULE_FORMAT = exports.ERR_UNKNOWN_FILE_EXTENSION = exports.ERR_UNKNOWN_ENCODING = exports.ERR_UNKNOWN_CREDENTIAL = void 0;
var asserts_ts_1 = require("../testing/asserts.ts");
var os_ts_1 = require("../_util/os.ts");
var util_ts_1 = require("./util.ts");
var classRegExp = /^([A-Z][a-z0-9]*)+$/;
var kTypes = [
    "string",
    "function",
    "number",
    "object",
    "Function",
    "Object",
    "boolean",
    "bigint",
    "symbol",
];
var NodeErrorAbstraction = (function (_super) {
    __extends(NodeErrorAbstraction, _super);
    function NodeErrorAbstraction(name, code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.name = name;
        _this.stack = _this.stack && "".concat(name, " [").concat(_this.code, "]").concat(_this.stack.slice(20));
        return _this;
    }
    NodeErrorAbstraction.prototype.toString = function () {
        return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    };
    return NodeErrorAbstraction;
}(Error));
exports.NodeErrorAbstraction = NodeErrorAbstraction;
var NodeError = (function (_super) {
    __extends(NodeError, _super);
    function NodeError(code, message) {
        return _super.call(this, Error.prototype.name, code, message) || this;
    }
    return NodeError;
}(NodeErrorAbstraction));
exports.NodeError = NodeError;
var NodeSyntaxError = (function (_super) {
    __extends(NodeSyntaxError, _super);
    function NodeSyntaxError(code, message) {
        var _this = _super.call(this, SyntaxError.prototype.name, code, message) || this;
        Object.setPrototypeOf(_this, SyntaxError.prototype);
        return _this;
    }
    return NodeSyntaxError;
}(NodeErrorAbstraction));
exports.NodeSyntaxError = NodeSyntaxError;
var NodeRangeError = (function (_super) {
    __extends(NodeRangeError, _super);
    function NodeRangeError(code, message) {
        var _this = _super.call(this, RangeError.prototype.name, code, message) || this;
        Object.setPrototypeOf(_this, RangeError.prototype);
        return _this;
    }
    return NodeRangeError;
}(NodeErrorAbstraction));
exports.NodeRangeError = NodeRangeError;
var NodeTypeError = (function (_super) {
    __extends(NodeTypeError, _super);
    function NodeTypeError(code, message) {
        var _this = _super.call(this, TypeError.prototype.name, code, message) || this;
        Object.setPrototypeOf(_this, TypeError.prototype);
        return _this;
    }
    return NodeTypeError;
}(NodeErrorAbstraction));
exports.NodeTypeError = NodeTypeError;
var NodeURIError = (function (_super) {
    __extends(NodeURIError, _super);
    function NodeURIError(code, message) {
        var _this = _super.call(this, URIError.prototype.name, code, message) || this;
        Object.setPrototypeOf(_this, URIError.prototype);
        return _this;
    }
    return NodeURIError;
}(NodeErrorAbstraction));
exports.NodeURIError = NodeURIError;
var ERR_INVALID_ARG_TYPE = (function (_super) {
    __extends(ERR_INVALID_ARG_TYPE, _super);
    function ERR_INVALID_ARG_TYPE(name, expected, actual) {
        expected = Array.isArray(expected) ? expected : [expected];
        var msg = "The ";
        if (name.endsWith(" argument")) {
            msg += "".concat(name, " ");
        }
        else {
            var type = name.includes(".") ? "property" : "argument";
            msg += "\"".concat(name, "\" ").concat(type, " ");
        }
        msg += "must be ";
        var types = [];
        var instances = [];
        var other = [];
        for (var _i = 0, expected_1 = expected; _i < expected_1.length; _i++) {
            var value = expected_1[_i];
            if (kTypes.includes(value)) {
                types.push(value.toLocaleLowerCase());
            }
            else if (classRegExp.test(value)) {
                instances.push(value);
            }
            else {
                other.push(value);
            }
        }
        if (instances.length > 0) {
            var pos = types.indexOf("object");
            if (pos !== -1) {
                types.splice(pos, 1);
                instances.push("Object");
            }
        }
        if (types.length > 0) {
            if (types.length > 2) {
                var last = types.pop();
                msg += "one of type ".concat(types.join(", "), ", or ").concat(last);
            }
            else if (types.length === 2) {
                msg += "one of type ".concat(types[0], " or ").concat(types[1]);
            }
            else {
                msg += "of type ".concat(types[0]);
            }
            if (instances.length > 0 || other.length > 0) {
                msg += " or ";
            }
        }
        if (instances.length > 0) {
            if (instances.length > 2) {
                var last = instances.pop();
                msg += "an instance of ".concat(instances.join(", "), ", or ").concat(last);
            }
            else {
                msg += "an instance of ".concat(instances[0]);
                if (instances.length === 2) {
                    msg += " or ".concat(instances[1]);
                }
            }
            if (other.length > 0) {
                msg += " or ";
            }
        }
        if (other.length > 0) {
            if (other.length > 2) {
                var last = other.pop();
                msg += "one of ".concat(other.join(", "), ", or ").concat(last);
            }
            else if (other.length === 2) {
                msg += "one of ".concat(other[0], " or ").concat(other[1]);
            }
            else {
                if (other[0].toLowerCase() !== other[0]) {
                    msg += "an ";
                }
                msg += "".concat(other[0]);
            }
        }
        return _super.call(this, "ERR_INVALID_ARG_TYPE", "".concat(msg, ".").concat(invalidArgTypeHelper(actual))) || this;
    }
    return ERR_INVALID_ARG_TYPE;
}(NodeTypeError));
exports.ERR_INVALID_ARG_TYPE = ERR_INVALID_ARG_TYPE;
var ERR_INVALID_ARG_VALUE = (function (_super) {
    __extends(ERR_INVALID_ARG_VALUE, _super);
    function ERR_INVALID_ARG_VALUE(name, value, reason) {
        return _super.call(this, "ERR_INVALID_ARG_VALUE", "The argument '".concat(name, "' ").concat(reason, ". Received ").concat((0, util_ts_1.inspect)(value))) || this;
    }
    return ERR_INVALID_ARG_VALUE;
}(NodeTypeError));
exports.ERR_INVALID_ARG_VALUE = ERR_INVALID_ARG_VALUE;
function invalidArgTypeHelper(input) {
    if (input == null) {
        return " Received ".concat(input);
    }
    if (typeof input === "function" && input.name) {
        return " Received function ".concat(input.name);
    }
    if (typeof input === "object") {
        if (input.constructor && input.constructor.name) {
            return " Received an instance of ".concat(input.constructor.name);
        }
        return " Received ".concat((0, util_ts_1.inspect)(input, { depth: -1 }));
    }
    var inspected = (0, util_ts_1.inspect)(input, { colors: false });
    if (inspected.length > 25) {
        inspected = "".concat(inspected.slice(0, 25), "...");
    }
    return " Received type ".concat(typeof input, " (").concat(inspected, ")");
}
var ERR_OUT_OF_RANGE = (function (_super) {
    __extends(ERR_OUT_OF_RANGE, _super);
    function ERR_OUT_OF_RANGE(str, range, received) {
        var _this = _super.call(this, "The value of \"".concat(str, "\" is out of range. It must be ").concat(range, ". Received ").concat(received)) || this;
        _this.code = "ERR_OUT_OF_RANGE";
        var name = _this.name;
        _this.name = "".concat(name, " [").concat(_this.code, "]");
        _this.stack;
        _this.name = name;
        return _this;
    }
    return ERR_OUT_OF_RANGE;
}(RangeError));
exports.ERR_OUT_OF_RANGE = ERR_OUT_OF_RANGE;
var ERR_AMBIGUOUS_ARGUMENT = (function (_super) {
    __extends(ERR_AMBIGUOUS_ARGUMENT, _super);
    function ERR_AMBIGUOUS_ARGUMENT(x, y) {
        return _super.call(this, "ERR_AMBIGUOUS_ARGUMENT", "The \"".concat(x, "\" argument is ambiguous. ").concat(y)) || this;
    }
    return ERR_AMBIGUOUS_ARGUMENT;
}(NodeTypeError));
exports.ERR_AMBIGUOUS_ARGUMENT = ERR_AMBIGUOUS_ARGUMENT;
var ERR_ARG_NOT_ITERABLE = (function (_super) {
    __extends(ERR_ARG_NOT_ITERABLE, _super);
    function ERR_ARG_NOT_ITERABLE(x) {
        return _super.call(this, "ERR_ARG_NOT_ITERABLE", "".concat(x, " must be iterable")) || this;
    }
    return ERR_ARG_NOT_ITERABLE;
}(NodeTypeError));
exports.ERR_ARG_NOT_ITERABLE = ERR_ARG_NOT_ITERABLE;
var ERR_ASSERTION = (function (_super) {
    __extends(ERR_ASSERTION, _super);
    function ERR_ASSERTION(x) {
        return _super.call(this, "ERR_ASSERTION", "".concat(x)) || this;
    }
    return ERR_ASSERTION;
}(NodeError));
exports.ERR_ASSERTION = ERR_ASSERTION;
var ERR_ASYNC_CALLBACK = (function (_super) {
    __extends(ERR_ASYNC_CALLBACK, _super);
    function ERR_ASYNC_CALLBACK(x) {
        return _super.call(this, "ERR_ASYNC_CALLBACK", "".concat(x, " must be a function")) || this;
    }
    return ERR_ASYNC_CALLBACK;
}(NodeTypeError));
exports.ERR_ASYNC_CALLBACK = ERR_ASYNC_CALLBACK;
var ERR_ASYNC_TYPE = (function (_super) {
    __extends(ERR_ASYNC_TYPE, _super);
    function ERR_ASYNC_TYPE(x) {
        return _super.call(this, "ERR_ASYNC_TYPE", "Invalid name for async \"type\": ".concat(x)) || this;
    }
    return ERR_ASYNC_TYPE;
}(NodeTypeError));
exports.ERR_ASYNC_TYPE = ERR_ASYNC_TYPE;
var ERR_BROTLI_INVALID_PARAM = (function (_super) {
    __extends(ERR_BROTLI_INVALID_PARAM, _super);
    function ERR_BROTLI_INVALID_PARAM(x) {
        return _super.call(this, "ERR_BROTLI_INVALID_PARAM", "".concat(x, " is not a valid Brotli parameter")) || this;
    }
    return ERR_BROTLI_INVALID_PARAM;
}(NodeRangeError));
exports.ERR_BROTLI_INVALID_PARAM = ERR_BROTLI_INVALID_PARAM;
var ERR_BUFFER_OUT_OF_BOUNDS = (function (_super) {
    __extends(ERR_BUFFER_OUT_OF_BOUNDS, _super);
    function ERR_BUFFER_OUT_OF_BOUNDS(name) {
        return _super.call(this, "ERR_BUFFER_OUT_OF_BOUNDS", name
            ? "\"".concat(name, "\" is outside of buffer bounds")
            : "Attempt to access memory outside buffer bounds") || this;
    }
    return ERR_BUFFER_OUT_OF_BOUNDS;
}(NodeRangeError));
exports.ERR_BUFFER_OUT_OF_BOUNDS = ERR_BUFFER_OUT_OF_BOUNDS;
var ERR_BUFFER_TOO_LARGE = (function (_super) {
    __extends(ERR_BUFFER_TOO_LARGE, _super);
    function ERR_BUFFER_TOO_LARGE(x) {
        return _super.call(this, "ERR_BUFFER_TOO_LARGE", "Cannot create a Buffer larger than ".concat(x, " bytes")) || this;
    }
    return ERR_BUFFER_TOO_LARGE;
}(NodeRangeError));
exports.ERR_BUFFER_TOO_LARGE = ERR_BUFFER_TOO_LARGE;
var ERR_CANNOT_WATCH_SIGINT = (function (_super) {
    __extends(ERR_CANNOT_WATCH_SIGINT, _super);
    function ERR_CANNOT_WATCH_SIGINT() {
        return _super.call(this, "ERR_CANNOT_WATCH_SIGINT", "Cannot watch for SIGINT signals") || this;
    }
    return ERR_CANNOT_WATCH_SIGINT;
}(NodeError));
exports.ERR_CANNOT_WATCH_SIGINT = ERR_CANNOT_WATCH_SIGINT;
var ERR_CHILD_CLOSED_BEFORE_REPLY = (function (_super) {
    __extends(ERR_CHILD_CLOSED_BEFORE_REPLY, _super);
    function ERR_CHILD_CLOSED_BEFORE_REPLY() {
        return _super.call(this, "ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received") || this;
    }
    return ERR_CHILD_CLOSED_BEFORE_REPLY;
}(NodeError));
exports.ERR_CHILD_CLOSED_BEFORE_REPLY = ERR_CHILD_CLOSED_BEFORE_REPLY;
var ERR_CHILD_PROCESS_IPC_REQUIRED = (function (_super) {
    __extends(ERR_CHILD_PROCESS_IPC_REQUIRED, _super);
    function ERR_CHILD_PROCESS_IPC_REQUIRED(x) {
        return _super.call(this, "ERR_CHILD_PROCESS_IPC_REQUIRED", "Forked processes must have an IPC channel, missing value 'ipc' in ".concat(x)) || this;
    }
    return ERR_CHILD_PROCESS_IPC_REQUIRED;
}(NodeError));
exports.ERR_CHILD_PROCESS_IPC_REQUIRED = ERR_CHILD_PROCESS_IPC_REQUIRED;
var ERR_CHILD_PROCESS_STDIO_MAXBUFFER = (function (_super) {
    __extends(ERR_CHILD_PROCESS_STDIO_MAXBUFFER, _super);
    function ERR_CHILD_PROCESS_STDIO_MAXBUFFER(x) {
        return _super.call(this, "ERR_CHILD_PROCESS_STDIO_MAXBUFFER", "".concat(x, " maxBuffer length exceeded")) || this;
    }
    return ERR_CHILD_PROCESS_STDIO_MAXBUFFER;
}(NodeRangeError));
exports.ERR_CHILD_PROCESS_STDIO_MAXBUFFER = ERR_CHILD_PROCESS_STDIO_MAXBUFFER;
var ERR_CONSOLE_WRITABLE_STREAM = (function (_super) {
    __extends(ERR_CONSOLE_WRITABLE_STREAM, _super);
    function ERR_CONSOLE_WRITABLE_STREAM(x) {
        return _super.call(this, "ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for ".concat(x)) || this;
    }
    return ERR_CONSOLE_WRITABLE_STREAM;
}(NodeTypeError));
exports.ERR_CONSOLE_WRITABLE_STREAM = ERR_CONSOLE_WRITABLE_STREAM;
var ERR_CONTEXT_NOT_INITIALIZED = (function (_super) {
    __extends(ERR_CONTEXT_NOT_INITIALIZED, _super);
    function ERR_CONTEXT_NOT_INITIALIZED() {
        return _super.call(this, "ERR_CONTEXT_NOT_INITIALIZED", "context used is not initialized") || this;
    }
    return ERR_CONTEXT_NOT_INITIALIZED;
}(NodeError));
exports.ERR_CONTEXT_NOT_INITIALIZED = ERR_CONTEXT_NOT_INITIALIZED;
var ERR_CPU_USAGE = (function (_super) {
    __extends(ERR_CPU_USAGE, _super);
    function ERR_CPU_USAGE(x) {
        return _super.call(this, "ERR_CPU_USAGE", "Unable to obtain cpu usage ".concat(x)) || this;
    }
    return ERR_CPU_USAGE;
}(NodeError));
exports.ERR_CPU_USAGE = ERR_CPU_USAGE;
var ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED = (function (_super) {
    __extends(ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED, _super);
    function ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED() {
        return _super.call(this, "ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED", "Custom engines not supported by this OpenSSL") || this;
    }
    return ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED;
}(NodeError));
exports.ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED = ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED;
var ERR_CRYPTO_ECDH_INVALID_FORMAT = (function (_super) {
    __extends(ERR_CRYPTO_ECDH_INVALID_FORMAT, _super);
    function ERR_CRYPTO_ECDH_INVALID_FORMAT(x) {
        return _super.call(this, "ERR_CRYPTO_ECDH_INVALID_FORMAT", "Invalid ECDH format: ".concat(x)) || this;
    }
    return ERR_CRYPTO_ECDH_INVALID_FORMAT;
}(NodeTypeError));
exports.ERR_CRYPTO_ECDH_INVALID_FORMAT = ERR_CRYPTO_ECDH_INVALID_FORMAT;
var ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY = (function (_super) {
    __extends(ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY, _super);
    function ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY() {
        return _super.call(this, "ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY", "Public key is not valid for specified curve") || this;
    }
    return ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY;
}(NodeError));
exports.ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY = ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY;
var ERR_CRYPTO_ENGINE_UNKNOWN = (function (_super) {
    __extends(ERR_CRYPTO_ENGINE_UNKNOWN, _super);
    function ERR_CRYPTO_ENGINE_UNKNOWN(x) {
        return _super.call(this, "ERR_CRYPTO_ENGINE_UNKNOWN", "Engine \"".concat(x, "\" was not found")) || this;
    }
    return ERR_CRYPTO_ENGINE_UNKNOWN;
}(NodeError));
exports.ERR_CRYPTO_ENGINE_UNKNOWN = ERR_CRYPTO_ENGINE_UNKNOWN;
var ERR_CRYPTO_FIPS_FORCED = (function (_super) {
    __extends(ERR_CRYPTO_FIPS_FORCED, _super);
    function ERR_CRYPTO_FIPS_FORCED() {
        return _super.call(this, "ERR_CRYPTO_FIPS_FORCED", "Cannot set FIPS mode, it was forced with --force-fips at startup.") || this;
    }
    return ERR_CRYPTO_FIPS_FORCED;
}(NodeError));
exports.ERR_CRYPTO_FIPS_FORCED = ERR_CRYPTO_FIPS_FORCED;
var ERR_CRYPTO_FIPS_UNAVAILABLE = (function (_super) {
    __extends(ERR_CRYPTO_FIPS_UNAVAILABLE, _super);
    function ERR_CRYPTO_FIPS_UNAVAILABLE() {
        return _super.call(this, "ERR_CRYPTO_FIPS_UNAVAILABLE", "Cannot set FIPS mode in a non-FIPS build.") || this;
    }
    return ERR_CRYPTO_FIPS_UNAVAILABLE;
}(NodeError));
exports.ERR_CRYPTO_FIPS_UNAVAILABLE = ERR_CRYPTO_FIPS_UNAVAILABLE;
var ERR_CRYPTO_HASH_FINALIZED = (function (_super) {
    __extends(ERR_CRYPTO_HASH_FINALIZED, _super);
    function ERR_CRYPTO_HASH_FINALIZED() {
        return _super.call(this, "ERR_CRYPTO_HASH_FINALIZED", "Digest already called") || this;
    }
    return ERR_CRYPTO_HASH_FINALIZED;
}(NodeError));
exports.ERR_CRYPTO_HASH_FINALIZED = ERR_CRYPTO_HASH_FINALIZED;
var ERR_CRYPTO_HASH_UPDATE_FAILED = (function (_super) {
    __extends(ERR_CRYPTO_HASH_UPDATE_FAILED, _super);
    function ERR_CRYPTO_HASH_UPDATE_FAILED() {
        return _super.call(this, "ERR_CRYPTO_HASH_UPDATE_FAILED", "Hash update failed") || this;
    }
    return ERR_CRYPTO_HASH_UPDATE_FAILED;
}(NodeError));
exports.ERR_CRYPTO_HASH_UPDATE_FAILED = ERR_CRYPTO_HASH_UPDATE_FAILED;
var ERR_CRYPTO_INCOMPATIBLE_KEY = (function (_super) {
    __extends(ERR_CRYPTO_INCOMPATIBLE_KEY, _super);
    function ERR_CRYPTO_INCOMPATIBLE_KEY(x, y) {
        return _super.call(this, "ERR_CRYPTO_INCOMPATIBLE_KEY", "Incompatible ".concat(x, ": ").concat(y)) || this;
    }
    return ERR_CRYPTO_INCOMPATIBLE_KEY;
}(NodeError));
exports.ERR_CRYPTO_INCOMPATIBLE_KEY = ERR_CRYPTO_INCOMPATIBLE_KEY;
var ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS = (function (_super) {
    __extends(ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS, _super);
    function ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS(x, y) {
        return _super.call(this, "ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS", "The selected key encoding ".concat(x, " ").concat(y, ".")) || this;
    }
    return ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS;
}(NodeError));
exports.ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS = ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS;
var ERR_CRYPTO_INVALID_DIGEST = (function (_super) {
    __extends(ERR_CRYPTO_INVALID_DIGEST, _super);
    function ERR_CRYPTO_INVALID_DIGEST(x) {
        return _super.call(this, "ERR_CRYPTO_INVALID_DIGEST", "Invalid digest: ".concat(x)) || this;
    }
    return ERR_CRYPTO_INVALID_DIGEST;
}(NodeTypeError));
exports.ERR_CRYPTO_INVALID_DIGEST = ERR_CRYPTO_INVALID_DIGEST;
var ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE = (function (_super) {
    __extends(ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE, _super);
    function ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE(x, y) {
        return _super.call(this, "ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE", "Invalid key object type ".concat(x, ", expected ").concat(y, ".")) || this;
    }
    return ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE;
}(NodeTypeError));
exports.ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE = ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE;
var ERR_CRYPTO_INVALID_STATE = (function (_super) {
    __extends(ERR_CRYPTO_INVALID_STATE, _super);
    function ERR_CRYPTO_INVALID_STATE(x) {
        return _super.call(this, "ERR_CRYPTO_INVALID_STATE", "Invalid state for operation ".concat(x)) || this;
    }
    return ERR_CRYPTO_INVALID_STATE;
}(NodeError));
exports.ERR_CRYPTO_INVALID_STATE = ERR_CRYPTO_INVALID_STATE;
var ERR_CRYPTO_PBKDF2_ERROR = (function (_super) {
    __extends(ERR_CRYPTO_PBKDF2_ERROR, _super);
    function ERR_CRYPTO_PBKDF2_ERROR() {
        return _super.call(this, "ERR_CRYPTO_PBKDF2_ERROR", "PBKDF2 error") || this;
    }
    return ERR_CRYPTO_PBKDF2_ERROR;
}(NodeError));
exports.ERR_CRYPTO_PBKDF2_ERROR = ERR_CRYPTO_PBKDF2_ERROR;
var ERR_CRYPTO_SCRYPT_INVALID_PARAMETER = (function (_super) {
    __extends(ERR_CRYPTO_SCRYPT_INVALID_PARAMETER, _super);
    function ERR_CRYPTO_SCRYPT_INVALID_PARAMETER() {
        return _super.call(this, "ERR_CRYPTO_SCRYPT_INVALID_PARAMETER", "Invalid scrypt parameter") || this;
    }
    return ERR_CRYPTO_SCRYPT_INVALID_PARAMETER;
}(NodeError));
exports.ERR_CRYPTO_SCRYPT_INVALID_PARAMETER = ERR_CRYPTO_SCRYPT_INVALID_PARAMETER;
var ERR_CRYPTO_SCRYPT_NOT_SUPPORTED = (function (_super) {
    __extends(ERR_CRYPTO_SCRYPT_NOT_SUPPORTED, _super);
    function ERR_CRYPTO_SCRYPT_NOT_SUPPORTED() {
        return _super.call(this, "ERR_CRYPTO_SCRYPT_NOT_SUPPORTED", "Scrypt algorithm not supported") || this;
    }
    return ERR_CRYPTO_SCRYPT_NOT_SUPPORTED;
}(NodeError));
exports.ERR_CRYPTO_SCRYPT_NOT_SUPPORTED = ERR_CRYPTO_SCRYPT_NOT_SUPPORTED;
var ERR_CRYPTO_SIGN_KEY_REQUIRED = (function (_super) {
    __extends(ERR_CRYPTO_SIGN_KEY_REQUIRED, _super);
    function ERR_CRYPTO_SIGN_KEY_REQUIRED() {
        return _super.call(this, "ERR_CRYPTO_SIGN_KEY_REQUIRED", "No key provided to sign") || this;
    }
    return ERR_CRYPTO_SIGN_KEY_REQUIRED;
}(NodeError));
exports.ERR_CRYPTO_SIGN_KEY_REQUIRED = ERR_CRYPTO_SIGN_KEY_REQUIRED;
var ERR_DIR_CLOSED = (function (_super) {
    __extends(ERR_DIR_CLOSED, _super);
    function ERR_DIR_CLOSED() {
        return _super.call(this, "ERR_DIR_CLOSED", "Directory handle was closed") || this;
    }
    return ERR_DIR_CLOSED;
}(NodeError));
exports.ERR_DIR_CLOSED = ERR_DIR_CLOSED;
var ERR_DIR_CONCURRENT_OPERATION = (function (_super) {
    __extends(ERR_DIR_CONCURRENT_OPERATION, _super);
    function ERR_DIR_CONCURRENT_OPERATION() {
        return _super.call(this, "ERR_DIR_CONCURRENT_OPERATION", "Cannot do synchronous work on directory handle with concurrent asynchronous operations") || this;
    }
    return ERR_DIR_CONCURRENT_OPERATION;
}(NodeError));
exports.ERR_DIR_CONCURRENT_OPERATION = ERR_DIR_CONCURRENT_OPERATION;
var ERR_DNS_SET_SERVERS_FAILED = (function (_super) {
    __extends(ERR_DNS_SET_SERVERS_FAILED, _super);
    function ERR_DNS_SET_SERVERS_FAILED(x, y) {
        return _super.call(this, "ERR_DNS_SET_SERVERS_FAILED", "c-ares failed to set servers: \"".concat(x, "\" [").concat(y, "]")) || this;
    }
    return ERR_DNS_SET_SERVERS_FAILED;
}(NodeError));
exports.ERR_DNS_SET_SERVERS_FAILED = ERR_DNS_SET_SERVERS_FAILED;
var ERR_DOMAIN_CALLBACK_NOT_AVAILABLE = (function (_super) {
    __extends(ERR_DOMAIN_CALLBACK_NOT_AVAILABLE, _super);
    function ERR_DOMAIN_CALLBACK_NOT_AVAILABLE() {
        return _super.call(this, "ERR_DOMAIN_CALLBACK_NOT_AVAILABLE", "A callback was registered through " +
            "process.setUncaughtExceptionCaptureCallback(), which is mutually " +
            "exclusive with using the `domain` module") || this;
    }
    return ERR_DOMAIN_CALLBACK_NOT_AVAILABLE;
}(NodeError));
exports.ERR_DOMAIN_CALLBACK_NOT_AVAILABLE = ERR_DOMAIN_CALLBACK_NOT_AVAILABLE;
var ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE = (function (_super) {
    __extends(ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE, _super);
    function ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE() {
        return _super.call(this, "ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE", "The `domain` module is in use, which is mutually exclusive with calling " +
            "process.setUncaughtExceptionCaptureCallback()") || this;
    }
    return ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE;
}(NodeError));
exports.ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE = ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE;
var ERR_ENCODING_INVALID_ENCODED_DATA = (function (_super) {
    __extends(ERR_ENCODING_INVALID_ENCODED_DATA, _super);
    function ERR_ENCODING_INVALID_ENCODED_DATA(encoding, ret) {
        var _this = _super.call(this, TypeError.prototype.name, "ERR_ENCODING_INVALID_ENCODED_DATA", "The encoded data was not valid for encoding ".concat(encoding)) || this;
        Object.setPrototypeOf(_this, TypeError.prototype);
        _this.errno = ret;
        return _this;
    }
    return ERR_ENCODING_INVALID_ENCODED_DATA;
}(NodeErrorAbstraction));
exports.ERR_ENCODING_INVALID_ENCODED_DATA = ERR_ENCODING_INVALID_ENCODED_DATA;
var windows = [
    [-4093, ["E2BIG", "argument list too long"]],
    [-4092, ["EACCES", "permission denied"]],
    [-4091, ["EADDRINUSE", "address already in use"]],
    [-4090, ["EADDRNOTAVAIL", "address not available"]],
    [-4089, ["EAFNOSUPPORT", "address family not supported"]],
    [-4088, ["EAGAIN", "resource temporarily unavailable"]],
    [-3000, ["EAI_ADDRFAMILY", "address family not supported"]],
    [-3001, ["EAI_AGAIN", "temporary failure"]],
    [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
    [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
    [-3003, ["EAI_CANCELED", "request canceled"]],
    [-3004, ["EAI_FAIL", "permanent failure"]],
    [-3005, ["EAI_FAMILY", "ai_family not supported"]],
    [-3006, ["EAI_MEMORY", "out of memory"]],
    [-3007, ["EAI_NODATA", "no address"]],
    [-3008, ["EAI_NONAME", "unknown node or service"]],
    [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
    [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
    [-3010, ["EAI_SERVICE", "service not available for socket type"]],
    [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
    [-4084, ["EALREADY", "connection already in progress"]],
    [-4083, ["EBADF", "bad file descriptor"]],
    [-4082, ["EBUSY", "resource busy or locked"]],
    [-4081, ["ECANCELED", "operation canceled"]],
    [-4080, ["ECHARSET", "invalid Unicode character"]],
    [-4079, ["ECONNABORTED", "software caused connection abort"]],
    [-4078, ["ECONNREFUSED", "connection refused"]],
    [-4077, ["ECONNRESET", "connection reset by peer"]],
    [-4076, ["EDESTADDRREQ", "destination address required"]],
    [-4075, ["EEXIST", "file already exists"]],
    [-4074, ["EFAULT", "bad address in system call argument"]],
    [-4036, ["EFBIG", "file too large"]],
    [-4073, ["EHOSTUNREACH", "host is unreachable"]],
    [-4072, ["EINTR", "interrupted system call"]],
    [-4071, ["EINVAL", "invalid argument"]],
    [-4070, ["EIO", "i/o error"]],
    [-4069, ["EISCONN", "socket is already connected"]],
    [-4068, ["EISDIR", "illegal operation on a directory"]],
    [-4067, ["ELOOP", "too many symbolic links encountered"]],
    [-4066, ["EMFILE", "too many open files"]],
    [-4065, ["EMSGSIZE", "message too long"]],
    [-4064, ["ENAMETOOLONG", "name too long"]],
    [-4063, ["ENETDOWN", "network is down"]],
    [-4062, ["ENETUNREACH", "network is unreachable"]],
    [-4061, ["ENFILE", "file table overflow"]],
    [-4060, ["ENOBUFS", "no buffer space available"]],
    [-4059, ["ENODEV", "no such device"]],
    [-4058, ["ENOENT", "no such file or directory"]],
    [-4057, ["ENOMEM", "not enough memory"]],
    [-4056, ["ENONET", "machine is not on the network"]],
    [-4035, ["ENOPROTOOPT", "protocol not available"]],
    [-4055, ["ENOSPC", "no space left on device"]],
    [-4054, ["ENOSYS", "function not implemented"]],
    [-4053, ["ENOTCONN", "socket is not connected"]],
    [-4052, ["ENOTDIR", "not a directory"]],
    [-4051, ["ENOTEMPTY", "directory not empty"]],
    [-4050, ["ENOTSOCK", "socket operation on non-socket"]],
    [-4049, ["ENOTSUP", "operation not supported on socket"]],
    [-4048, ["EPERM", "operation not permitted"]],
    [-4047, ["EPIPE", "broken pipe"]],
    [-4046, ["EPROTO", "protocol error"]],
    [-4045, ["EPROTONOSUPPORT", "protocol not supported"]],
    [-4044, ["EPROTOTYPE", "protocol wrong type for socket"]],
    [-4034, ["ERANGE", "result too large"]],
    [-4043, ["EROFS", "read-only file system"]],
    [-4042, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
    [-4041, ["ESPIPE", "invalid seek"]],
    [-4040, ["ESRCH", "no such process"]],
    [-4039, ["ETIMEDOUT", "connection timed out"]],
    [-4038, ["ETXTBSY", "text file is busy"]],
    [-4037, ["EXDEV", "cross-device link not permitted"]],
    [-4094, ["UNKNOWN", "unknown error"]],
    [-4095, ["EOF", "end of file"]],
    [-4033, ["ENXIO", "no such device or address"]],
    [-4032, ["EMLINK", "too many links"]],
    [-4031, ["EHOSTDOWN", "host is down"]],
    [-4030, ["EREMOTEIO", "remote I/O error"]],
    [-4029, ["ENOTTY", "inappropriate ioctl for device"]],
    [-4028, ["EFTYPE", "inappropriate file type or format"]],
    [-4027, ["EILSEQ", "illegal byte sequence"]],
];
var darwin = [
    [-7, ["E2BIG", "argument list too long"]],
    [-13, ["EACCES", "permission denied"]],
    [-48, ["EADDRINUSE", "address already in use"]],
    [-49, ["EADDRNOTAVAIL", "address not available"]],
    [-47, ["EAFNOSUPPORT", "address family not supported"]],
    [-35, ["EAGAIN", "resource temporarily unavailable"]],
    [-3000, ["EAI_ADDRFAMILY", "address family not supported"]],
    [-3001, ["EAI_AGAIN", "temporary failure"]],
    [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
    [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
    [-3003, ["EAI_CANCELED", "request canceled"]],
    [-3004, ["EAI_FAIL", "permanent failure"]],
    [-3005, ["EAI_FAMILY", "ai_family not supported"]],
    [-3006, ["EAI_MEMORY", "out of memory"]],
    [-3007, ["EAI_NODATA", "no address"]],
    [-3008, ["EAI_NONAME", "unknown node or service"]],
    [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
    [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
    [-3010, ["EAI_SERVICE", "service not available for socket type"]],
    [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
    [-37, ["EALREADY", "connection already in progress"]],
    [-9, ["EBADF", "bad file descriptor"]],
    [-16, ["EBUSY", "resource busy or locked"]],
    [-89, ["ECANCELED", "operation canceled"]],
    [-4080, ["ECHARSET", "invalid Unicode character"]],
    [-53, ["ECONNABORTED", "software caused connection abort"]],
    [-61, ["ECONNREFUSED", "connection refused"]],
    [-54, ["ECONNRESET", "connection reset by peer"]],
    [-39, ["EDESTADDRREQ", "destination address required"]],
    [-17, ["EEXIST", "file already exists"]],
    [-14, ["EFAULT", "bad address in system call argument"]],
    [-27, ["EFBIG", "file too large"]],
    [-65, ["EHOSTUNREACH", "host is unreachable"]],
    [-4, ["EINTR", "interrupted system call"]],
    [-22, ["EINVAL", "invalid argument"]],
    [-5, ["EIO", "i/o error"]],
    [-56, ["EISCONN", "socket is already connected"]],
    [-21, ["EISDIR", "illegal operation on a directory"]],
    [-62, ["ELOOP", "too many symbolic links encountered"]],
    [-24, ["EMFILE", "too many open files"]],
    [-40, ["EMSGSIZE", "message too long"]],
    [-63, ["ENAMETOOLONG", "name too long"]],
    [-50, ["ENETDOWN", "network is down"]],
    [-51, ["ENETUNREACH", "network is unreachable"]],
    [-23, ["ENFILE", "file table overflow"]],
    [-55, ["ENOBUFS", "no buffer space available"]],
    [-19, ["ENODEV", "no such device"]],
    [-2, ["ENOENT", "no such file or directory"]],
    [-12, ["ENOMEM", "not enough memory"]],
    [-4056, ["ENONET", "machine is not on the network"]],
    [-42, ["ENOPROTOOPT", "protocol not available"]],
    [-28, ["ENOSPC", "no space left on device"]],
    [-78, ["ENOSYS", "function not implemented"]],
    [-57, ["ENOTCONN", "socket is not connected"]],
    [-20, ["ENOTDIR", "not a directory"]],
    [-66, ["ENOTEMPTY", "directory not empty"]],
    [-38, ["ENOTSOCK", "socket operation on non-socket"]],
    [-45, ["ENOTSUP", "operation not supported on socket"]],
    [-1, ["EPERM", "operation not permitted"]],
    [-32, ["EPIPE", "broken pipe"]],
    [-100, ["EPROTO", "protocol error"]],
    [-43, ["EPROTONOSUPPORT", "protocol not supported"]],
    [-41, ["EPROTOTYPE", "protocol wrong type for socket"]],
    [-34, ["ERANGE", "result too large"]],
    [-30, ["EROFS", "read-only file system"]],
    [-58, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
    [-29, ["ESPIPE", "invalid seek"]],
    [-3, ["ESRCH", "no such process"]],
    [-60, ["ETIMEDOUT", "connection timed out"]],
    [-26, ["ETXTBSY", "text file is busy"]],
    [-18, ["EXDEV", "cross-device link not permitted"]],
    [-4094, ["UNKNOWN", "unknown error"]],
    [-4095, ["EOF", "end of file"]],
    [-6, ["ENXIO", "no such device or address"]],
    [-31, ["EMLINK", "too many links"]],
    [-64, ["EHOSTDOWN", "host is down"]],
    [-4030, ["EREMOTEIO", "remote I/O error"]],
    [-25, ["ENOTTY", "inappropriate ioctl for device"]],
    [-79, ["EFTYPE", "inappropriate file type or format"]],
    [-92, ["EILSEQ", "illegal byte sequence"]],
];
var linux = [
    [-7, ["E2BIG", "argument list too long"]],
    [-13, ["EACCES", "permission denied"]],
    [-98, ["EADDRINUSE", "address already in use"]],
    [-99, ["EADDRNOTAVAIL", "address not available"]],
    [-97, ["EAFNOSUPPORT", "address family not supported"]],
    [-11, ["EAGAIN", "resource temporarily unavailable"]],
    [-3000, ["EAI_ADDRFAMILY", "address family not supported"]],
    [-3001, ["EAI_AGAIN", "temporary failure"]],
    [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
    [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
    [-3003, ["EAI_CANCELED", "request canceled"]],
    [-3004, ["EAI_FAIL", "permanent failure"]],
    [-3005, ["EAI_FAMILY", "ai_family not supported"]],
    [-3006, ["EAI_MEMORY", "out of memory"]],
    [-3007, ["EAI_NODATA", "no address"]],
    [-3008, ["EAI_NONAME", "unknown node or service"]],
    [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
    [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
    [-3010, ["EAI_SERVICE", "service not available for socket type"]],
    [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
    [-114, ["EALREADY", "connection already in progress"]],
    [-9, ["EBADF", "bad file descriptor"]],
    [-16, ["EBUSY", "resource busy or locked"]],
    [-125, ["ECANCELED", "operation canceled"]],
    [-4080, ["ECHARSET", "invalid Unicode character"]],
    [-103, ["ECONNABORTED", "software caused connection abort"]],
    [-111, ["ECONNREFUSED", "connection refused"]],
    [-104, ["ECONNRESET", "connection reset by peer"]],
    [-89, ["EDESTADDRREQ", "destination address required"]],
    [-17, ["EEXIST", "file already exists"]],
    [-14, ["EFAULT", "bad address in system call argument"]],
    [-27, ["EFBIG", "file too large"]],
    [-113, ["EHOSTUNREACH", "host is unreachable"]],
    [-4, ["EINTR", "interrupted system call"]],
    [-22, ["EINVAL", "invalid argument"]],
    [-5, ["EIO", "i/o error"]],
    [-106, ["EISCONN", "socket is already connected"]],
    [-21, ["EISDIR", "illegal operation on a directory"]],
    [-40, ["ELOOP", "too many symbolic links encountered"]],
    [-24, ["EMFILE", "too many open files"]],
    [-90, ["EMSGSIZE", "message too long"]],
    [-36, ["ENAMETOOLONG", "name too long"]],
    [-100, ["ENETDOWN", "network is down"]],
    [-101, ["ENETUNREACH", "network is unreachable"]],
    [-23, ["ENFILE", "file table overflow"]],
    [-105, ["ENOBUFS", "no buffer space available"]],
    [-19, ["ENODEV", "no such device"]],
    [-2, ["ENOENT", "no such file or directory"]],
    [-12, ["ENOMEM", "not enough memory"]],
    [-64, ["ENONET", "machine is not on the network"]],
    [-92, ["ENOPROTOOPT", "protocol not available"]],
    [-28, ["ENOSPC", "no space left on device"]],
    [-38, ["ENOSYS", "function not implemented"]],
    [-107, ["ENOTCONN", "socket is not connected"]],
    [-20, ["ENOTDIR", "not a directory"]],
    [-39, ["ENOTEMPTY", "directory not empty"]],
    [-88, ["ENOTSOCK", "socket operation on non-socket"]],
    [-95, ["ENOTSUP", "operation not supported on socket"]],
    [-1, ["EPERM", "operation not permitted"]],
    [-32, ["EPIPE", "broken pipe"]],
    [-71, ["EPROTO", "protocol error"]],
    [-93, ["EPROTONOSUPPORT", "protocol not supported"]],
    [-91, ["EPROTOTYPE", "protocol wrong type for socket"]],
    [-34, ["ERANGE", "result too large"]],
    [-30, ["EROFS", "read-only file system"]],
    [-108, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
    [-29, ["ESPIPE", "invalid seek"]],
    [-3, ["ESRCH", "no such process"]],
    [-110, ["ETIMEDOUT", "connection timed out"]],
    [-26, ["ETXTBSY", "text file is busy"]],
    [-18, ["EXDEV", "cross-device link not permitted"]],
    [-4094, ["UNKNOWN", "unknown error"]],
    [-4095, ["EOF", "end of file"]],
    [-6, ["ENXIO", "no such device or address"]],
    [-31, ["EMLINK", "too many links"]],
    [-112, ["EHOSTDOWN", "host is down"]],
    [-121, ["EREMOTEIO", "remote I/O error"]],
    [-25, ["ENOTTY", "inappropriate ioctl for device"]],
    [-4028, ["EFTYPE", "inappropriate file type or format"]],
    [-84, ["EILSEQ", "illegal byte sequence"]],
];
exports.errorMap = new Map(os_ts_1.osType === "windows"
    ? windows
    : os_ts_1.osType === "darwin"
        ? darwin
        : os_ts_1.osType === "linux"
            ? linux
            : (0, asserts_ts_1.unreachable)());
var ERR_ENCODING_NOT_SUPPORTED = (function (_super) {
    __extends(ERR_ENCODING_NOT_SUPPORTED, _super);
    function ERR_ENCODING_NOT_SUPPORTED(x) {
        return _super.call(this, "ERR_ENCODING_NOT_SUPPORTED", "The \"".concat(x, "\" encoding is not supported")) || this;
    }
    return ERR_ENCODING_NOT_SUPPORTED;
}(NodeRangeError));
exports.ERR_ENCODING_NOT_SUPPORTED = ERR_ENCODING_NOT_SUPPORTED;
var ERR_EVAL_ESM_CANNOT_PRINT = (function (_super) {
    __extends(ERR_EVAL_ESM_CANNOT_PRINT, _super);
    function ERR_EVAL_ESM_CANNOT_PRINT() {
        return _super.call(this, "ERR_EVAL_ESM_CANNOT_PRINT", "--print cannot be used with ESM input") || this;
    }
    return ERR_EVAL_ESM_CANNOT_PRINT;
}(NodeError));
exports.ERR_EVAL_ESM_CANNOT_PRINT = ERR_EVAL_ESM_CANNOT_PRINT;
var ERR_EVENT_RECURSION = (function (_super) {
    __extends(ERR_EVENT_RECURSION, _super);
    function ERR_EVENT_RECURSION(x) {
        return _super.call(this, "ERR_EVENT_RECURSION", "The event \"".concat(x, "\" is already being dispatched")) || this;
    }
    return ERR_EVENT_RECURSION;
}(NodeError));
exports.ERR_EVENT_RECURSION = ERR_EVENT_RECURSION;
var ERR_FEATURE_UNAVAILABLE_ON_PLATFORM = (function (_super) {
    __extends(ERR_FEATURE_UNAVAILABLE_ON_PLATFORM, _super);
    function ERR_FEATURE_UNAVAILABLE_ON_PLATFORM(x) {
        return _super.call(this, "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM", "The feature ".concat(x, " is unavailable on the current platform, which is being used to run Node.js")) || this;
    }
    return ERR_FEATURE_UNAVAILABLE_ON_PLATFORM;
}(NodeTypeError));
exports.ERR_FEATURE_UNAVAILABLE_ON_PLATFORM = ERR_FEATURE_UNAVAILABLE_ON_PLATFORM;
var ERR_FS_FILE_TOO_LARGE = (function (_super) {
    __extends(ERR_FS_FILE_TOO_LARGE, _super);
    function ERR_FS_FILE_TOO_LARGE(x) {
        return _super.call(this, "ERR_FS_FILE_TOO_LARGE", "File size (".concat(x, ") is greater than 2 GB")) || this;
    }
    return ERR_FS_FILE_TOO_LARGE;
}(NodeRangeError));
exports.ERR_FS_FILE_TOO_LARGE = ERR_FS_FILE_TOO_LARGE;
var ERR_FS_INVALID_SYMLINK_TYPE = (function (_super) {
    __extends(ERR_FS_INVALID_SYMLINK_TYPE, _super);
    function ERR_FS_INVALID_SYMLINK_TYPE(x) {
        return _super.call(this, "ERR_FS_INVALID_SYMLINK_TYPE", "Symlink type must be one of \"dir\", \"file\", or \"junction\". Received \"".concat(x, "\"")) || this;
    }
    return ERR_FS_INVALID_SYMLINK_TYPE;
}(NodeError));
exports.ERR_FS_INVALID_SYMLINK_TYPE = ERR_FS_INVALID_SYMLINK_TYPE;
var ERR_HTTP2_ALTSVC_INVALID_ORIGIN = (function (_super) {
    __extends(ERR_HTTP2_ALTSVC_INVALID_ORIGIN, _super);
    function ERR_HTTP2_ALTSVC_INVALID_ORIGIN() {
        return _super.call(this, "ERR_HTTP2_ALTSVC_INVALID_ORIGIN", "HTTP/2 ALTSVC frames require a valid origin") || this;
    }
    return ERR_HTTP2_ALTSVC_INVALID_ORIGIN;
}(NodeTypeError));
exports.ERR_HTTP2_ALTSVC_INVALID_ORIGIN = ERR_HTTP2_ALTSVC_INVALID_ORIGIN;
var ERR_HTTP2_ALTSVC_LENGTH = (function (_super) {
    __extends(ERR_HTTP2_ALTSVC_LENGTH, _super);
    function ERR_HTTP2_ALTSVC_LENGTH() {
        return _super.call(this, "ERR_HTTP2_ALTSVC_LENGTH", "HTTP/2 ALTSVC frames are limited to 16382 bytes") || this;
    }
    return ERR_HTTP2_ALTSVC_LENGTH;
}(NodeTypeError));
exports.ERR_HTTP2_ALTSVC_LENGTH = ERR_HTTP2_ALTSVC_LENGTH;
var ERR_HTTP2_CONNECT_AUTHORITY = (function (_super) {
    __extends(ERR_HTTP2_CONNECT_AUTHORITY, _super);
    function ERR_HTTP2_CONNECT_AUTHORITY() {
        return _super.call(this, "ERR_HTTP2_CONNECT_AUTHORITY", ":authority header is required for CONNECT requests") || this;
    }
    return ERR_HTTP2_CONNECT_AUTHORITY;
}(NodeError));
exports.ERR_HTTP2_CONNECT_AUTHORITY = ERR_HTTP2_CONNECT_AUTHORITY;
var ERR_HTTP2_CONNECT_PATH = (function (_super) {
    __extends(ERR_HTTP2_CONNECT_PATH, _super);
    function ERR_HTTP2_CONNECT_PATH() {
        return _super.call(this, "ERR_HTTP2_CONNECT_PATH", "The :path header is forbidden for CONNECT requests") || this;
    }
    return ERR_HTTP2_CONNECT_PATH;
}(NodeError));
exports.ERR_HTTP2_CONNECT_PATH = ERR_HTTP2_CONNECT_PATH;
var ERR_HTTP2_CONNECT_SCHEME = (function (_super) {
    __extends(ERR_HTTP2_CONNECT_SCHEME, _super);
    function ERR_HTTP2_CONNECT_SCHEME() {
        return _super.call(this, "ERR_HTTP2_CONNECT_SCHEME", "The :scheme header is forbidden for CONNECT requests") || this;
    }
    return ERR_HTTP2_CONNECT_SCHEME;
}(NodeError));
exports.ERR_HTTP2_CONNECT_SCHEME = ERR_HTTP2_CONNECT_SCHEME;
var ERR_HTTP2_GOAWAY_SESSION = (function (_super) {
    __extends(ERR_HTTP2_GOAWAY_SESSION, _super);
    function ERR_HTTP2_GOAWAY_SESSION() {
        return _super.call(this, "ERR_HTTP2_GOAWAY_SESSION", "New streams cannot be created after receiving a GOAWAY") || this;
    }
    return ERR_HTTP2_GOAWAY_SESSION;
}(NodeError));
exports.ERR_HTTP2_GOAWAY_SESSION = ERR_HTTP2_GOAWAY_SESSION;
var ERR_HTTP2_HEADERS_AFTER_RESPOND = (function (_super) {
    __extends(ERR_HTTP2_HEADERS_AFTER_RESPOND, _super);
    function ERR_HTTP2_HEADERS_AFTER_RESPOND() {
        return _super.call(this, "ERR_HTTP2_HEADERS_AFTER_RESPOND", "Cannot specify additional headers after response initiated") || this;
    }
    return ERR_HTTP2_HEADERS_AFTER_RESPOND;
}(NodeError));
exports.ERR_HTTP2_HEADERS_AFTER_RESPOND = ERR_HTTP2_HEADERS_AFTER_RESPOND;
var ERR_HTTP2_HEADERS_SENT = (function (_super) {
    __extends(ERR_HTTP2_HEADERS_SENT, _super);
    function ERR_HTTP2_HEADERS_SENT() {
        return _super.call(this, "ERR_HTTP2_HEADERS_SENT", "Response has already been initiated.") || this;
    }
    return ERR_HTTP2_HEADERS_SENT;
}(NodeError));
exports.ERR_HTTP2_HEADERS_SENT = ERR_HTTP2_HEADERS_SENT;
var ERR_HTTP2_HEADER_SINGLE_VALUE = (function (_super) {
    __extends(ERR_HTTP2_HEADER_SINGLE_VALUE, _super);
    function ERR_HTTP2_HEADER_SINGLE_VALUE(x) {
        return _super.call(this, "ERR_HTTP2_HEADER_SINGLE_VALUE", "Header field \"".concat(x, "\" must only have a single value")) || this;
    }
    return ERR_HTTP2_HEADER_SINGLE_VALUE;
}(NodeTypeError));
exports.ERR_HTTP2_HEADER_SINGLE_VALUE = ERR_HTTP2_HEADER_SINGLE_VALUE;
var ERR_HTTP2_INFO_STATUS_NOT_ALLOWED = (function (_super) {
    __extends(ERR_HTTP2_INFO_STATUS_NOT_ALLOWED, _super);
    function ERR_HTTP2_INFO_STATUS_NOT_ALLOWED() {
        return _super.call(this, "ERR_HTTP2_INFO_STATUS_NOT_ALLOWED", "Informational status codes cannot be used") || this;
    }
    return ERR_HTTP2_INFO_STATUS_NOT_ALLOWED;
}(NodeRangeError));
exports.ERR_HTTP2_INFO_STATUS_NOT_ALLOWED = ERR_HTTP2_INFO_STATUS_NOT_ALLOWED;
var ERR_HTTP2_INVALID_CONNECTION_HEADERS = (function (_super) {
    __extends(ERR_HTTP2_INVALID_CONNECTION_HEADERS, _super);
    function ERR_HTTP2_INVALID_CONNECTION_HEADERS(x) {
        return _super.call(this, "ERR_HTTP2_INVALID_CONNECTION_HEADERS", "HTTP/1 Connection specific headers are forbidden: \"".concat(x, "\"")) || this;
    }
    return ERR_HTTP2_INVALID_CONNECTION_HEADERS;
}(NodeTypeError));
exports.ERR_HTTP2_INVALID_CONNECTION_HEADERS = ERR_HTTP2_INVALID_CONNECTION_HEADERS;
var ERR_HTTP2_INVALID_HEADER_VALUE = (function (_super) {
    __extends(ERR_HTTP2_INVALID_HEADER_VALUE, _super);
    function ERR_HTTP2_INVALID_HEADER_VALUE(x, y) {
        return _super.call(this, "ERR_HTTP2_INVALID_HEADER_VALUE", "Invalid value \"".concat(x, "\" for header \"").concat(y, "\"")) || this;
    }
    return ERR_HTTP2_INVALID_HEADER_VALUE;
}(NodeTypeError));
exports.ERR_HTTP2_INVALID_HEADER_VALUE = ERR_HTTP2_INVALID_HEADER_VALUE;
var ERR_HTTP2_INVALID_INFO_STATUS = (function (_super) {
    __extends(ERR_HTTP2_INVALID_INFO_STATUS, _super);
    function ERR_HTTP2_INVALID_INFO_STATUS(x) {
        return _super.call(this, "ERR_HTTP2_INVALID_INFO_STATUS", "Invalid informational status code: ".concat(x)) || this;
    }
    return ERR_HTTP2_INVALID_INFO_STATUS;
}(NodeRangeError));
exports.ERR_HTTP2_INVALID_INFO_STATUS = ERR_HTTP2_INVALID_INFO_STATUS;
var ERR_HTTP2_INVALID_ORIGIN = (function (_super) {
    __extends(ERR_HTTP2_INVALID_ORIGIN, _super);
    function ERR_HTTP2_INVALID_ORIGIN() {
        return _super.call(this, "ERR_HTTP2_INVALID_ORIGIN", "HTTP/2 ORIGIN frames require a valid origin") || this;
    }
    return ERR_HTTP2_INVALID_ORIGIN;
}(NodeTypeError));
exports.ERR_HTTP2_INVALID_ORIGIN = ERR_HTTP2_INVALID_ORIGIN;
var ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH = (function (_super) {
    __extends(ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH, _super);
    function ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH() {
        return _super.call(this, "ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH", "Packed settings length must be a multiple of six") || this;
    }
    return ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH;
}(NodeRangeError));
exports.ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH = ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH;
var ERR_HTTP2_INVALID_PSEUDOHEADER = (function (_super) {
    __extends(ERR_HTTP2_INVALID_PSEUDOHEADER, _super);
    function ERR_HTTP2_INVALID_PSEUDOHEADER(x) {
        return _super.call(this, "ERR_HTTP2_INVALID_PSEUDOHEADER", "\"".concat(x, "\" is an invalid pseudoheader or is used incorrectly")) || this;
    }
    return ERR_HTTP2_INVALID_PSEUDOHEADER;
}(NodeTypeError));
exports.ERR_HTTP2_INVALID_PSEUDOHEADER = ERR_HTTP2_INVALID_PSEUDOHEADER;
var ERR_HTTP2_INVALID_SESSION = (function (_super) {
    __extends(ERR_HTTP2_INVALID_SESSION, _super);
    function ERR_HTTP2_INVALID_SESSION() {
        return _super.call(this, "ERR_HTTP2_INVALID_SESSION", "The session has been destroyed") || this;
    }
    return ERR_HTTP2_INVALID_SESSION;
}(NodeError));
exports.ERR_HTTP2_INVALID_SESSION = ERR_HTTP2_INVALID_SESSION;
var ERR_HTTP2_INVALID_STREAM = (function (_super) {
    __extends(ERR_HTTP2_INVALID_STREAM, _super);
    function ERR_HTTP2_INVALID_STREAM() {
        return _super.call(this, "ERR_HTTP2_INVALID_STREAM", "The stream has been destroyed") || this;
    }
    return ERR_HTTP2_INVALID_STREAM;
}(NodeError));
exports.ERR_HTTP2_INVALID_STREAM = ERR_HTTP2_INVALID_STREAM;
var ERR_HTTP2_MAX_PENDING_SETTINGS_ACK = (function (_super) {
    __extends(ERR_HTTP2_MAX_PENDING_SETTINGS_ACK, _super);
    function ERR_HTTP2_MAX_PENDING_SETTINGS_ACK() {
        return _super.call(this, "ERR_HTTP2_MAX_PENDING_SETTINGS_ACK", "Maximum number of pending settings acknowledgements") || this;
    }
    return ERR_HTTP2_MAX_PENDING_SETTINGS_ACK;
}(NodeError));
exports.ERR_HTTP2_MAX_PENDING_SETTINGS_ACK = ERR_HTTP2_MAX_PENDING_SETTINGS_ACK;
var ERR_HTTP2_NESTED_PUSH = (function (_super) {
    __extends(ERR_HTTP2_NESTED_PUSH, _super);
    function ERR_HTTP2_NESTED_PUSH() {
        return _super.call(this, "ERR_HTTP2_NESTED_PUSH", "A push stream cannot initiate another push stream.") || this;
    }
    return ERR_HTTP2_NESTED_PUSH;
}(NodeError));
exports.ERR_HTTP2_NESTED_PUSH = ERR_HTTP2_NESTED_PUSH;
var ERR_HTTP2_NO_SOCKET_MANIPULATION = (function (_super) {
    __extends(ERR_HTTP2_NO_SOCKET_MANIPULATION, _super);
    function ERR_HTTP2_NO_SOCKET_MANIPULATION() {
        return _super.call(this, "ERR_HTTP2_NO_SOCKET_MANIPULATION", "HTTP/2 sockets should not be directly manipulated (e.g. read and written)") || this;
    }
    return ERR_HTTP2_NO_SOCKET_MANIPULATION;
}(NodeError));
exports.ERR_HTTP2_NO_SOCKET_MANIPULATION = ERR_HTTP2_NO_SOCKET_MANIPULATION;
var ERR_HTTP2_ORIGIN_LENGTH = (function (_super) {
    __extends(ERR_HTTP2_ORIGIN_LENGTH, _super);
    function ERR_HTTP2_ORIGIN_LENGTH() {
        return _super.call(this, "ERR_HTTP2_ORIGIN_LENGTH", "HTTP/2 ORIGIN frames are limited to 16382 bytes") || this;
    }
    return ERR_HTTP2_ORIGIN_LENGTH;
}(NodeTypeError));
exports.ERR_HTTP2_ORIGIN_LENGTH = ERR_HTTP2_ORIGIN_LENGTH;
var ERR_HTTP2_OUT_OF_STREAMS = (function (_super) {
    __extends(ERR_HTTP2_OUT_OF_STREAMS, _super);
    function ERR_HTTP2_OUT_OF_STREAMS() {
        return _super.call(this, "ERR_HTTP2_OUT_OF_STREAMS", "No stream ID is available because maximum stream ID has been reached") || this;
    }
    return ERR_HTTP2_OUT_OF_STREAMS;
}(NodeError));
exports.ERR_HTTP2_OUT_OF_STREAMS = ERR_HTTP2_OUT_OF_STREAMS;
var ERR_HTTP2_PAYLOAD_FORBIDDEN = (function (_super) {
    __extends(ERR_HTTP2_PAYLOAD_FORBIDDEN, _super);
    function ERR_HTTP2_PAYLOAD_FORBIDDEN(x) {
        return _super.call(this, "ERR_HTTP2_PAYLOAD_FORBIDDEN", "Responses with ".concat(x, " status must not have a payload")) || this;
    }
    return ERR_HTTP2_PAYLOAD_FORBIDDEN;
}(NodeError));
exports.ERR_HTTP2_PAYLOAD_FORBIDDEN = ERR_HTTP2_PAYLOAD_FORBIDDEN;
var ERR_HTTP2_PING_CANCEL = (function (_super) {
    __extends(ERR_HTTP2_PING_CANCEL, _super);
    function ERR_HTTP2_PING_CANCEL() {
        return _super.call(this, "ERR_HTTP2_PING_CANCEL", "HTTP2 ping cancelled") || this;
    }
    return ERR_HTTP2_PING_CANCEL;
}(NodeError));
exports.ERR_HTTP2_PING_CANCEL = ERR_HTTP2_PING_CANCEL;
var ERR_HTTP2_PING_LENGTH = (function (_super) {
    __extends(ERR_HTTP2_PING_LENGTH, _super);
    function ERR_HTTP2_PING_LENGTH() {
        return _super.call(this, "ERR_HTTP2_PING_LENGTH", "HTTP2 ping payload must be 8 bytes") || this;
    }
    return ERR_HTTP2_PING_LENGTH;
}(NodeRangeError));
exports.ERR_HTTP2_PING_LENGTH = ERR_HTTP2_PING_LENGTH;
var ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED = (function (_super) {
    __extends(ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED, _super);
    function ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED() {
        return _super.call(this, "ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED", "Cannot set HTTP/2 pseudo-headers") || this;
    }
    return ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED;
}(NodeTypeError));
exports.ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED = ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED;
var ERR_HTTP2_PUSH_DISABLED = (function (_super) {
    __extends(ERR_HTTP2_PUSH_DISABLED, _super);
    function ERR_HTTP2_PUSH_DISABLED() {
        return _super.call(this, "ERR_HTTP2_PUSH_DISABLED", "HTTP/2 client has disabled push streams") || this;
    }
    return ERR_HTTP2_PUSH_DISABLED;
}(NodeError));
exports.ERR_HTTP2_PUSH_DISABLED = ERR_HTTP2_PUSH_DISABLED;
var ERR_HTTP2_SEND_FILE = (function (_super) {
    __extends(ERR_HTTP2_SEND_FILE, _super);
    function ERR_HTTP2_SEND_FILE() {
        return _super.call(this, "ERR_HTTP2_SEND_FILE", "Directories cannot be sent") || this;
    }
    return ERR_HTTP2_SEND_FILE;
}(NodeError));
exports.ERR_HTTP2_SEND_FILE = ERR_HTTP2_SEND_FILE;
var ERR_HTTP2_SEND_FILE_NOSEEK = (function (_super) {
    __extends(ERR_HTTP2_SEND_FILE_NOSEEK, _super);
    function ERR_HTTP2_SEND_FILE_NOSEEK() {
        return _super.call(this, "ERR_HTTP2_SEND_FILE_NOSEEK", "Offset or length can only be specified for regular files") || this;
    }
    return ERR_HTTP2_SEND_FILE_NOSEEK;
}(NodeError));
exports.ERR_HTTP2_SEND_FILE_NOSEEK = ERR_HTTP2_SEND_FILE_NOSEEK;
var ERR_HTTP2_SESSION_ERROR = (function (_super) {
    __extends(ERR_HTTP2_SESSION_ERROR, _super);
    function ERR_HTTP2_SESSION_ERROR(x) {
        return _super.call(this, "ERR_HTTP2_SESSION_ERROR", "Session closed with error code ".concat(x)) || this;
    }
    return ERR_HTTP2_SESSION_ERROR;
}(NodeError));
exports.ERR_HTTP2_SESSION_ERROR = ERR_HTTP2_SESSION_ERROR;
var ERR_HTTP2_SETTINGS_CANCEL = (function (_super) {
    __extends(ERR_HTTP2_SETTINGS_CANCEL, _super);
    function ERR_HTTP2_SETTINGS_CANCEL() {
        return _super.call(this, "ERR_HTTP2_SETTINGS_CANCEL", "HTTP2 session settings canceled") || this;
    }
    return ERR_HTTP2_SETTINGS_CANCEL;
}(NodeError));
exports.ERR_HTTP2_SETTINGS_CANCEL = ERR_HTTP2_SETTINGS_CANCEL;
var ERR_HTTP2_SOCKET_BOUND = (function (_super) {
    __extends(ERR_HTTP2_SOCKET_BOUND, _super);
    function ERR_HTTP2_SOCKET_BOUND() {
        return _super.call(this, "ERR_HTTP2_SOCKET_BOUND", "The socket is already bound to an Http2Session") || this;
    }
    return ERR_HTTP2_SOCKET_BOUND;
}(NodeError));
exports.ERR_HTTP2_SOCKET_BOUND = ERR_HTTP2_SOCKET_BOUND;
var ERR_HTTP2_SOCKET_UNBOUND = (function (_super) {
    __extends(ERR_HTTP2_SOCKET_UNBOUND, _super);
    function ERR_HTTP2_SOCKET_UNBOUND() {
        return _super.call(this, "ERR_HTTP2_SOCKET_UNBOUND", "The socket has been disconnected from the Http2Session") || this;
    }
    return ERR_HTTP2_SOCKET_UNBOUND;
}(NodeError));
exports.ERR_HTTP2_SOCKET_UNBOUND = ERR_HTTP2_SOCKET_UNBOUND;
var ERR_HTTP2_STATUS_101 = (function (_super) {
    __extends(ERR_HTTP2_STATUS_101, _super);
    function ERR_HTTP2_STATUS_101() {
        return _super.call(this, "ERR_HTTP2_STATUS_101", "HTTP status code 101 (Switching Protocols) is forbidden in HTTP/2") || this;
    }
    return ERR_HTTP2_STATUS_101;
}(NodeError));
exports.ERR_HTTP2_STATUS_101 = ERR_HTTP2_STATUS_101;
var ERR_HTTP2_STATUS_INVALID = (function (_super) {
    __extends(ERR_HTTP2_STATUS_INVALID, _super);
    function ERR_HTTP2_STATUS_INVALID(x) {
        return _super.call(this, "ERR_HTTP2_STATUS_INVALID", "Invalid status code: ".concat(x)) || this;
    }
    return ERR_HTTP2_STATUS_INVALID;
}(NodeRangeError));
exports.ERR_HTTP2_STATUS_INVALID = ERR_HTTP2_STATUS_INVALID;
var ERR_HTTP2_STREAM_ERROR = (function (_super) {
    __extends(ERR_HTTP2_STREAM_ERROR, _super);
    function ERR_HTTP2_STREAM_ERROR(x) {
        return _super.call(this, "ERR_HTTP2_STREAM_ERROR", "Stream closed with error code ".concat(x)) || this;
    }
    return ERR_HTTP2_STREAM_ERROR;
}(NodeError));
exports.ERR_HTTP2_STREAM_ERROR = ERR_HTTP2_STREAM_ERROR;
var ERR_HTTP2_STREAM_SELF_DEPENDENCY = (function (_super) {
    __extends(ERR_HTTP2_STREAM_SELF_DEPENDENCY, _super);
    function ERR_HTTP2_STREAM_SELF_DEPENDENCY() {
        return _super.call(this, "ERR_HTTP2_STREAM_SELF_DEPENDENCY", "A stream cannot depend on itself") || this;
    }
    return ERR_HTTP2_STREAM_SELF_DEPENDENCY;
}(NodeError));
exports.ERR_HTTP2_STREAM_SELF_DEPENDENCY = ERR_HTTP2_STREAM_SELF_DEPENDENCY;
var ERR_HTTP2_TRAILERS_ALREADY_SENT = (function (_super) {
    __extends(ERR_HTTP2_TRAILERS_ALREADY_SENT, _super);
    function ERR_HTTP2_TRAILERS_ALREADY_SENT() {
        return _super.call(this, "ERR_HTTP2_TRAILERS_ALREADY_SENT", "Trailing headers have already been sent") || this;
    }
    return ERR_HTTP2_TRAILERS_ALREADY_SENT;
}(NodeError));
exports.ERR_HTTP2_TRAILERS_ALREADY_SENT = ERR_HTTP2_TRAILERS_ALREADY_SENT;
var ERR_HTTP2_TRAILERS_NOT_READY = (function (_super) {
    __extends(ERR_HTTP2_TRAILERS_NOT_READY, _super);
    function ERR_HTTP2_TRAILERS_NOT_READY() {
        return _super.call(this, "ERR_HTTP2_TRAILERS_NOT_READY", "Trailing headers cannot be sent until after the wantTrailers event is emitted") || this;
    }
    return ERR_HTTP2_TRAILERS_NOT_READY;
}(NodeError));
exports.ERR_HTTP2_TRAILERS_NOT_READY = ERR_HTTP2_TRAILERS_NOT_READY;
var ERR_HTTP2_UNSUPPORTED_PROTOCOL = (function (_super) {
    __extends(ERR_HTTP2_UNSUPPORTED_PROTOCOL, _super);
    function ERR_HTTP2_UNSUPPORTED_PROTOCOL(x) {
        return _super.call(this, "ERR_HTTP2_UNSUPPORTED_PROTOCOL", "protocol \"".concat(x, "\" is unsupported.")) || this;
    }
    return ERR_HTTP2_UNSUPPORTED_PROTOCOL;
}(NodeError));
exports.ERR_HTTP2_UNSUPPORTED_PROTOCOL = ERR_HTTP2_UNSUPPORTED_PROTOCOL;
var ERR_HTTP_HEADERS_SENT = (function (_super) {
    __extends(ERR_HTTP_HEADERS_SENT, _super);
    function ERR_HTTP_HEADERS_SENT(x) {
        return _super.call(this, "ERR_HTTP_HEADERS_SENT", "Cannot ".concat(x, " headers after they are sent to the client")) || this;
    }
    return ERR_HTTP_HEADERS_SENT;
}(NodeError));
exports.ERR_HTTP_HEADERS_SENT = ERR_HTTP_HEADERS_SENT;
var ERR_HTTP_INVALID_HEADER_VALUE = (function (_super) {
    __extends(ERR_HTTP_INVALID_HEADER_VALUE, _super);
    function ERR_HTTP_INVALID_HEADER_VALUE(x, y) {
        return _super.call(this, "ERR_HTTP_INVALID_HEADER_VALUE", "Invalid value \"".concat(x, "\" for header \"").concat(y, "\"")) || this;
    }
    return ERR_HTTP_INVALID_HEADER_VALUE;
}(NodeTypeError));
exports.ERR_HTTP_INVALID_HEADER_VALUE = ERR_HTTP_INVALID_HEADER_VALUE;
var ERR_HTTP_INVALID_STATUS_CODE = (function (_super) {
    __extends(ERR_HTTP_INVALID_STATUS_CODE, _super);
    function ERR_HTTP_INVALID_STATUS_CODE(x) {
        return _super.call(this, "ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: ".concat(x)) || this;
    }
    return ERR_HTTP_INVALID_STATUS_CODE;
}(NodeRangeError));
exports.ERR_HTTP_INVALID_STATUS_CODE = ERR_HTTP_INVALID_STATUS_CODE;
var ERR_HTTP_SOCKET_ENCODING = (function (_super) {
    __extends(ERR_HTTP_SOCKET_ENCODING, _super);
    function ERR_HTTP_SOCKET_ENCODING() {
        return _super.call(this, "ERR_HTTP_SOCKET_ENCODING", "Changing the socket encoding is not allowed per RFC7230 Section 3.") || this;
    }
    return ERR_HTTP_SOCKET_ENCODING;
}(NodeError));
exports.ERR_HTTP_SOCKET_ENCODING = ERR_HTTP_SOCKET_ENCODING;
var ERR_HTTP_TRAILER_INVALID = (function (_super) {
    __extends(ERR_HTTP_TRAILER_INVALID, _super);
    function ERR_HTTP_TRAILER_INVALID() {
        return _super.call(this, "ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding") || this;
    }
    return ERR_HTTP_TRAILER_INVALID;
}(NodeError));
exports.ERR_HTTP_TRAILER_INVALID = ERR_HTTP_TRAILER_INVALID;
var ERR_INCOMPATIBLE_OPTION_PAIR = (function (_super) {
    __extends(ERR_INCOMPATIBLE_OPTION_PAIR, _super);
    function ERR_INCOMPATIBLE_OPTION_PAIR(x, y) {
        return _super.call(this, "ERR_INCOMPATIBLE_OPTION_PAIR", "Option \"".concat(x, "\" cannot be used in combination with option \"").concat(y, "\"")) || this;
    }
    return ERR_INCOMPATIBLE_OPTION_PAIR;
}(NodeTypeError));
exports.ERR_INCOMPATIBLE_OPTION_PAIR = ERR_INCOMPATIBLE_OPTION_PAIR;
var ERR_INPUT_TYPE_NOT_ALLOWED = (function (_super) {
    __extends(ERR_INPUT_TYPE_NOT_ALLOWED, _super);
    function ERR_INPUT_TYPE_NOT_ALLOWED() {
        return _super.call(this, "ERR_INPUT_TYPE_NOT_ALLOWED", "--input-type can only be used with string input via --eval, --print, or STDIN") || this;
    }
    return ERR_INPUT_TYPE_NOT_ALLOWED;
}(NodeError));
exports.ERR_INPUT_TYPE_NOT_ALLOWED = ERR_INPUT_TYPE_NOT_ALLOWED;
var ERR_INSPECTOR_ALREADY_ACTIVATED = (function (_super) {
    __extends(ERR_INSPECTOR_ALREADY_ACTIVATED, _super);
    function ERR_INSPECTOR_ALREADY_ACTIVATED() {
        return _super.call(this, "ERR_INSPECTOR_ALREADY_ACTIVATED", "Inspector is already activated. Close it with inspector.close() before activating it again.") || this;
    }
    return ERR_INSPECTOR_ALREADY_ACTIVATED;
}(NodeError));
exports.ERR_INSPECTOR_ALREADY_ACTIVATED = ERR_INSPECTOR_ALREADY_ACTIVATED;
var ERR_INSPECTOR_ALREADY_CONNECTED = (function (_super) {
    __extends(ERR_INSPECTOR_ALREADY_CONNECTED, _super);
    function ERR_INSPECTOR_ALREADY_CONNECTED(x) {
        return _super.call(this, "ERR_INSPECTOR_ALREADY_CONNECTED", "".concat(x, " is already connected")) || this;
    }
    return ERR_INSPECTOR_ALREADY_CONNECTED;
}(NodeError));
exports.ERR_INSPECTOR_ALREADY_CONNECTED = ERR_INSPECTOR_ALREADY_CONNECTED;
var ERR_INSPECTOR_CLOSED = (function (_super) {
    __extends(ERR_INSPECTOR_CLOSED, _super);
    function ERR_INSPECTOR_CLOSED() {
        return _super.call(this, "ERR_INSPECTOR_CLOSED", "Session was closed") || this;
    }
    return ERR_INSPECTOR_CLOSED;
}(NodeError));
exports.ERR_INSPECTOR_CLOSED = ERR_INSPECTOR_CLOSED;
var ERR_INSPECTOR_COMMAND = (function (_super) {
    __extends(ERR_INSPECTOR_COMMAND, _super);
    function ERR_INSPECTOR_COMMAND(x, y) {
        return _super.call(this, "ERR_INSPECTOR_COMMAND", "Inspector error ".concat(x, ": ").concat(y)) || this;
    }
    return ERR_INSPECTOR_COMMAND;
}(NodeError));
exports.ERR_INSPECTOR_COMMAND = ERR_INSPECTOR_COMMAND;
var ERR_INSPECTOR_NOT_ACTIVE = (function (_super) {
    __extends(ERR_INSPECTOR_NOT_ACTIVE, _super);
    function ERR_INSPECTOR_NOT_ACTIVE() {
        return _super.call(this, "ERR_INSPECTOR_NOT_ACTIVE", "Inspector is not active") || this;
    }
    return ERR_INSPECTOR_NOT_ACTIVE;
}(NodeError));
exports.ERR_INSPECTOR_NOT_ACTIVE = ERR_INSPECTOR_NOT_ACTIVE;
var ERR_INSPECTOR_NOT_AVAILABLE = (function (_super) {
    __extends(ERR_INSPECTOR_NOT_AVAILABLE, _super);
    function ERR_INSPECTOR_NOT_AVAILABLE() {
        return _super.call(this, "ERR_INSPECTOR_NOT_AVAILABLE", "Inspector is not available") || this;
    }
    return ERR_INSPECTOR_NOT_AVAILABLE;
}(NodeError));
exports.ERR_INSPECTOR_NOT_AVAILABLE = ERR_INSPECTOR_NOT_AVAILABLE;
var ERR_INSPECTOR_NOT_CONNECTED = (function (_super) {
    __extends(ERR_INSPECTOR_NOT_CONNECTED, _super);
    function ERR_INSPECTOR_NOT_CONNECTED() {
        return _super.call(this, "ERR_INSPECTOR_NOT_CONNECTED", "Session is not connected") || this;
    }
    return ERR_INSPECTOR_NOT_CONNECTED;
}(NodeError));
exports.ERR_INSPECTOR_NOT_CONNECTED = ERR_INSPECTOR_NOT_CONNECTED;
var ERR_INSPECTOR_NOT_WORKER = (function (_super) {
    __extends(ERR_INSPECTOR_NOT_WORKER, _super);
    function ERR_INSPECTOR_NOT_WORKER() {
        return _super.call(this, "ERR_INSPECTOR_NOT_WORKER", "Current thread is not a worker") || this;
    }
    return ERR_INSPECTOR_NOT_WORKER;
}(NodeError));
exports.ERR_INSPECTOR_NOT_WORKER = ERR_INSPECTOR_NOT_WORKER;
var ERR_INVALID_ASYNC_ID = (function (_super) {
    __extends(ERR_INVALID_ASYNC_ID, _super);
    function ERR_INVALID_ASYNC_ID(x, y) {
        return _super.call(this, "ERR_INVALID_ASYNC_ID", "Invalid ".concat(x, " value: ").concat(y)) || this;
    }
    return ERR_INVALID_ASYNC_ID;
}(NodeRangeError));
exports.ERR_INVALID_ASYNC_ID = ERR_INVALID_ASYNC_ID;
var ERR_INVALID_BUFFER_SIZE = (function (_super) {
    __extends(ERR_INVALID_BUFFER_SIZE, _super);
    function ERR_INVALID_BUFFER_SIZE(x) {
        return _super.call(this, "ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of ".concat(x)) || this;
    }
    return ERR_INVALID_BUFFER_SIZE;
}(NodeRangeError));
exports.ERR_INVALID_BUFFER_SIZE = ERR_INVALID_BUFFER_SIZE;
var ERR_INVALID_CALLBACK = (function (_super) {
    __extends(ERR_INVALID_CALLBACK, _super);
    function ERR_INVALID_CALLBACK(object) {
        return _super.call(this, "ERR_INVALID_CALLBACK", "Callback must be a function. Received ".concat(JSON.stringify(object))) || this;
    }
    return ERR_INVALID_CALLBACK;
}(NodeTypeError));
exports.ERR_INVALID_CALLBACK = ERR_INVALID_CALLBACK;
var ERR_INVALID_CURSOR_POS = (function (_super) {
    __extends(ERR_INVALID_CURSOR_POS, _super);
    function ERR_INVALID_CURSOR_POS() {
        return _super.call(this, "ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column") || this;
    }
    return ERR_INVALID_CURSOR_POS;
}(NodeTypeError));
exports.ERR_INVALID_CURSOR_POS = ERR_INVALID_CURSOR_POS;
var ERR_INVALID_FD = (function (_super) {
    __extends(ERR_INVALID_FD, _super);
    function ERR_INVALID_FD(x) {
        return _super.call(this, "ERR_INVALID_FD", "\"fd\" must be a positive integer: ".concat(x)) || this;
    }
    return ERR_INVALID_FD;
}(NodeRangeError));
exports.ERR_INVALID_FD = ERR_INVALID_FD;
var ERR_INVALID_FD_TYPE = (function (_super) {
    __extends(ERR_INVALID_FD_TYPE, _super);
    function ERR_INVALID_FD_TYPE(x) {
        return _super.call(this, "ERR_INVALID_FD_TYPE", "Unsupported fd type: ".concat(x)) || this;
    }
    return ERR_INVALID_FD_TYPE;
}(NodeTypeError));
exports.ERR_INVALID_FD_TYPE = ERR_INVALID_FD_TYPE;
var ERR_INVALID_FILE_URL_HOST = (function (_super) {
    __extends(ERR_INVALID_FILE_URL_HOST, _super);
    function ERR_INVALID_FILE_URL_HOST(x) {
        return _super.call(this, "ERR_INVALID_FILE_URL_HOST", "File URL host must be \"localhost\" or empty on ".concat(x)) || this;
    }
    return ERR_INVALID_FILE_URL_HOST;
}(NodeTypeError));
exports.ERR_INVALID_FILE_URL_HOST = ERR_INVALID_FILE_URL_HOST;
var ERR_INVALID_FILE_URL_PATH = (function (_super) {
    __extends(ERR_INVALID_FILE_URL_PATH, _super);
    function ERR_INVALID_FILE_URL_PATH(x) {
        return _super.call(this, "ERR_INVALID_FILE_URL_PATH", "File URL path ".concat(x)) || this;
    }
    return ERR_INVALID_FILE_URL_PATH;
}(NodeTypeError));
exports.ERR_INVALID_FILE_URL_PATH = ERR_INVALID_FILE_URL_PATH;
var ERR_INVALID_HANDLE_TYPE = (function (_super) {
    __extends(ERR_INVALID_HANDLE_TYPE, _super);
    function ERR_INVALID_HANDLE_TYPE() {
        return _super.call(this, "ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent") || this;
    }
    return ERR_INVALID_HANDLE_TYPE;
}(NodeTypeError));
exports.ERR_INVALID_HANDLE_TYPE = ERR_INVALID_HANDLE_TYPE;
var ERR_INVALID_HTTP_TOKEN = (function (_super) {
    __extends(ERR_INVALID_HTTP_TOKEN, _super);
    function ERR_INVALID_HTTP_TOKEN(x, y) {
        return _super.call(this, "ERR_INVALID_HTTP_TOKEN", "".concat(x, " must be a valid HTTP token [\"").concat(y, "\"]")) || this;
    }
    return ERR_INVALID_HTTP_TOKEN;
}(NodeTypeError));
exports.ERR_INVALID_HTTP_TOKEN = ERR_INVALID_HTTP_TOKEN;
var ERR_INVALID_IP_ADDRESS = (function (_super) {
    __extends(ERR_INVALID_IP_ADDRESS, _super);
    function ERR_INVALID_IP_ADDRESS(x) {
        return _super.call(this, "ERR_INVALID_IP_ADDRESS", "Invalid IP address: ".concat(x)) || this;
    }
    return ERR_INVALID_IP_ADDRESS;
}(NodeTypeError));
exports.ERR_INVALID_IP_ADDRESS = ERR_INVALID_IP_ADDRESS;
var ERR_INVALID_OPT_VALUE_ENCODING = (function (_super) {
    __extends(ERR_INVALID_OPT_VALUE_ENCODING, _super);
    function ERR_INVALID_OPT_VALUE_ENCODING(x) {
        return _super.call(this, "ERR_INVALID_OPT_VALUE_ENCODING", "The value \"".concat(x, "\" is invalid for option \"encoding\"")) || this;
    }
    return ERR_INVALID_OPT_VALUE_ENCODING;
}(NodeTypeError));
exports.ERR_INVALID_OPT_VALUE_ENCODING = ERR_INVALID_OPT_VALUE_ENCODING;
var ERR_INVALID_PERFORMANCE_MARK = (function (_super) {
    __extends(ERR_INVALID_PERFORMANCE_MARK, _super);
    function ERR_INVALID_PERFORMANCE_MARK(x) {
        return _super.call(this, "ERR_INVALID_PERFORMANCE_MARK", "The \"".concat(x, "\" performance mark has not been set")) || this;
    }
    return ERR_INVALID_PERFORMANCE_MARK;
}(NodeError));
exports.ERR_INVALID_PERFORMANCE_MARK = ERR_INVALID_PERFORMANCE_MARK;
var ERR_INVALID_PROTOCOL = (function (_super) {
    __extends(ERR_INVALID_PROTOCOL, _super);
    function ERR_INVALID_PROTOCOL(x, y) {
        return _super.call(this, "ERR_INVALID_PROTOCOL", "Protocol \"".concat(x, "\" not supported. Expected \"").concat(y, "\"")) || this;
    }
    return ERR_INVALID_PROTOCOL;
}(NodeTypeError));
exports.ERR_INVALID_PROTOCOL = ERR_INVALID_PROTOCOL;
var ERR_INVALID_REPL_EVAL_CONFIG = (function (_super) {
    __extends(ERR_INVALID_REPL_EVAL_CONFIG, _super);
    function ERR_INVALID_REPL_EVAL_CONFIG() {
        return _super.call(this, "ERR_INVALID_REPL_EVAL_CONFIG", "Cannot specify both \"breakEvalOnSigint\" and \"eval\" for REPL") || this;
    }
    return ERR_INVALID_REPL_EVAL_CONFIG;
}(NodeTypeError));
exports.ERR_INVALID_REPL_EVAL_CONFIG = ERR_INVALID_REPL_EVAL_CONFIG;
var ERR_INVALID_REPL_INPUT = (function (_super) {
    __extends(ERR_INVALID_REPL_INPUT, _super);
    function ERR_INVALID_REPL_INPUT(x) {
        return _super.call(this, "ERR_INVALID_REPL_INPUT", "".concat(x)) || this;
    }
    return ERR_INVALID_REPL_INPUT;
}(NodeTypeError));
exports.ERR_INVALID_REPL_INPUT = ERR_INVALID_REPL_INPUT;
var ERR_INVALID_SYNC_FORK_INPUT = (function (_super) {
    __extends(ERR_INVALID_SYNC_FORK_INPUT, _super);
    function ERR_INVALID_SYNC_FORK_INPUT(x) {
        return _super.call(this, "ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, TypedArray, DataView or string input: ".concat(x)) || this;
    }
    return ERR_INVALID_SYNC_FORK_INPUT;
}(NodeTypeError));
exports.ERR_INVALID_SYNC_FORK_INPUT = ERR_INVALID_SYNC_FORK_INPUT;
var ERR_INVALID_THIS = (function (_super) {
    __extends(ERR_INVALID_THIS, _super);
    function ERR_INVALID_THIS(x) {
        return _super.call(this, "ERR_INVALID_THIS", "Value of \"this\" must be of type ".concat(x)) || this;
    }
    return ERR_INVALID_THIS;
}(NodeTypeError));
exports.ERR_INVALID_THIS = ERR_INVALID_THIS;
var ERR_INVALID_TUPLE = (function (_super) {
    __extends(ERR_INVALID_TUPLE, _super);
    function ERR_INVALID_TUPLE(x, y) {
        return _super.call(this, "ERR_INVALID_TUPLE", "".concat(x, " must be an iterable ").concat(y, " tuple")) || this;
    }
    return ERR_INVALID_TUPLE;
}(NodeTypeError));
exports.ERR_INVALID_TUPLE = ERR_INVALID_TUPLE;
var ERR_INVALID_URI = (function (_super) {
    __extends(ERR_INVALID_URI, _super);
    function ERR_INVALID_URI() {
        return _super.call(this, "ERR_INVALID_URI", "URI malformed") || this;
    }
    return ERR_INVALID_URI;
}(NodeURIError));
exports.ERR_INVALID_URI = ERR_INVALID_URI;
var ERR_IPC_CHANNEL_CLOSED = (function (_super) {
    __extends(ERR_IPC_CHANNEL_CLOSED, _super);
    function ERR_IPC_CHANNEL_CLOSED() {
        return _super.call(this, "ERR_IPC_CHANNEL_CLOSED", "Channel closed") || this;
    }
    return ERR_IPC_CHANNEL_CLOSED;
}(NodeError));
exports.ERR_IPC_CHANNEL_CLOSED = ERR_IPC_CHANNEL_CLOSED;
var ERR_IPC_DISCONNECTED = (function (_super) {
    __extends(ERR_IPC_DISCONNECTED, _super);
    function ERR_IPC_DISCONNECTED() {
        return _super.call(this, "ERR_IPC_DISCONNECTED", "IPC channel is already disconnected") || this;
    }
    return ERR_IPC_DISCONNECTED;
}(NodeError));
exports.ERR_IPC_DISCONNECTED = ERR_IPC_DISCONNECTED;
var ERR_IPC_ONE_PIPE = (function (_super) {
    __extends(ERR_IPC_ONE_PIPE, _super);
    function ERR_IPC_ONE_PIPE() {
        return _super.call(this, "ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe") || this;
    }
    return ERR_IPC_ONE_PIPE;
}(NodeError));
exports.ERR_IPC_ONE_PIPE = ERR_IPC_ONE_PIPE;
var ERR_IPC_SYNC_FORK = (function (_super) {
    __extends(ERR_IPC_SYNC_FORK, _super);
    function ERR_IPC_SYNC_FORK() {
        return _super.call(this, "ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks") || this;
    }
    return ERR_IPC_SYNC_FORK;
}(NodeError));
exports.ERR_IPC_SYNC_FORK = ERR_IPC_SYNC_FORK;
var ERR_MANIFEST_DEPENDENCY_MISSING = (function (_super) {
    __extends(ERR_MANIFEST_DEPENDENCY_MISSING, _super);
    function ERR_MANIFEST_DEPENDENCY_MISSING(x, y) {
        return _super.call(this, "ERR_MANIFEST_DEPENDENCY_MISSING", "Manifest resource ".concat(x, " does not list ").concat(y, " as a dependency specifier")) || this;
    }
    return ERR_MANIFEST_DEPENDENCY_MISSING;
}(NodeError));
exports.ERR_MANIFEST_DEPENDENCY_MISSING = ERR_MANIFEST_DEPENDENCY_MISSING;
var ERR_MANIFEST_INTEGRITY_MISMATCH = (function (_super) {
    __extends(ERR_MANIFEST_INTEGRITY_MISMATCH, _super);
    function ERR_MANIFEST_INTEGRITY_MISMATCH(x) {
        return _super.call(this, "ERR_MANIFEST_INTEGRITY_MISMATCH", "Manifest resource ".concat(x, " has multiple entries but integrity lists do not match")) || this;
    }
    return ERR_MANIFEST_INTEGRITY_MISMATCH;
}(NodeSyntaxError));
exports.ERR_MANIFEST_INTEGRITY_MISMATCH = ERR_MANIFEST_INTEGRITY_MISMATCH;
var ERR_MANIFEST_INVALID_RESOURCE_FIELD = (function (_super) {
    __extends(ERR_MANIFEST_INVALID_RESOURCE_FIELD, _super);
    function ERR_MANIFEST_INVALID_RESOURCE_FIELD(x, y) {
        return _super.call(this, "ERR_MANIFEST_INVALID_RESOURCE_FIELD", "Manifest resource ".concat(x, " has invalid property value for ").concat(y)) || this;
    }
    return ERR_MANIFEST_INVALID_RESOURCE_FIELD;
}(NodeTypeError));
exports.ERR_MANIFEST_INVALID_RESOURCE_FIELD = ERR_MANIFEST_INVALID_RESOURCE_FIELD;
var ERR_MANIFEST_TDZ = (function (_super) {
    __extends(ERR_MANIFEST_TDZ, _super);
    function ERR_MANIFEST_TDZ() {
        return _super.call(this, "ERR_MANIFEST_TDZ", "Manifest initialization has not yet run") || this;
    }
    return ERR_MANIFEST_TDZ;
}(NodeError));
exports.ERR_MANIFEST_TDZ = ERR_MANIFEST_TDZ;
var ERR_MANIFEST_UNKNOWN_ONERROR = (function (_super) {
    __extends(ERR_MANIFEST_UNKNOWN_ONERROR, _super);
    function ERR_MANIFEST_UNKNOWN_ONERROR(x) {
        return _super.call(this, "ERR_MANIFEST_UNKNOWN_ONERROR", "Manifest specified unknown error behavior \"".concat(x, "\".")) || this;
    }
    return ERR_MANIFEST_UNKNOWN_ONERROR;
}(NodeSyntaxError));
exports.ERR_MANIFEST_UNKNOWN_ONERROR = ERR_MANIFEST_UNKNOWN_ONERROR;
var ERR_METHOD_NOT_IMPLEMENTED = (function (_super) {
    __extends(ERR_METHOD_NOT_IMPLEMENTED, _super);
    function ERR_METHOD_NOT_IMPLEMENTED(x) {
        return _super.call(this, "ERR_METHOD_NOT_IMPLEMENTED", "The ".concat(x, " method is not implemented")) || this;
    }
    return ERR_METHOD_NOT_IMPLEMENTED;
}(NodeError));
exports.ERR_METHOD_NOT_IMPLEMENTED = ERR_METHOD_NOT_IMPLEMENTED;
var ERR_MISSING_ARGS = (function (_super) {
    __extends(ERR_MISSING_ARGS, _super);
    function ERR_MISSING_ARGS() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args = args.map(function (a) { return "\"".concat(a, "\""); });
        var msg = "The ";
        switch (args.length) {
            case 1:
                msg += "".concat(args[0], " argument");
                break;
            case 2:
                msg += "".concat(args[0], " and ").concat(args[1], " arguments");
                break;
            default:
                msg += args.slice(0, args.length - 1).join(", ");
                msg += ", and ".concat(args[args.length - 1], " arguments");
                break;
        }
        return _super.call(this, "ERR_MISSING_ARGS", "".concat(msg, " must be specified")) || this;
    }
    return ERR_MISSING_ARGS;
}(NodeTypeError));
exports.ERR_MISSING_ARGS = ERR_MISSING_ARGS;
var ERR_MISSING_OPTION = (function (_super) {
    __extends(ERR_MISSING_OPTION, _super);
    function ERR_MISSING_OPTION(x) {
        return _super.call(this, "ERR_MISSING_OPTION", "".concat(x, " is required")) || this;
    }
    return ERR_MISSING_OPTION;
}(NodeTypeError));
exports.ERR_MISSING_OPTION = ERR_MISSING_OPTION;
var ERR_MULTIPLE_CALLBACK = (function (_super) {
    __extends(ERR_MULTIPLE_CALLBACK, _super);
    function ERR_MULTIPLE_CALLBACK() {
        return _super.call(this, "ERR_MULTIPLE_CALLBACK", "Callback called multiple times") || this;
    }
    return ERR_MULTIPLE_CALLBACK;
}(NodeError));
exports.ERR_MULTIPLE_CALLBACK = ERR_MULTIPLE_CALLBACK;
var ERR_NAPI_CONS_FUNCTION = (function (_super) {
    __extends(ERR_NAPI_CONS_FUNCTION, _super);
    function ERR_NAPI_CONS_FUNCTION() {
        return _super.call(this, "ERR_NAPI_CONS_FUNCTION", "Constructor must be a function") || this;
    }
    return ERR_NAPI_CONS_FUNCTION;
}(NodeTypeError));
exports.ERR_NAPI_CONS_FUNCTION = ERR_NAPI_CONS_FUNCTION;
var ERR_NAPI_INVALID_DATAVIEW_ARGS = (function (_super) {
    __extends(ERR_NAPI_INVALID_DATAVIEW_ARGS, _super);
    function ERR_NAPI_INVALID_DATAVIEW_ARGS() {
        return _super.call(this, "ERR_NAPI_INVALID_DATAVIEW_ARGS", "byte_offset + byte_length should be less than or equal to the size in bytes of the array passed in") || this;
    }
    return ERR_NAPI_INVALID_DATAVIEW_ARGS;
}(NodeRangeError));
exports.ERR_NAPI_INVALID_DATAVIEW_ARGS = ERR_NAPI_INVALID_DATAVIEW_ARGS;
var ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT = (function (_super) {
    __extends(ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT, _super);
    function ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT(x, y) {
        return _super.call(this, "ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT", "start offset of ".concat(x, " should be a multiple of ").concat(y)) || this;
    }
    return ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT;
}(NodeRangeError));
exports.ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT = ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT;
var ERR_NAPI_INVALID_TYPEDARRAY_LENGTH = (function (_super) {
    __extends(ERR_NAPI_INVALID_TYPEDARRAY_LENGTH, _super);
    function ERR_NAPI_INVALID_TYPEDARRAY_LENGTH() {
        return _super.call(this, "ERR_NAPI_INVALID_TYPEDARRAY_LENGTH", "Invalid typed array length") || this;
    }
    return ERR_NAPI_INVALID_TYPEDARRAY_LENGTH;
}(NodeRangeError));
exports.ERR_NAPI_INVALID_TYPEDARRAY_LENGTH = ERR_NAPI_INVALID_TYPEDARRAY_LENGTH;
var ERR_NO_CRYPTO = (function (_super) {
    __extends(ERR_NO_CRYPTO, _super);
    function ERR_NO_CRYPTO() {
        return _super.call(this, "ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support") || this;
    }
    return ERR_NO_CRYPTO;
}(NodeError));
exports.ERR_NO_CRYPTO = ERR_NO_CRYPTO;
var ERR_NO_ICU = (function (_super) {
    __extends(ERR_NO_ICU, _super);
    function ERR_NO_ICU(x) {
        return _super.call(this, "ERR_NO_ICU", "".concat(x, " is not supported on Node.js compiled without ICU")) || this;
    }
    return ERR_NO_ICU;
}(NodeTypeError));
exports.ERR_NO_ICU = ERR_NO_ICU;
var ERR_QUICCLIENTSESSION_FAILED = (function (_super) {
    __extends(ERR_QUICCLIENTSESSION_FAILED, _super);
    function ERR_QUICCLIENTSESSION_FAILED(x) {
        return _super.call(this, "ERR_QUICCLIENTSESSION_FAILED", "Failed to create a new QuicClientSession: ".concat(x)) || this;
    }
    return ERR_QUICCLIENTSESSION_FAILED;
}(NodeError));
exports.ERR_QUICCLIENTSESSION_FAILED = ERR_QUICCLIENTSESSION_FAILED;
var ERR_QUICCLIENTSESSION_FAILED_SETSOCKET = (function (_super) {
    __extends(ERR_QUICCLIENTSESSION_FAILED_SETSOCKET, _super);
    function ERR_QUICCLIENTSESSION_FAILED_SETSOCKET() {
        return _super.call(this, "ERR_QUICCLIENTSESSION_FAILED_SETSOCKET", "Failed to set the QuicSocket") || this;
    }
    return ERR_QUICCLIENTSESSION_FAILED_SETSOCKET;
}(NodeError));
exports.ERR_QUICCLIENTSESSION_FAILED_SETSOCKET = ERR_QUICCLIENTSESSION_FAILED_SETSOCKET;
var ERR_QUICSESSION_DESTROYED = (function (_super) {
    __extends(ERR_QUICSESSION_DESTROYED, _super);
    function ERR_QUICSESSION_DESTROYED(x) {
        return _super.call(this, "ERR_QUICSESSION_DESTROYED", "Cannot call ".concat(x, " after a QuicSession has been destroyed")) || this;
    }
    return ERR_QUICSESSION_DESTROYED;
}(NodeError));
exports.ERR_QUICSESSION_DESTROYED = ERR_QUICSESSION_DESTROYED;
var ERR_QUICSESSION_INVALID_DCID = (function (_super) {
    __extends(ERR_QUICSESSION_INVALID_DCID, _super);
    function ERR_QUICSESSION_INVALID_DCID(x) {
        return _super.call(this, "ERR_QUICSESSION_INVALID_DCID", "Invalid DCID value: ".concat(x)) || this;
    }
    return ERR_QUICSESSION_INVALID_DCID;
}(NodeError));
exports.ERR_QUICSESSION_INVALID_DCID = ERR_QUICSESSION_INVALID_DCID;
var ERR_QUICSESSION_UPDATEKEY = (function (_super) {
    __extends(ERR_QUICSESSION_UPDATEKEY, _super);
    function ERR_QUICSESSION_UPDATEKEY() {
        return _super.call(this, "ERR_QUICSESSION_UPDATEKEY", "Unable to update QuicSession keys") || this;
    }
    return ERR_QUICSESSION_UPDATEKEY;
}(NodeError));
exports.ERR_QUICSESSION_UPDATEKEY = ERR_QUICSESSION_UPDATEKEY;
var ERR_QUICSOCKET_DESTROYED = (function (_super) {
    __extends(ERR_QUICSOCKET_DESTROYED, _super);
    function ERR_QUICSOCKET_DESTROYED(x) {
        return _super.call(this, "ERR_QUICSOCKET_DESTROYED", "Cannot call ".concat(x, " after a QuicSocket has been destroyed")) || this;
    }
    return ERR_QUICSOCKET_DESTROYED;
}(NodeError));
exports.ERR_QUICSOCKET_DESTROYED = ERR_QUICSOCKET_DESTROYED;
var ERR_QUICSOCKET_INVALID_STATELESS_RESET_SECRET_LENGTH = (function (_super) {
    __extends(ERR_QUICSOCKET_INVALID_STATELESS_RESET_SECRET_LENGTH, _super);
    function ERR_QUICSOCKET_INVALID_STATELESS_RESET_SECRET_LENGTH() {
        return _super.call(this, "ERR_QUICSOCKET_INVALID_STATELESS_RESET_SECRET_LENGTH", "The stateResetToken must be exactly 16-bytes in length") || this;
    }
    return ERR_QUICSOCKET_INVALID_STATELESS_RESET_SECRET_LENGTH;
}(NodeError));
exports.ERR_QUICSOCKET_INVALID_STATELESS_RESET_SECRET_LENGTH = ERR_QUICSOCKET_INVALID_STATELESS_RESET_SECRET_LENGTH;
var ERR_QUICSOCKET_LISTENING = (function (_super) {
    __extends(ERR_QUICSOCKET_LISTENING, _super);
    function ERR_QUICSOCKET_LISTENING() {
        return _super.call(this, "ERR_QUICSOCKET_LISTENING", "This QuicSocket is already listening") || this;
    }
    return ERR_QUICSOCKET_LISTENING;
}(NodeError));
exports.ERR_QUICSOCKET_LISTENING = ERR_QUICSOCKET_LISTENING;
var ERR_QUICSOCKET_UNBOUND = (function (_super) {
    __extends(ERR_QUICSOCKET_UNBOUND, _super);
    function ERR_QUICSOCKET_UNBOUND(x) {
        return _super.call(this, "ERR_QUICSOCKET_UNBOUND", "Cannot call ".concat(x, " before a QuicSocket has been bound")) || this;
    }
    return ERR_QUICSOCKET_UNBOUND;
}(NodeError));
exports.ERR_QUICSOCKET_UNBOUND = ERR_QUICSOCKET_UNBOUND;
var ERR_QUICSTREAM_DESTROYED = (function (_super) {
    __extends(ERR_QUICSTREAM_DESTROYED, _super);
    function ERR_QUICSTREAM_DESTROYED(x) {
        return _super.call(this, "ERR_QUICSTREAM_DESTROYED", "Cannot call ".concat(x, " after a QuicStream has been destroyed")) || this;
    }
    return ERR_QUICSTREAM_DESTROYED;
}(NodeError));
exports.ERR_QUICSTREAM_DESTROYED = ERR_QUICSTREAM_DESTROYED;
var ERR_QUICSTREAM_INVALID_PUSH = (function (_super) {
    __extends(ERR_QUICSTREAM_INVALID_PUSH, _super);
    function ERR_QUICSTREAM_INVALID_PUSH() {
        return _super.call(this, "ERR_QUICSTREAM_INVALID_PUSH", "Push streams are only supported on client-initiated, bidirectional streams") || this;
    }
    return ERR_QUICSTREAM_INVALID_PUSH;
}(NodeError));
exports.ERR_QUICSTREAM_INVALID_PUSH = ERR_QUICSTREAM_INVALID_PUSH;
var ERR_QUICSTREAM_OPEN_FAILED = (function (_super) {
    __extends(ERR_QUICSTREAM_OPEN_FAILED, _super);
    function ERR_QUICSTREAM_OPEN_FAILED() {
        return _super.call(this, "ERR_QUICSTREAM_OPEN_FAILED", "Opening a new QuicStream failed") || this;
    }
    return ERR_QUICSTREAM_OPEN_FAILED;
}(NodeError));
exports.ERR_QUICSTREAM_OPEN_FAILED = ERR_QUICSTREAM_OPEN_FAILED;
var ERR_QUICSTREAM_UNSUPPORTED_PUSH = (function (_super) {
    __extends(ERR_QUICSTREAM_UNSUPPORTED_PUSH, _super);
    function ERR_QUICSTREAM_UNSUPPORTED_PUSH() {
        return _super.call(this, "ERR_QUICSTREAM_UNSUPPORTED_PUSH", "Push streams are not supported on this QuicSession") || this;
    }
    return ERR_QUICSTREAM_UNSUPPORTED_PUSH;
}(NodeError));
exports.ERR_QUICSTREAM_UNSUPPORTED_PUSH = ERR_QUICSTREAM_UNSUPPORTED_PUSH;
var ERR_QUIC_TLS13_REQUIRED = (function (_super) {
    __extends(ERR_QUIC_TLS13_REQUIRED, _super);
    function ERR_QUIC_TLS13_REQUIRED() {
        return _super.call(this, "ERR_QUIC_TLS13_REQUIRED", "QUIC requires TLS version 1.3") || this;
    }
    return ERR_QUIC_TLS13_REQUIRED;
}(NodeError));
exports.ERR_QUIC_TLS13_REQUIRED = ERR_QUIC_TLS13_REQUIRED;
var ERR_SCRIPT_EXECUTION_INTERRUPTED = (function (_super) {
    __extends(ERR_SCRIPT_EXECUTION_INTERRUPTED, _super);
    function ERR_SCRIPT_EXECUTION_INTERRUPTED() {
        return _super.call(this, "ERR_SCRIPT_EXECUTION_INTERRUPTED", "Script execution was interrupted by `SIGINT`") || this;
    }
    return ERR_SCRIPT_EXECUTION_INTERRUPTED;
}(NodeError));
exports.ERR_SCRIPT_EXECUTION_INTERRUPTED = ERR_SCRIPT_EXECUTION_INTERRUPTED;
var ERR_SERVER_ALREADY_LISTEN = (function (_super) {
    __extends(ERR_SERVER_ALREADY_LISTEN, _super);
    function ERR_SERVER_ALREADY_LISTEN() {
        return _super.call(this, "ERR_SERVER_ALREADY_LISTEN", "Listen method has been called more than once without closing.") || this;
    }
    return ERR_SERVER_ALREADY_LISTEN;
}(NodeError));
exports.ERR_SERVER_ALREADY_LISTEN = ERR_SERVER_ALREADY_LISTEN;
var ERR_SERVER_NOT_RUNNING = (function (_super) {
    __extends(ERR_SERVER_NOT_RUNNING, _super);
    function ERR_SERVER_NOT_RUNNING() {
        return _super.call(this, "ERR_SERVER_NOT_RUNNING", "Server is not running.") || this;
    }
    return ERR_SERVER_NOT_RUNNING;
}(NodeError));
exports.ERR_SERVER_NOT_RUNNING = ERR_SERVER_NOT_RUNNING;
var ERR_SOCKET_ALREADY_BOUND = (function (_super) {
    __extends(ERR_SOCKET_ALREADY_BOUND, _super);
    function ERR_SOCKET_ALREADY_BOUND() {
        return _super.call(this, "ERR_SOCKET_ALREADY_BOUND", "Socket is already bound") || this;
    }
    return ERR_SOCKET_ALREADY_BOUND;
}(NodeError));
exports.ERR_SOCKET_ALREADY_BOUND = ERR_SOCKET_ALREADY_BOUND;
var ERR_SOCKET_BAD_BUFFER_SIZE = (function (_super) {
    __extends(ERR_SOCKET_BAD_BUFFER_SIZE, _super);
    function ERR_SOCKET_BAD_BUFFER_SIZE() {
        return _super.call(this, "ERR_SOCKET_BAD_BUFFER_SIZE", "Buffer size must be a positive integer") || this;
    }
    return ERR_SOCKET_BAD_BUFFER_SIZE;
}(NodeTypeError));
exports.ERR_SOCKET_BAD_BUFFER_SIZE = ERR_SOCKET_BAD_BUFFER_SIZE;
var ERR_SOCKET_BAD_TYPE = (function (_super) {
    __extends(ERR_SOCKET_BAD_TYPE, _super);
    function ERR_SOCKET_BAD_TYPE() {
        return _super.call(this, "ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6") || this;
    }
    return ERR_SOCKET_BAD_TYPE;
}(NodeTypeError));
exports.ERR_SOCKET_BAD_TYPE = ERR_SOCKET_BAD_TYPE;
var ERR_SOCKET_CLOSED = (function (_super) {
    __extends(ERR_SOCKET_CLOSED, _super);
    function ERR_SOCKET_CLOSED() {
        return _super.call(this, "ERR_SOCKET_CLOSED", "Socket is closed") || this;
    }
    return ERR_SOCKET_CLOSED;
}(NodeError));
exports.ERR_SOCKET_CLOSED = ERR_SOCKET_CLOSED;
var ERR_SOCKET_DGRAM_IS_CONNECTED = (function (_super) {
    __extends(ERR_SOCKET_DGRAM_IS_CONNECTED, _super);
    function ERR_SOCKET_DGRAM_IS_CONNECTED() {
        return _super.call(this, "ERR_SOCKET_DGRAM_IS_CONNECTED", "Already connected") || this;
    }
    return ERR_SOCKET_DGRAM_IS_CONNECTED;
}(NodeError));
exports.ERR_SOCKET_DGRAM_IS_CONNECTED = ERR_SOCKET_DGRAM_IS_CONNECTED;
var ERR_SOCKET_DGRAM_NOT_CONNECTED = (function (_super) {
    __extends(ERR_SOCKET_DGRAM_NOT_CONNECTED, _super);
    function ERR_SOCKET_DGRAM_NOT_CONNECTED() {
        return _super.call(this, "ERR_SOCKET_DGRAM_NOT_CONNECTED", "Not connected") || this;
    }
    return ERR_SOCKET_DGRAM_NOT_CONNECTED;
}(NodeError));
exports.ERR_SOCKET_DGRAM_NOT_CONNECTED = ERR_SOCKET_DGRAM_NOT_CONNECTED;
var ERR_SOCKET_DGRAM_NOT_RUNNING = (function (_super) {
    __extends(ERR_SOCKET_DGRAM_NOT_RUNNING, _super);
    function ERR_SOCKET_DGRAM_NOT_RUNNING() {
        return _super.call(this, "ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running") || this;
    }
    return ERR_SOCKET_DGRAM_NOT_RUNNING;
}(NodeError));
exports.ERR_SOCKET_DGRAM_NOT_RUNNING = ERR_SOCKET_DGRAM_NOT_RUNNING;
var ERR_SRI_PARSE = (function (_super) {
    __extends(ERR_SRI_PARSE, _super);
    function ERR_SRI_PARSE(name, char, position) {
        return _super.call(this, "ERR_SRI_PARSE", "Subresource Integrity string ".concat(name, " had an unexpected ").concat(char, " at position ").concat(position)) || this;
    }
    return ERR_SRI_PARSE;
}(NodeSyntaxError));
exports.ERR_SRI_PARSE = ERR_SRI_PARSE;
var ERR_STREAM_ALREADY_FINISHED = (function (_super) {
    __extends(ERR_STREAM_ALREADY_FINISHED, _super);
    function ERR_STREAM_ALREADY_FINISHED(x) {
        return _super.call(this, "ERR_STREAM_ALREADY_FINISHED", "Cannot call ".concat(x, " after a stream was finished")) || this;
    }
    return ERR_STREAM_ALREADY_FINISHED;
}(NodeError));
exports.ERR_STREAM_ALREADY_FINISHED = ERR_STREAM_ALREADY_FINISHED;
var ERR_STREAM_CANNOT_PIPE = (function (_super) {
    __extends(ERR_STREAM_CANNOT_PIPE, _super);
    function ERR_STREAM_CANNOT_PIPE() {
        return _super.call(this, "ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable") || this;
    }
    return ERR_STREAM_CANNOT_PIPE;
}(NodeError));
exports.ERR_STREAM_CANNOT_PIPE = ERR_STREAM_CANNOT_PIPE;
var ERR_STREAM_DESTROYED = (function (_super) {
    __extends(ERR_STREAM_DESTROYED, _super);
    function ERR_STREAM_DESTROYED(x) {
        return _super.call(this, "ERR_STREAM_DESTROYED", "Cannot call ".concat(x, " after a stream was destroyed")) || this;
    }
    return ERR_STREAM_DESTROYED;
}(NodeError));
exports.ERR_STREAM_DESTROYED = ERR_STREAM_DESTROYED;
var ERR_STREAM_NULL_VALUES = (function (_super) {
    __extends(ERR_STREAM_NULL_VALUES, _super);
    function ERR_STREAM_NULL_VALUES() {
        return _super.call(this, "ERR_STREAM_NULL_VALUES", "May not write null values to stream") || this;
    }
    return ERR_STREAM_NULL_VALUES;
}(NodeTypeError));
exports.ERR_STREAM_NULL_VALUES = ERR_STREAM_NULL_VALUES;
var ERR_STREAM_PREMATURE_CLOSE = (function (_super) {
    __extends(ERR_STREAM_PREMATURE_CLOSE, _super);
    function ERR_STREAM_PREMATURE_CLOSE() {
        return _super.call(this, "ERR_STREAM_PREMATURE_CLOSE", "Premature close") || this;
    }
    return ERR_STREAM_PREMATURE_CLOSE;
}(NodeError));
exports.ERR_STREAM_PREMATURE_CLOSE = ERR_STREAM_PREMATURE_CLOSE;
var ERR_STREAM_PUSH_AFTER_EOF = (function (_super) {
    __extends(ERR_STREAM_PUSH_AFTER_EOF, _super);
    function ERR_STREAM_PUSH_AFTER_EOF() {
        return _super.call(this, "ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF") || this;
    }
    return ERR_STREAM_PUSH_AFTER_EOF;
}(NodeError));
exports.ERR_STREAM_PUSH_AFTER_EOF = ERR_STREAM_PUSH_AFTER_EOF;
var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = (function (_super) {
    __extends(ERR_STREAM_UNSHIFT_AFTER_END_EVENT, _super);
    function ERR_STREAM_UNSHIFT_AFTER_END_EVENT() {
        return _super.call(this, "ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event") || this;
    }
    return ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
}(NodeError));
exports.ERR_STREAM_UNSHIFT_AFTER_END_EVENT = ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
var ERR_STREAM_WRAP = (function (_super) {
    __extends(ERR_STREAM_WRAP, _super);
    function ERR_STREAM_WRAP() {
        return _super.call(this, "ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode") || this;
    }
    return ERR_STREAM_WRAP;
}(NodeError));
exports.ERR_STREAM_WRAP = ERR_STREAM_WRAP;
var ERR_STREAM_WRITE_AFTER_END = (function (_super) {
    __extends(ERR_STREAM_WRITE_AFTER_END, _super);
    function ERR_STREAM_WRITE_AFTER_END() {
        return _super.call(this, "ERR_STREAM_WRITE_AFTER_END", "write after end") || this;
    }
    return ERR_STREAM_WRITE_AFTER_END;
}(NodeError));
exports.ERR_STREAM_WRITE_AFTER_END = ERR_STREAM_WRITE_AFTER_END;
var ERR_SYNTHETIC = (function (_super) {
    __extends(ERR_SYNTHETIC, _super);
    function ERR_SYNTHETIC() {
        return _super.call(this, "ERR_SYNTHETIC", "JavaScript Callstack") || this;
    }
    return ERR_SYNTHETIC;
}(NodeError));
exports.ERR_SYNTHETIC = ERR_SYNTHETIC;
var ERR_TLS_DH_PARAM_SIZE = (function (_super) {
    __extends(ERR_TLS_DH_PARAM_SIZE, _super);
    function ERR_TLS_DH_PARAM_SIZE(x) {
        return _super.call(this, "ERR_TLS_DH_PARAM_SIZE", "DH parameter size ".concat(x, " is less than 2048")) || this;
    }
    return ERR_TLS_DH_PARAM_SIZE;
}(NodeError));
exports.ERR_TLS_DH_PARAM_SIZE = ERR_TLS_DH_PARAM_SIZE;
var ERR_TLS_HANDSHAKE_TIMEOUT = (function (_super) {
    __extends(ERR_TLS_HANDSHAKE_TIMEOUT, _super);
    function ERR_TLS_HANDSHAKE_TIMEOUT() {
        return _super.call(this, "ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout") || this;
    }
    return ERR_TLS_HANDSHAKE_TIMEOUT;
}(NodeError));
exports.ERR_TLS_HANDSHAKE_TIMEOUT = ERR_TLS_HANDSHAKE_TIMEOUT;
var ERR_TLS_INVALID_CONTEXT = (function (_super) {
    __extends(ERR_TLS_INVALID_CONTEXT, _super);
    function ERR_TLS_INVALID_CONTEXT(x) {
        return _super.call(this, "ERR_TLS_INVALID_CONTEXT", "".concat(x, " must be a SecureContext")) || this;
    }
    return ERR_TLS_INVALID_CONTEXT;
}(NodeTypeError));
exports.ERR_TLS_INVALID_CONTEXT = ERR_TLS_INVALID_CONTEXT;
var ERR_TLS_INVALID_STATE = (function (_super) {
    __extends(ERR_TLS_INVALID_STATE, _super);
    function ERR_TLS_INVALID_STATE() {
        return _super.call(this, "ERR_TLS_INVALID_STATE", "TLS socket connection must be securely established") || this;
    }
    return ERR_TLS_INVALID_STATE;
}(NodeError));
exports.ERR_TLS_INVALID_STATE = ERR_TLS_INVALID_STATE;
var ERR_TLS_INVALID_PROTOCOL_VERSION = (function (_super) {
    __extends(ERR_TLS_INVALID_PROTOCOL_VERSION, _super);
    function ERR_TLS_INVALID_PROTOCOL_VERSION(protocol, x) {
        return _super.call(this, "ERR_TLS_INVALID_PROTOCOL_VERSION", "".concat(protocol, " is not a valid ").concat(x, " TLS protocol version")) || this;
    }
    return ERR_TLS_INVALID_PROTOCOL_VERSION;
}(NodeTypeError));
exports.ERR_TLS_INVALID_PROTOCOL_VERSION = ERR_TLS_INVALID_PROTOCOL_VERSION;
var ERR_TLS_PROTOCOL_VERSION_CONFLICT = (function (_super) {
    __extends(ERR_TLS_PROTOCOL_VERSION_CONFLICT, _super);
    function ERR_TLS_PROTOCOL_VERSION_CONFLICT(prevProtocol, protocol) {
        return _super.call(this, "ERR_TLS_PROTOCOL_VERSION_CONFLICT", "TLS protocol version ".concat(prevProtocol, " conflicts with secureProtocol ").concat(protocol)) || this;
    }
    return ERR_TLS_PROTOCOL_VERSION_CONFLICT;
}(NodeTypeError));
exports.ERR_TLS_PROTOCOL_VERSION_CONFLICT = ERR_TLS_PROTOCOL_VERSION_CONFLICT;
var ERR_TLS_RENEGOTIATION_DISABLED = (function (_super) {
    __extends(ERR_TLS_RENEGOTIATION_DISABLED, _super);
    function ERR_TLS_RENEGOTIATION_DISABLED() {
        return _super.call(this, "ERR_TLS_RENEGOTIATION_DISABLED", "TLS session renegotiation disabled for this socket") || this;
    }
    return ERR_TLS_RENEGOTIATION_DISABLED;
}(NodeError));
exports.ERR_TLS_RENEGOTIATION_DISABLED = ERR_TLS_RENEGOTIATION_DISABLED;
var ERR_TLS_REQUIRED_SERVER_NAME = (function (_super) {
    __extends(ERR_TLS_REQUIRED_SERVER_NAME, _super);
    function ERR_TLS_REQUIRED_SERVER_NAME() {
        return _super.call(this, "ERR_TLS_REQUIRED_SERVER_NAME", "\"servername\" is required parameter for Server.addContext") || this;
    }
    return ERR_TLS_REQUIRED_SERVER_NAME;
}(NodeError));
exports.ERR_TLS_REQUIRED_SERVER_NAME = ERR_TLS_REQUIRED_SERVER_NAME;
var ERR_TLS_SESSION_ATTACK = (function (_super) {
    __extends(ERR_TLS_SESSION_ATTACK, _super);
    function ERR_TLS_SESSION_ATTACK() {
        return _super.call(this, "ERR_TLS_SESSION_ATTACK", "TLS session renegotiation attack detected") || this;
    }
    return ERR_TLS_SESSION_ATTACK;
}(NodeError));
exports.ERR_TLS_SESSION_ATTACK = ERR_TLS_SESSION_ATTACK;
var ERR_TLS_SNI_FROM_SERVER = (function (_super) {
    __extends(ERR_TLS_SNI_FROM_SERVER, _super);
    function ERR_TLS_SNI_FROM_SERVER() {
        return _super.call(this, "ERR_TLS_SNI_FROM_SERVER", "Cannot issue SNI from a TLS server-side socket") || this;
    }
    return ERR_TLS_SNI_FROM_SERVER;
}(NodeError));
exports.ERR_TLS_SNI_FROM_SERVER = ERR_TLS_SNI_FROM_SERVER;
var ERR_TRACE_EVENTS_CATEGORY_REQUIRED = (function (_super) {
    __extends(ERR_TRACE_EVENTS_CATEGORY_REQUIRED, _super);
    function ERR_TRACE_EVENTS_CATEGORY_REQUIRED() {
        return _super.call(this, "ERR_TRACE_EVENTS_CATEGORY_REQUIRED", "At least one category is required") || this;
    }
    return ERR_TRACE_EVENTS_CATEGORY_REQUIRED;
}(NodeTypeError));
exports.ERR_TRACE_EVENTS_CATEGORY_REQUIRED = ERR_TRACE_EVENTS_CATEGORY_REQUIRED;
var ERR_TRACE_EVENTS_UNAVAILABLE = (function (_super) {
    __extends(ERR_TRACE_EVENTS_UNAVAILABLE, _super);
    function ERR_TRACE_EVENTS_UNAVAILABLE() {
        return _super.call(this, "ERR_TRACE_EVENTS_UNAVAILABLE", "Trace events are unavailable") || this;
    }
    return ERR_TRACE_EVENTS_UNAVAILABLE;
}(NodeError));
exports.ERR_TRACE_EVENTS_UNAVAILABLE = ERR_TRACE_EVENTS_UNAVAILABLE;
var ERR_UNAVAILABLE_DURING_EXIT = (function (_super) {
    __extends(ERR_UNAVAILABLE_DURING_EXIT, _super);
    function ERR_UNAVAILABLE_DURING_EXIT() {
        return _super.call(this, "ERR_UNAVAILABLE_DURING_EXIT", "Cannot call function in process exit handler") || this;
    }
    return ERR_UNAVAILABLE_DURING_EXIT;
}(NodeError));
exports.ERR_UNAVAILABLE_DURING_EXIT = ERR_UNAVAILABLE_DURING_EXIT;
var ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET = (function (_super) {
    __extends(ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET, _super);
    function ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET() {
        return _super.call(this, "ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET", "`process.setupUncaughtExceptionCapture()` was called while a capture callback was already active") || this;
    }
    return ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET;
}(NodeError));
exports.ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET = ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET;
var ERR_UNESCAPED_CHARACTERS = (function (_super) {
    __extends(ERR_UNESCAPED_CHARACTERS, _super);
    function ERR_UNESCAPED_CHARACTERS(x) {
        return _super.call(this, "ERR_UNESCAPED_CHARACTERS", "".concat(x, " contains unescaped characters")) || this;
    }
    return ERR_UNESCAPED_CHARACTERS;
}(NodeTypeError));
exports.ERR_UNESCAPED_CHARACTERS = ERR_UNESCAPED_CHARACTERS;
var ERR_UNKNOWN_BUILTIN_MODULE = (function (_super) {
    __extends(ERR_UNKNOWN_BUILTIN_MODULE, _super);
    function ERR_UNKNOWN_BUILTIN_MODULE(x) {
        return _super.call(this, "ERR_UNKNOWN_BUILTIN_MODULE", "No such built-in module: ".concat(x)) || this;
    }
    return ERR_UNKNOWN_BUILTIN_MODULE;
}(NodeError));
exports.ERR_UNKNOWN_BUILTIN_MODULE = ERR_UNKNOWN_BUILTIN_MODULE;
var ERR_UNKNOWN_CREDENTIAL = (function (_super) {
    __extends(ERR_UNKNOWN_CREDENTIAL, _super);
    function ERR_UNKNOWN_CREDENTIAL(x, y) {
        return _super.call(this, "ERR_UNKNOWN_CREDENTIAL", "".concat(x, " identifier does not exist: ").concat(y)) || this;
    }
    return ERR_UNKNOWN_CREDENTIAL;
}(NodeError));
exports.ERR_UNKNOWN_CREDENTIAL = ERR_UNKNOWN_CREDENTIAL;
var ERR_UNKNOWN_ENCODING = (function (_super) {
    __extends(ERR_UNKNOWN_ENCODING, _super);
    function ERR_UNKNOWN_ENCODING(x) {
        return _super.call(this, "ERR_UNKNOWN_ENCODING", "Unknown encoding: ".concat(x)) || this;
    }
    return ERR_UNKNOWN_ENCODING;
}(NodeTypeError));
exports.ERR_UNKNOWN_ENCODING = ERR_UNKNOWN_ENCODING;
var ERR_UNKNOWN_FILE_EXTENSION = (function (_super) {
    __extends(ERR_UNKNOWN_FILE_EXTENSION, _super);
    function ERR_UNKNOWN_FILE_EXTENSION(x, y) {
        return _super.call(this, "ERR_UNKNOWN_FILE_EXTENSION", "Unknown file extension \"".concat(x, "\" for ").concat(y)) || this;
    }
    return ERR_UNKNOWN_FILE_EXTENSION;
}(NodeTypeError));
exports.ERR_UNKNOWN_FILE_EXTENSION = ERR_UNKNOWN_FILE_EXTENSION;
var ERR_UNKNOWN_MODULE_FORMAT = (function (_super) {
    __extends(ERR_UNKNOWN_MODULE_FORMAT, _super);
    function ERR_UNKNOWN_MODULE_FORMAT(x) {
        return _super.call(this, "ERR_UNKNOWN_MODULE_FORMAT", "Unknown module format: ".concat(x)) || this;
    }
    return ERR_UNKNOWN_MODULE_FORMAT;
}(NodeRangeError));
exports.ERR_UNKNOWN_MODULE_FORMAT = ERR_UNKNOWN_MODULE_FORMAT;
var ERR_UNKNOWN_SIGNAL = (function (_super) {
    __extends(ERR_UNKNOWN_SIGNAL, _super);
    function ERR_UNKNOWN_SIGNAL(x) {
        return _super.call(this, "ERR_UNKNOWN_SIGNAL", "Unknown signal: ".concat(x)) || this;
    }
    return ERR_UNKNOWN_SIGNAL;
}(NodeTypeError));
exports.ERR_UNKNOWN_SIGNAL = ERR_UNKNOWN_SIGNAL;
var ERR_UNSUPPORTED_DIR_IMPORT = (function (_super) {
    __extends(ERR_UNSUPPORTED_DIR_IMPORT, _super);
    function ERR_UNSUPPORTED_DIR_IMPORT(x, y) {
        return _super.call(this, "ERR_UNSUPPORTED_DIR_IMPORT", "Directory import '".concat(x, "' is not supported resolving ES modules, imported from ").concat(y)) || this;
    }
    return ERR_UNSUPPORTED_DIR_IMPORT;
}(NodeError));
exports.ERR_UNSUPPORTED_DIR_IMPORT = ERR_UNSUPPORTED_DIR_IMPORT;
var ERR_UNSUPPORTED_ESM_URL_SCHEME = (function (_super) {
    __extends(ERR_UNSUPPORTED_ESM_URL_SCHEME, _super);
    function ERR_UNSUPPORTED_ESM_URL_SCHEME() {
        return _super.call(this, "ERR_UNSUPPORTED_ESM_URL_SCHEME", "Only file and data URLs are supported by the default ESM loader") || this;
    }
    return ERR_UNSUPPORTED_ESM_URL_SCHEME;
}(NodeError));
exports.ERR_UNSUPPORTED_ESM_URL_SCHEME = ERR_UNSUPPORTED_ESM_URL_SCHEME;
var ERR_V8BREAKITERATOR = (function (_super) {
    __extends(ERR_V8BREAKITERATOR, _super);
    function ERR_V8BREAKITERATOR() {
        return _super.call(this, "ERR_V8BREAKITERATOR", "Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl") || this;
    }
    return ERR_V8BREAKITERATOR;
}(NodeError));
exports.ERR_V8BREAKITERATOR = ERR_V8BREAKITERATOR;
var ERR_VALID_PERFORMANCE_ENTRY_TYPE = (function (_super) {
    __extends(ERR_VALID_PERFORMANCE_ENTRY_TYPE, _super);
    function ERR_VALID_PERFORMANCE_ENTRY_TYPE() {
        return _super.call(this, "ERR_VALID_PERFORMANCE_ENTRY_TYPE", "At least one valid performance entry type is required") || this;
    }
    return ERR_VALID_PERFORMANCE_ENTRY_TYPE;
}(NodeError));
exports.ERR_VALID_PERFORMANCE_ENTRY_TYPE = ERR_VALID_PERFORMANCE_ENTRY_TYPE;
var ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING = (function (_super) {
    __extends(ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING, _super);
    function ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING() {
        return _super.call(this, "ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING", "A dynamic import callback was not specified.") || this;
    }
    return ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING;
}(NodeTypeError));
exports.ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING = ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING;
var ERR_VM_MODULE_ALREADY_LINKED = (function (_super) {
    __extends(ERR_VM_MODULE_ALREADY_LINKED, _super);
    function ERR_VM_MODULE_ALREADY_LINKED() {
        return _super.call(this, "ERR_VM_MODULE_ALREADY_LINKED", "Module has already been linked") || this;
    }
    return ERR_VM_MODULE_ALREADY_LINKED;
}(NodeError));
exports.ERR_VM_MODULE_ALREADY_LINKED = ERR_VM_MODULE_ALREADY_LINKED;
var ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA = (function (_super) {
    __extends(ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA, _super);
    function ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA() {
        return _super.call(this, "ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA", "Cached data cannot be created for a module which has been evaluated") || this;
    }
    return ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA;
}(NodeError));
exports.ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA = ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA;
var ERR_VM_MODULE_DIFFERENT_CONTEXT = (function (_super) {
    __extends(ERR_VM_MODULE_DIFFERENT_CONTEXT, _super);
    function ERR_VM_MODULE_DIFFERENT_CONTEXT() {
        return _super.call(this, "ERR_VM_MODULE_DIFFERENT_CONTEXT", "Linked modules must use the same context") || this;
    }
    return ERR_VM_MODULE_DIFFERENT_CONTEXT;
}(NodeError));
exports.ERR_VM_MODULE_DIFFERENT_CONTEXT = ERR_VM_MODULE_DIFFERENT_CONTEXT;
var ERR_VM_MODULE_LINKING_ERRORED = (function (_super) {
    __extends(ERR_VM_MODULE_LINKING_ERRORED, _super);
    function ERR_VM_MODULE_LINKING_ERRORED() {
        return _super.call(this, "ERR_VM_MODULE_LINKING_ERRORED", "Linking has already failed for the provided module") || this;
    }
    return ERR_VM_MODULE_LINKING_ERRORED;
}(NodeError));
exports.ERR_VM_MODULE_LINKING_ERRORED = ERR_VM_MODULE_LINKING_ERRORED;
var ERR_VM_MODULE_NOT_MODULE = (function (_super) {
    __extends(ERR_VM_MODULE_NOT_MODULE, _super);
    function ERR_VM_MODULE_NOT_MODULE() {
        return _super.call(this, "ERR_VM_MODULE_NOT_MODULE", "Provided module is not an instance of Module") || this;
    }
    return ERR_VM_MODULE_NOT_MODULE;
}(NodeError));
exports.ERR_VM_MODULE_NOT_MODULE = ERR_VM_MODULE_NOT_MODULE;
var ERR_VM_MODULE_STATUS = (function (_super) {
    __extends(ERR_VM_MODULE_STATUS, _super);
    function ERR_VM_MODULE_STATUS(x) {
        return _super.call(this, "ERR_VM_MODULE_STATUS", "Module status ".concat(x)) || this;
    }
    return ERR_VM_MODULE_STATUS;
}(NodeError));
exports.ERR_VM_MODULE_STATUS = ERR_VM_MODULE_STATUS;
var ERR_WASI_ALREADY_STARTED = (function (_super) {
    __extends(ERR_WASI_ALREADY_STARTED, _super);
    function ERR_WASI_ALREADY_STARTED() {
        return _super.call(this, "ERR_WASI_ALREADY_STARTED", "WASI instance has already started") || this;
    }
    return ERR_WASI_ALREADY_STARTED;
}(NodeError));
exports.ERR_WASI_ALREADY_STARTED = ERR_WASI_ALREADY_STARTED;
var ERR_WORKER_INIT_FAILED = (function (_super) {
    __extends(ERR_WORKER_INIT_FAILED, _super);
    function ERR_WORKER_INIT_FAILED(x) {
        return _super.call(this, "ERR_WORKER_INIT_FAILED", "Worker initialization failure: ".concat(x)) || this;
    }
    return ERR_WORKER_INIT_FAILED;
}(NodeError));
exports.ERR_WORKER_INIT_FAILED = ERR_WORKER_INIT_FAILED;
var ERR_WORKER_NOT_RUNNING = (function (_super) {
    __extends(ERR_WORKER_NOT_RUNNING, _super);
    function ERR_WORKER_NOT_RUNNING() {
        return _super.call(this, "ERR_WORKER_NOT_RUNNING", "Worker instance not running") || this;
    }
    return ERR_WORKER_NOT_RUNNING;
}(NodeError));
exports.ERR_WORKER_NOT_RUNNING = ERR_WORKER_NOT_RUNNING;
var ERR_WORKER_OUT_OF_MEMORY = (function (_super) {
    __extends(ERR_WORKER_OUT_OF_MEMORY, _super);
    function ERR_WORKER_OUT_OF_MEMORY(x) {
        return _super.call(this, "ERR_WORKER_OUT_OF_MEMORY", "Worker terminated due to reaching memory limit: ".concat(x)) || this;
    }
    return ERR_WORKER_OUT_OF_MEMORY;
}(NodeError));
exports.ERR_WORKER_OUT_OF_MEMORY = ERR_WORKER_OUT_OF_MEMORY;
var ERR_WORKER_UNSERIALIZABLE_ERROR = (function (_super) {
    __extends(ERR_WORKER_UNSERIALIZABLE_ERROR, _super);
    function ERR_WORKER_UNSERIALIZABLE_ERROR() {
        return _super.call(this, "ERR_WORKER_UNSERIALIZABLE_ERROR", "Serializing an uncaught exception failed") || this;
    }
    return ERR_WORKER_UNSERIALIZABLE_ERROR;
}(NodeError));
exports.ERR_WORKER_UNSERIALIZABLE_ERROR = ERR_WORKER_UNSERIALIZABLE_ERROR;
var ERR_WORKER_UNSUPPORTED_EXTENSION = (function (_super) {
    __extends(ERR_WORKER_UNSUPPORTED_EXTENSION, _super);
    function ERR_WORKER_UNSUPPORTED_EXTENSION(x) {
        return _super.call(this, "ERR_WORKER_UNSUPPORTED_EXTENSION", "The worker script extension must be \".js\", \".mjs\", or \".cjs\". Received \"".concat(x, "\"")) || this;
    }
    return ERR_WORKER_UNSUPPORTED_EXTENSION;
}(NodeTypeError));
exports.ERR_WORKER_UNSUPPORTED_EXTENSION = ERR_WORKER_UNSUPPORTED_EXTENSION;
var ERR_WORKER_UNSUPPORTED_OPERATION = (function (_super) {
    __extends(ERR_WORKER_UNSUPPORTED_OPERATION, _super);
    function ERR_WORKER_UNSUPPORTED_OPERATION(x) {
        return _super.call(this, "ERR_WORKER_UNSUPPORTED_OPERATION", "".concat(x, " is not supported in workers")) || this;
    }
    return ERR_WORKER_UNSUPPORTED_OPERATION;
}(NodeTypeError));
exports.ERR_WORKER_UNSUPPORTED_OPERATION = ERR_WORKER_UNSUPPORTED_OPERATION;
var ERR_ZLIB_INITIALIZATION_FAILED = (function (_super) {
    __extends(ERR_ZLIB_INITIALIZATION_FAILED, _super);
    function ERR_ZLIB_INITIALIZATION_FAILED() {
        return _super.call(this, "ERR_ZLIB_INITIALIZATION_FAILED", "Initialization failed") || this;
    }
    return ERR_ZLIB_INITIALIZATION_FAILED;
}(NodeError));
exports.ERR_ZLIB_INITIALIZATION_FAILED = ERR_ZLIB_INITIALIZATION_FAILED;
var ERR_FALSY_VALUE_REJECTION = (function (_super) {
    __extends(ERR_FALSY_VALUE_REJECTION, _super);
    function ERR_FALSY_VALUE_REJECTION(reason) {
        var _this = _super.call(this, "ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value") || this;
        _this.reason = reason;
        return _this;
    }
    return ERR_FALSY_VALUE_REJECTION;
}(NodeError));
exports.ERR_FALSY_VALUE_REJECTION = ERR_FALSY_VALUE_REJECTION;
var ERR_HTTP2_INVALID_SETTING_VALUE = (function (_super) {
    __extends(ERR_HTTP2_INVALID_SETTING_VALUE, _super);
    function ERR_HTTP2_INVALID_SETTING_VALUE(name, actual, min, max) {
        var _this = _super.call(this, "ERR_HTTP2_INVALID_SETTING_VALUE", "Invalid value for setting \"".concat(name, "\": ").concat(actual)) || this;
        _this.actual = actual;
        if (min !== undefined) {
            _this.min = min;
            _this.max = max;
        }
        return _this;
    }
    return ERR_HTTP2_INVALID_SETTING_VALUE;
}(NodeRangeError));
exports.ERR_HTTP2_INVALID_SETTING_VALUE = ERR_HTTP2_INVALID_SETTING_VALUE;
var ERR_HTTP2_STREAM_CANCEL = (function (_super) {
    __extends(ERR_HTTP2_STREAM_CANCEL, _super);
    function ERR_HTTP2_STREAM_CANCEL(error) {
        var _this = _super.call(this, "ERR_HTTP2_STREAM_CANCEL", typeof error.message === "string"
            ? "The pending stream has been canceled (caused by: ".concat(error.message, ")")
            : "The pending stream has been canceled") || this;
        if (error) {
            _this.cause = error;
        }
        return _this;
    }
    return ERR_HTTP2_STREAM_CANCEL;
}(NodeError));
exports.ERR_HTTP2_STREAM_CANCEL = ERR_HTTP2_STREAM_CANCEL;
var ERR_INVALID_ADDRESS_FAMILY = (function (_super) {
    __extends(ERR_INVALID_ADDRESS_FAMILY, _super);
    function ERR_INVALID_ADDRESS_FAMILY(addressType, host, port) {
        var _this = _super.call(this, "ERR_INVALID_ADDRESS_FAMILY", "Invalid address family: ".concat(addressType, " ").concat(host, ":").concat(port)) || this;
        _this.host = host;
        _this.port = port;
        return _this;
    }
    return ERR_INVALID_ADDRESS_FAMILY;
}(NodeRangeError));
exports.ERR_INVALID_ADDRESS_FAMILY = ERR_INVALID_ADDRESS_FAMILY;
var ERR_INVALID_CHAR = (function (_super) {
    __extends(ERR_INVALID_CHAR, _super);
    function ERR_INVALID_CHAR(name, field) {
        return _super.call(this, "ERR_INVALID_CHAR", field
            ? "Invalid character in ".concat(name)
            : "Invalid character in ".concat(name, " [\"").concat(field, "\"]")) || this;
    }
    return ERR_INVALID_CHAR;
}(NodeTypeError));
exports.ERR_INVALID_CHAR = ERR_INVALID_CHAR;
var ERR_INVALID_OPT_VALUE = (function (_super) {
    __extends(ERR_INVALID_OPT_VALUE, _super);
    function ERR_INVALID_OPT_VALUE(name, value) {
        return _super.call(this, "ERR_INVALID_OPT_VALUE", "The value \"".concat(value, "\" is invalid for option \"").concat(name, "\"")) || this;
    }
    return ERR_INVALID_OPT_VALUE;
}(NodeTypeError));
exports.ERR_INVALID_OPT_VALUE = ERR_INVALID_OPT_VALUE;
var ERR_INVALID_RETURN_PROPERTY = (function (_super) {
    __extends(ERR_INVALID_RETURN_PROPERTY, _super);
    function ERR_INVALID_RETURN_PROPERTY(input, name, prop, value) {
        return _super.call(this, "ERR_INVALID_RETURN_PROPERTY", "Expected a valid ".concat(input, " to be returned for the \"").concat(prop, "\" from the \"").concat(name, "\" function but got ").concat(value, ".")) || this;
    }
    return ERR_INVALID_RETURN_PROPERTY;
}(NodeTypeError));
exports.ERR_INVALID_RETURN_PROPERTY = ERR_INVALID_RETURN_PROPERTY;
function buildReturnPropertyType(value) {
    if (value && value.constructor && value.constructor.name) {
        return "instance of ".concat(value.constructor.name);
    }
    else {
        return "type ".concat(typeof value);
    }
}
var ERR_INVALID_RETURN_PROPERTY_VALUE = (function (_super) {
    __extends(ERR_INVALID_RETURN_PROPERTY_VALUE, _super);
    function ERR_INVALID_RETURN_PROPERTY_VALUE(input, name, prop, value) {
        return _super.call(this, "ERR_INVALID_RETURN_PROPERTY_VALUE", "Expected ".concat(input, " to be returned for the \"").concat(prop, "\" from the \"").concat(name, "\" function but got ").concat(buildReturnPropertyType(value), ".")) || this;
    }
    return ERR_INVALID_RETURN_PROPERTY_VALUE;
}(NodeTypeError));
exports.ERR_INVALID_RETURN_PROPERTY_VALUE = ERR_INVALID_RETURN_PROPERTY_VALUE;
var ERR_INVALID_RETURN_VALUE = (function (_super) {
    __extends(ERR_INVALID_RETURN_VALUE, _super);
    function ERR_INVALID_RETURN_VALUE(input, name, value) {
        return _super.call(this, "ERR_INVALID_RETURN_VALUE", "Expected ".concat(input, " to be returned from the \"").concat(name, "\" function but got ").concat(buildReturnPropertyType(value), ".")) || this;
    }
    return ERR_INVALID_RETURN_VALUE;
}(NodeTypeError));
exports.ERR_INVALID_RETURN_VALUE = ERR_INVALID_RETURN_VALUE;
var ERR_INVALID_URL = (function (_super) {
    __extends(ERR_INVALID_URL, _super);
    function ERR_INVALID_URL(input) {
        var _this = _super.call(this, "ERR_INVALID_URL", "Invalid URL: ".concat(input)) || this;
        _this.input = input;
        return _this;
    }
    return ERR_INVALID_URL;
}(NodeTypeError));
exports.ERR_INVALID_URL = ERR_INVALID_URL;
