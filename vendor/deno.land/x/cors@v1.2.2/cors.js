"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Cors = void 0;
var Cors = (function () {
    function Cors(props) {
        var _this = this;
        this.props = props;
        this.configureHeaders = function () {
            var _a = _this, _b = _a.props, corsOptions = _b.corsOptions, requestMethod = _b.requestMethod, setResponseHeader = _b.setResponseHeader, setStatus = _b.setStatus, next = _b.next, end = _b.end, configureOrigin = _a.configureOrigin;
            if (typeof requestMethod === "string" &&
                requestMethod.toUpperCase() === "OPTIONS") {
                configureOrigin()
                    .configureCredentials()
                    .configureMethods()
                    .configureAllowedHeaders()
                    .configureMaxAge()
                    .configureExposedHeaders();
                if (corsOptions.preflightContinue)
                    return next();
                else {
                    setStatus(corsOptions.optionsSuccessStatus);
                    setResponseHeader("Content-Length", "0");
                    return end();
                }
            }
            else {
                configureOrigin().configureCredentials().configureExposedHeaders();
                return next();
            }
        };
        this.configureOrigin = function () {
            var _a;
            var _b = _this, _c = _b.props, corsOptions = _c.corsOptions, getRequestHeader = _c.getRequestHeader, setResponseHeader = _c.setResponseHeader, setVaryHeader = _b.setVaryHeader;
            if (!corsOptions.origin || corsOptions.origin === "*") {
                setResponseHeader("Access-Control-Allow-Origin", "*");
            }
            else if (typeof corsOptions.origin === "string") {
                setResponseHeader("Access-Control-Allow-Origin", corsOptions.origin);
                setVaryHeader("Origin");
            }
            else {
                var requestOrigin = (_a = getRequestHeader("origin")) !== null && _a !== void 0 ? _a : getRequestHeader("Origin");
                setResponseHeader("Access-Control-Allow-Origin", Cors.isOriginAllowed(requestOrigin, corsOptions.origin)
                    ? requestOrigin
                    : "false");
                setVaryHeader("Origin");
            }
            return _this;
        };
        this.configureCredentials = function () {
            var _a = _this.props, corsOptions = _a.corsOptions, setResponseHeader = _a.setResponseHeader;
            if (corsOptions.credentials === true) {
                setResponseHeader("Access-Control-Allow-Credentials", "true");
            }
            return _this;
        };
        this.configureMethods = function () {
            var _a = _this.props, corsOptions = _a.corsOptions, setResponseHeader = _a.setResponseHeader;
            var methods = corsOptions.methods;
            setResponseHeader("Access-Control-Allow-Methods", Array.isArray(methods) ? methods.join(",") : methods);
            return _this;
        };
        this.configureAllowedHeaders = function () {
            var _a, _b;
            var _c = _this, _d = _c.props, corsOptions = _d.corsOptions, getRequestHeader = _d.getRequestHeader, setResponseHeader = _d.setResponseHeader, setVaryHeader = _c.setVaryHeader;
            var allowedHeaders = corsOptions.allowedHeaders;
            if (!allowedHeaders) {
                allowedHeaders = (_b = (_a = getRequestHeader("access-control-request-headers")) !== null && _a !== void 0 ? _a : getRequestHeader("Access-Control-Request-Headers")) !== null && _b !== void 0 ? _b : undefined;
                setVaryHeader("Access-Control-request-Headers");
            }
            if (allowedHeaders === null || allowedHeaders === void 0 ? void 0 : allowedHeaders.length) {
                setResponseHeader("Access-Control-Allow-Headers", Array.isArray(allowedHeaders)
                    ? allowedHeaders.join(",")
                    : allowedHeaders);
            }
            return _this;
        };
        this.configureMaxAge = function () {
            var _a = _this.props, corsOptions = _a.corsOptions, setResponseHeader = _a.setResponseHeader;
            var maxAge = (typeof corsOptions.maxAge === "number" ||
                typeof corsOptions.maxAge === "string") &&
                corsOptions.maxAge.toString();
            if (maxAge && maxAge.length) {
                setResponseHeader("Access-Control-Max-Age", maxAge);
            }
            return _this;
        };
        this.configureExposedHeaders = function () {
            var _a = _this.props, corsOptions = _a.corsOptions, setResponseHeader = _a.setResponseHeader;
            var exposedHeaders = corsOptions.exposedHeaders;
            if (exposedHeaders === null || exposedHeaders === void 0 ? void 0 : exposedHeaders.length) {
                setResponseHeader("Access-Control-Expose-Headers", Array.isArray(exposedHeaders)
                    ? exposedHeaders.join(",")
                    : exposedHeaders);
            }
            return _this;
        };
        this.setVaryHeader = function (field) {
            var _a;
            var _b = _this, _c = _b.props, getResponseHeader = _c.getResponseHeader, setResponseHeader = _c.setResponseHeader, appendVaryHeader = _b.appendVaryHeader;
            var existingHeader = (_a = getResponseHeader("Vary")) !== null && _a !== void 0 ? _a : "";
            if (existingHeader &&
                typeof existingHeader === "string" &&
                (existingHeader = appendVaryHeader(existingHeader, field))) {
                setResponseHeader("Vary", existingHeader);
            }
        };
        this.appendVaryHeader = function (header, field) {
            var parseVaryHeader = _this.parseVaryHeader;
            if (header === "*")
                return header;
            var varyHeader = header;
            var fields = parseVaryHeader(field);
            var headers = parseVaryHeader(header.toLocaleLowerCase());
            if (fields.includes("*") || headers.includes("*"))
                return "*";
            fields.forEach(function (field) {
                var fld = field.toLowerCase();
                if (headers.includes(fld)) {
                    headers.push(fld);
                    varyHeader = varyHeader ? "".concat(varyHeader, ", ").concat(field) : field;
                }
            });
            return varyHeader;
        };
        this.parseVaryHeader = function (header) {
            var end = 0;
            var list = [];
            var start = 0;
            for (var i = 0, len = header.length; i < len; i++) {
                switch (header.charCodeAt(i)) {
                    case 0x20:
                        if (start === end)
                            start = end = i + 1;
                        break;
                    case 0x2c:
                        list.push(header.substring(start, end));
                        start = end = i + 1;
                        break;
                    default:
                        end = i + 1;
                        break;
                }
            }
            list.push(header.substring(start, end));
            return list;
        };
    }
    Cors.produceCorsOptions = function (corsOptions, defaultCorsOptions) {
        if (corsOptions === void 0) { corsOptions = {}; }
        if (defaultCorsOptions === void 0) { defaultCorsOptions = {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }; }
        return (__assign(__assign({}, defaultCorsOptions), corsOptions));
    };
    Cors.produceCorsOptionsDelegate = function (o) {
        return typeof o === "function"
            ? o
            : (function (_request) { return o; });
    };
    Cors.produceOriginDelegate = function (corsOptions) {
        if (corsOptions.origin) {
            if (typeof corsOptions.origin === "function") {
                return corsOptions.origin;
            }
            return (function (_requestOrigin) { return corsOptions.origin; });
        }
    };
    Cors.isOriginAllowed = function (requestOrigin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
            return allowedOrigin.some(function (ao) {
                return Cors.isOriginAllowed(requestOrigin, ao);
            });
        }
        else if (typeof allowedOrigin === "string") {
            return requestOrigin === allowedOrigin;
        }
        else if (allowedOrigin instanceof RegExp &&
            typeof requestOrigin === "string") {
            return allowedOrigin.test(requestOrigin);
        }
        else
            return !!allowedOrigin;
    };
    return Cors;
}());
exports.Cors = Cors;
