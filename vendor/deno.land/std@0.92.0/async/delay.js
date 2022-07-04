"use strict";
exports.__esModule = true;
exports.delay = void 0;
function delay(ms) {
    return new Promise(function (res) {
        return setTimeout(function () {
            res();
        }, ms);
    });
}
exports.delay = delay;
