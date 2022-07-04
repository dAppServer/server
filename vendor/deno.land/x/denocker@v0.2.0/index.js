"use strict";
exports.__esModule = true;
var container_ts_1 = require("./container.ts");
var client_ts_1 = require("./client/client.ts");
var Docker = (function () {
    function Docker(socketAddress, auth) {
        if (auth === void 0) { auth = null; }
        var client = new client_ts_1.DockerClient(socketAddress, auth);
        this.containers = new container_ts_1.Container(client);
    }
    return Docker;
}());
exports["default"] = Docker;
