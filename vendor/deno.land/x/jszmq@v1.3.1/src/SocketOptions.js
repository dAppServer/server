"use strict";
exports.__esModule = true;
exports.SocketOptions = void 0;
var SocketOptions = (function () {
    function SocketOptions() {
        this.immediate = false;
        this.recvRoutingId = false;
        this.routingId = "";
        this.reconnectInterval = 100;
        this.xpubVerbose = false;
    }
    return SocketOptions;
}());
exports.SocketOptions = SocketOptions;
