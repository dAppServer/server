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
exports.__esModule = true;
exports.BadGatewayException = exports.BodyParamValidationException = exports.BadRequestException = exports.ForbiddenException = exports.NotFoundException = exports.IternalServerException = exports.UnauthorizedException = exports.HttpException = void 0;
var deps_ts_1 = require("../deps.ts");
var isString = function (fn) { return typeof fn === "string"; };
var isObject = function (fn) { return fn && typeof fn === "object"; };
var HttpException = (function (_super) {
    __extends(HttpException, _super);
    function HttpException(response, status) {
        var _this = _super.call(this) || this;
        _this.response = response;
        _this.status = status;
        _this.initMessage();
        return _this;
    }
    HttpException.prototype.initMessage = function () {
        if (isString(this.response)) {
            this.message = this.response;
        }
        else if (isObject(this.response) &&
            isString(this.response.message)) {
            this.message = this.response.message;
        }
        else if (this.constructor) {
            this.message = this.constructor.name
                .match(/[A-Z][a-z]+|[0-9]+/g)
                .join(" ");
        }
    };
    HttpException.createBody = function (objectOrError, description, statusCode) {
        if (!objectOrError) {
            return { statusCode: statusCode, message: description };
        }
        return isObject(objectOrError) && !Array.isArray(objectOrError)
            ? objectOrError
            : { statusCode: statusCode, message: objectOrError, error: description };
    };
    return HttpException;
}(Error));
exports.HttpException = HttpException;
var UnauthorizedException = (function (_super) {
    __extends(UnauthorizedException, _super);
    function UnauthorizedException(objectOrError, description) {
        if (description === void 0) { description = deps_ts_1.STATUS_TEXT.get(deps_ts_1.Status.Unauthorized); }
        return _super.call(this, HttpException.createBody(objectOrError, description, deps_ts_1.Status.Unauthorized), deps_ts_1.Status.Unauthorized) || this;
    }
    return UnauthorizedException;
}(HttpException));
exports.UnauthorizedException = UnauthorizedException;
var IternalServerException = (function (_super) {
    __extends(IternalServerException, _super);
    function IternalServerException(objectOrError, description) {
        if (description === void 0) { description = deps_ts_1.STATUS_TEXT.get(deps_ts_1.Status.InternalServerError); }
        return _super.call(this, HttpException.createBody(objectOrError, description, deps_ts_1.Status.InternalServerError), deps_ts_1.Status.InternalServerError) || this;
    }
    return IternalServerException;
}(HttpException));
exports.IternalServerException = IternalServerException;
var NotFoundException = (function (_super) {
    __extends(NotFoundException, _super);
    function NotFoundException(objectOrError, description) {
        if (description === void 0) { description = deps_ts_1.STATUS_TEXT.get(deps_ts_1.Status.NotFound); }
        return _super.call(this, HttpException.createBody(objectOrError, description, deps_ts_1.Status.NotFound), deps_ts_1.Status.NotFound) || this;
    }
    return NotFoundException;
}(HttpException));
exports.NotFoundException = NotFoundException;
var ForbiddenException = (function (_super) {
    __extends(ForbiddenException, _super);
    function ForbiddenException(objectOrError, description) {
        if (description === void 0) { description = deps_ts_1.STATUS_TEXT.get(deps_ts_1.Status.Forbidden); }
        return _super.call(this, HttpException.createBody(objectOrError, description, deps_ts_1.Status.Forbidden), deps_ts_1.Status.Forbidden) || this;
    }
    return ForbiddenException;
}(HttpException));
exports.ForbiddenException = ForbiddenException;
var BadRequestException = (function (_super) {
    __extends(BadRequestException, _super);
    function BadRequestException(objectOrError, description) {
        if (description === void 0) { description = deps_ts_1.STATUS_TEXT.get(deps_ts_1.Status.BadRequest); }
        return _super.call(this, HttpException.createBody(objectOrError, description, deps_ts_1.Status.BadRequest), deps_ts_1.Status.BadRequest) || this;
    }
    return BadRequestException;
}(HttpException));
exports.BadRequestException = BadRequestException;
var BodyParamValidationException = (function (_super) {
    __extends(BodyParamValidationException, _super);
    function BodyParamValidationException(objectOrError, description) {
        if (description === void 0) { description = "params not valid"; }
        return _super.call(this, objectOrError, description) || this;
    }
    return BodyParamValidationException;
}(BadRequestException));
exports.BodyParamValidationException = BodyParamValidationException;
var BadGatewayException = (function (_super) {
    __extends(BadGatewayException, _super);
    function BadGatewayException(objectOrError, description) {
        if (description === void 0) { description = deps_ts_1.STATUS_TEXT.get(deps_ts_1.Status.BadGateway); }
        return _super.call(this, HttpException.createBody(objectOrError, description, deps_ts_1.Status.BadGateway), deps_ts_1.Status.BadGateway) || this;
    }
    return BadGatewayException;
}(HttpException));
exports.BadGatewayException = BadGatewayException;
