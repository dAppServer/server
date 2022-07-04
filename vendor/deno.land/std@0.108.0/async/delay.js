"use strict";
exports.__esModule = true;
exports.delay = void 0;
function delay(ms, options) {
    if (options === void 0) { options = {}; }
    var signal = options.signal;
    return new Promise(function (resolve, reject) {
        var abort = function () {
            clearTimeout(i);
            reject(new DOMException("Delay was aborted.", "AbortError"));
        };
        var done = function () {
            signal === null || signal === void 0 ? void 0 : signal.removeEventListener("abort", abort);
            resolve();
        };
        var i = setTimeout(done, ms);
        signal === null || signal === void 0 ? void 0 : signal.addEventListener("abort", abort, { once: true });
    });
}
exports.delay = delay;
