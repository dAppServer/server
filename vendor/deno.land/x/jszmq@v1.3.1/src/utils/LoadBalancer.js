"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _LoadBalancer_endpoints, _LoadBalancer_current;
exports.__esModule = true;
exports.LoadBalancer = void 0;
var LoadBalancer = (function () {
    function LoadBalancer() {
        _LoadBalancer_endpoints.set(this, []);
        _LoadBalancer_current.set(this, 0);
    }
    LoadBalancer.prototype.attach = function (endpoint) {
        __classPrivateFieldGet(this, _LoadBalancer_endpoints, "f").push(endpoint);
    };
    LoadBalancer.prototype.terminated = function (endpoint) {
        var index = __classPrivateFieldGet(this, _LoadBalancer_endpoints, "f").indexOf(endpoint);
        if (__classPrivateFieldGet(this, _LoadBalancer_current, "f") === __classPrivateFieldGet(this, _LoadBalancer_endpoints, "f").length - 1) {
            __classPrivateFieldSet(this, _LoadBalancer_current, 0, "f");
        }
        __classPrivateFieldGet(this, _LoadBalancer_endpoints, "f").splice(index, 1);
    };
    LoadBalancer.prototype.send = function (msg) {
        if (__classPrivateFieldGet(this, _LoadBalancer_endpoints, "f").length === 0) {
            return false;
        }
        var result = __classPrivateFieldGet(this, _LoadBalancer_endpoints, "f")[__classPrivateFieldGet(this, _LoadBalancer_current, "f")].send(msg);
        __classPrivateFieldSet(this, _LoadBalancer_current, (__classPrivateFieldGet(this, _LoadBalancer_current, "f") + 1) % __classPrivateFieldGet(this, _LoadBalancer_endpoints, "f").length, "f");
        return result;
    };
    return LoadBalancer;
}());
exports.LoadBalancer = LoadBalancer;
_LoadBalancer_endpoints = new WeakMap(), _LoadBalancer_current = new WeakMap();
