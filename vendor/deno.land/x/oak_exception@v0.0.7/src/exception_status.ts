// deno-lint-ignore-file no-explicit-any
import { Status, STATUS_TEXT } from "../deps.ts";

const isString = (fn: any) => typeof fn === "string";
const isObject = (fn: any) => fn && typeof fn === "object";

export class HttpException extends Error {
  private response: any;
  public status: number;

  constructor(response: any, status: number) {
    super();
    this.response = response;
    this.status = status;
    this.initMessage();
  }
  initMessage() {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (
      isObject(this.response) &&
      isString(this.response.message)
    ) {
      this.message = this.response.message;
    } else if (this.constructor) {
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(" ");
    }
  }
  static createBody(
    objectOrError: any,
    description: string,
    statusCode: number,
  ) {
    if (!objectOrError) {
      return { statusCode, message: description };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: description };
  }
}

// 401
export class UnauthorizedException extends HttpException {
  constructor(
    objectOrError: any,
    description = STATUS_TEXT.get(Status.Unauthorized),
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description!,
        Status.Unauthorized,
      ),
      Status.Unauthorized,
    );
  }
}

// 500
export class IternalServerException extends HttpException {
  constructor(
    objectOrError: any,
    description = STATUS_TEXT.get(Status.InternalServerError),
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description!,
        Status.InternalServerError,
      ),
      Status.InternalServerError,
    );
  }
}

// 404
export class NotFoundException extends HttpException {
  constructor(
    objectOrError: any,
    description = STATUS_TEXT.get(Status.NotFound),
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description!,
        Status.NotFound,
      ),
      Status.NotFound,
    );
  }
}

// 403
export class ForbiddenException extends HttpException {
  constructor(
    objectOrError: any,
    description = STATUS_TEXT.get(Status.Forbidden),
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description!,
        Status.Forbidden,
      ),
      Status.Forbidden,
    );
  }
}

// 400
export class BadRequestException extends HttpException {
  constructor(
    objectOrError: any,
    description = STATUS_TEXT.get(Status.BadRequest),
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description!,
        Status.BadRequest,
      ),
      Status.BadRequest,
    );
  }
}

// 400
export class BodyParamValidationException extends BadRequestException {
  constructor(objectOrError: any, description = "params not valid") {
    super(objectOrError, description);
  }
}

// 502
export class BadGatewayException extends HttpException {
  constructor(
    objectOrError: any,
    description = STATUS_TEXT.get(Status.BadGateway),
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description!,
        Status.BadGateway,
      ),
      Status.BadGateway,
    );
  }
}
