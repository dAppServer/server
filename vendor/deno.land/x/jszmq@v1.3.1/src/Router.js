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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
var _Router_anonymousPipes, _Router_pipes;
exports.__esModule = true;
exports.Router = void 0;
var SocketBase_ts_1 = require("./SocketBase.ts");
var lodash_1 = require("https://cdn.skypack.dev/lodash");
var Types_ts_1 = require("./Types.ts");
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        var _this = _super.call(this) || this;
        _Router_anonymousPipes.set(_this, []);
        _Router_pipes.set(_this, new Map());
        _this.nextId = 0;
        _this.options.recvRoutingId = true;
        return _this;
    }
    Router.prototype.attachEndpoint = function (endpoint) {
        __classPrivateFieldGet(this, _Router_anonymousPipes, "f").push(endpoint);
    };
    Router.prototype.endpointTerminated = function (endpoint) {
        __classPrivateFieldGet(this, _Router_pipes, "f")["delete"](endpoint.routingKeyString);
        (0, lodash_1.pull)(__classPrivateFieldGet(this, _Router_anonymousPipes, "f"), endpoint);
    };
    Router.prototype.xrecv = function (endpoint) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        if ((0, lodash_1.includes)(__classPrivateFieldGet(this, _Router_anonymousPipes, "f"), endpoint)) {
            (0, lodash_1.pull)(__classPrivateFieldGet(this, _Router_anonymousPipes, "f"), endpoint);
            var routingKey = msg[0];
            if (routingKey.length > 0) {
                endpoint.routingKey = Types_ts_1.Buffer.concat([
                    new Uint8Array([0]),
                    routingKey,
                ]);
            }
            else {
                var buffer = Types_ts_1.Buffer.alloc(5);
                buffer.writeUInt8(1, 0);
                buffer.writeInt32BE(this.nextId, 1);
                endpoint.routingKey = buffer;
                this.nextId++;
            }
            endpoint.routingKeyString = endpoint.routingKey.toString("hex");
            __classPrivateFieldGet(this, _Router_pipes, "f").set(endpoint.routingKeyString, endpoint);
            return;
        }
        this.xxrecv.apply(this, __spreadArray([endpoint, endpoint.routingKey], msg, false));
    };
    Router.prototype.xxrecv = function (endpoint) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        this.emit.apply(this, __spreadArray(["message", endpoint], msg, false));
    };
    Router.prototype.xsend = function (msg) {
        if (msg.length <= 1) {
            throw new Error("router message must include a routing key");
        }
        var routingKey = msg.shift();
        if (!Types_ts_1.Buffer.isBuffer(routingKey)) {
            throw new Error("routing key must be a buffer");
        }
        var endpoint = __classPrivateFieldGet(this, _Router_pipes, "f").get(routingKey.toString("hex"));
        if (!endpoint) {
            return;
        }
        endpoint.send(msg);
    };
    return Router;
}(SocketBase_ts_1.SocketBase));
exports.Router = Router;
_Router_anonymousPipes = new WeakMap(), _Router_pipes = new WeakMap();
