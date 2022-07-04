"use strict";
exports.__esModule = true;
exports.deferred = void 0;
function deferred() {
    var methods;
    var promise = new Promise(function (resolve, reject) {
        methods = { resolve: resolve, reject: reject };
    });
    return Object.assign(promise, methods);
}
exports.deferred = deferred;
