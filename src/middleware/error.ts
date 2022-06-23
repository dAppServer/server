import { isHttpError, Status } from "../../deps.ts";
import { Context } from "../types.ts";

const errorMiddleware = async (ctx: Context, next: any) => {
  try {
    await next();
  } catch (err) {
    let message = err.message;
    const status = err.status || err.statusCode || Status.InternalServerError;

    /**
     * considering all unhandled errors as internal server error,
     * do not want to share internal server errors to
     * end user in non "development" mode
     */
    if (!isHttpError(err)) {
      message = Deno.env.get('DEV') ? message : "Internal Server Error";
    }

    if (Deno.env.get('DEV')) {
      console.log(err);
    }

   // ctx.response.status = status;
   // ctx.response.body = { status, message };
  }
};

export { errorMiddleware };
