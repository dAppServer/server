"use strict";
exports.__esModule = true;
exports.STATUS_TEXT = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["Continue"] = 100] = "Continue";
    Status[Status["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    Status[Status["Processing"] = 102] = "Processing";
    Status[Status["EarlyHints"] = 103] = "EarlyHints";
    Status[Status["OK"] = 200] = "OK";
    Status[Status["Created"] = 201] = "Created";
    Status[Status["Accepted"] = 202] = "Accepted";
    Status[Status["NonAuthoritativeInfo"] = 203] = "NonAuthoritativeInfo";
    Status[Status["NoContent"] = 204] = "NoContent";
    Status[Status["ResetContent"] = 205] = "ResetContent";
    Status[Status["PartialContent"] = 206] = "PartialContent";
    Status[Status["MultiStatus"] = 207] = "MultiStatus";
    Status[Status["AlreadyReported"] = 208] = "AlreadyReported";
    Status[Status["IMUsed"] = 226] = "IMUsed";
    Status[Status["MultipleChoices"] = 300] = "MultipleChoices";
    Status[Status["MovedPermanently"] = 301] = "MovedPermanently";
    Status[Status["Found"] = 302] = "Found";
    Status[Status["SeeOther"] = 303] = "SeeOther";
    Status[Status["NotModified"] = 304] = "NotModified";
    Status[Status["UseProxy"] = 305] = "UseProxy";
    Status[Status["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    Status[Status["PermanentRedirect"] = 308] = "PermanentRedirect";
    Status[Status["BadRequest"] = 400] = "BadRequest";
    Status[Status["Unauthorized"] = 401] = "Unauthorized";
    Status[Status["PaymentRequired"] = 402] = "PaymentRequired";
    Status[Status["Forbidden"] = 403] = "Forbidden";
    Status[Status["NotFound"] = 404] = "NotFound";
    Status[Status["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    Status[Status["NotAcceptable"] = 406] = "NotAcceptable";
    Status[Status["ProxyAuthRequired"] = 407] = "ProxyAuthRequired";
    Status[Status["RequestTimeout"] = 408] = "RequestTimeout";
    Status[Status["Conflict"] = 409] = "Conflict";
    Status[Status["Gone"] = 410] = "Gone";
    Status[Status["LengthRequired"] = 411] = "LengthRequired";
    Status[Status["PreconditionFailed"] = 412] = "PreconditionFailed";
    Status[Status["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
    Status[Status["RequestURITooLong"] = 414] = "RequestURITooLong";
    Status[Status["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    Status[Status["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    Status[Status["ExpectationFailed"] = 417] = "ExpectationFailed";
    Status[Status["Teapot"] = 418] = "Teapot";
    Status[Status["MisdirectedRequest"] = 421] = "MisdirectedRequest";
    Status[Status["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    Status[Status["Locked"] = 423] = "Locked";
    Status[Status["FailedDependency"] = 424] = "FailedDependency";
    Status[Status["TooEarly"] = 425] = "TooEarly";
    Status[Status["UpgradeRequired"] = 426] = "UpgradeRequired";
    Status[Status["PreconditionRequired"] = 428] = "PreconditionRequired";
    Status[Status["TooManyRequests"] = 429] = "TooManyRequests";
    Status[Status["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    Status[Status["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    Status[Status["InternalServerError"] = 500] = "InternalServerError";
    Status[Status["NotImplemented"] = 501] = "NotImplemented";
    Status[Status["BadGateway"] = 502] = "BadGateway";
    Status[Status["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    Status[Status["GatewayTimeout"] = 504] = "GatewayTimeout";
    Status[Status["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
    Status[Status["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    Status[Status["InsufficientStorage"] = 507] = "InsufficientStorage";
    Status[Status["LoopDetected"] = 508] = "LoopDetected";
    Status[Status["NotExtended"] = 510] = "NotExtended";
    Status[Status["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(Status = exports.Status || (exports.Status = {}));
exports.STATUS_TEXT = new Map([
    [Status.Continue, "Continue"],
    [Status.SwitchingProtocols, "Switching Protocols"],
    [Status.Processing, "Processing"],
    [Status.EarlyHints, "Early Hints"],
    [Status.OK, "OK"],
    [Status.Created, "Created"],
    [Status.Accepted, "Accepted"],
    [Status.NonAuthoritativeInfo, "Non-Authoritative Information"],
    [Status.NoContent, "No Content"],
    [Status.ResetContent, "Reset Content"],
    [Status.PartialContent, "Partial Content"],
    [Status.MultiStatus, "Multi-Status"],
    [Status.AlreadyReported, "Already Reported"],
    [Status.IMUsed, "IM Used"],
    [Status.MultipleChoices, "Multiple Choices"],
    [Status.MovedPermanently, "Moved Permanently"],
    [Status.Found, "Found"],
    [Status.SeeOther, "See Other"],
    [Status.NotModified, "Not Modified"],
    [Status.UseProxy, "Use Proxy"],
    [Status.TemporaryRedirect, "Temporary Redirect"],
    [Status.PermanentRedirect, "Permanent Redirect"],
    [Status.BadRequest, "Bad Request"],
    [Status.Unauthorized, "Unauthorized"],
    [Status.PaymentRequired, "Payment Required"],
    [Status.Forbidden, "Forbidden"],
    [Status.NotFound, "Not Found"],
    [Status.MethodNotAllowed, "Method Not Allowed"],
    [Status.NotAcceptable, "Not Acceptable"],
    [Status.ProxyAuthRequired, "Proxy Authentication Required"],
    [Status.RequestTimeout, "Request Timeout"],
    [Status.Conflict, "Conflict"],
    [Status.Gone, "Gone"],
    [Status.LengthRequired, "Length Required"],
    [Status.PreconditionFailed, "Precondition Failed"],
    [Status.RequestEntityTooLarge, "Request Entity Too Large"],
    [Status.RequestURITooLong, "Request URI Too Long"],
    [Status.UnsupportedMediaType, "Unsupported Media Type"],
    [Status.RequestedRangeNotSatisfiable, "Requested Range Not Satisfiable"],
    [Status.ExpectationFailed, "Expectation Failed"],
    [Status.Teapot, "I'm a teapot"],
    [Status.MisdirectedRequest, "Misdirected Request"],
    [Status.UnprocessableEntity, "Unprocessable Entity"],
    [Status.Locked, "Locked"],
    [Status.FailedDependency, "Failed Dependency"],
    [Status.TooEarly, "Too Early"],
    [Status.UpgradeRequired, "Upgrade Required"],
    [Status.PreconditionRequired, "Precondition Required"],
    [Status.TooManyRequests, "Too Many Requests"],
    [Status.RequestHeaderFieldsTooLarge, "Request Header Fields Too Large"],
    [Status.UnavailableForLegalReasons, "Unavailable For Legal Reasons"],
    [Status.InternalServerError, "Internal Server Error"],
    [Status.NotImplemented, "Not Implemented"],
    [Status.BadGateway, "Bad Gateway"],
    [Status.ServiceUnavailable, "Service Unavailable"],
    [Status.GatewayTimeout, "Gateway Timeout"],
    [Status.HTTPVersionNotSupported, "HTTP Version Not Supported"],
    [Status.VariantAlsoNegotiates, "Variant Also Negotiates"],
    [Status.InsufficientStorage, "Insufficient Storage"],
    [Status.LoopDetected, "Loop Detected"],
    [Status.NotExtended, "Not Extended"],
    [Status.NetworkAuthenticationRequired, "Network Authentication Required"],
]);
