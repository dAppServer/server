"use strict";
exports.__esModule = true;
var PortType;
(function (PortType) {
    PortType["tcp"] = "tcp";
    PortType["udp"] = "udp";
    PortType["sctp"] = "stcp";
})(PortType || (PortType = {}));
var MountType;
(function (MountType) {
    MountType["bind"] = "bind";
    MountType["volume"] = "volume";
    MountType["tmpfs"] = "tmpfs";
    MountType["npipe"] = "npipe";
})(MountType || (MountType = {}));
var MountConsistency;
(function (MountConsistency) {
    MountConsistency["default"] = "default";
    MountConsistency["consistent"] = "consistent";
    MountConsistency["cached"] = "cached";
    MountConsistency["delegated"] = "delegated";
})(MountConsistency || (MountConsistency = {}));
