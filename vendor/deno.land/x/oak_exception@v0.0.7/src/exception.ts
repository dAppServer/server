// Copyright 2021 the oak authors. All rights reserved. MIT license.
import type { Context, Logger, Middleware } from "./types.ts";

/** A middleware that will deal the exceptions when called, and set the response time for other middleware in
 * milliseconds as `X-Response-Time` which can be used for diagnostics and other
 * instrumentation of an application.  Utilise the middleware before the "real"
 * processing occurs.
 *
 * ```ts
 * import { anyExceptionFilter } from "https://deno.land/x/oak-middleware/mod.ts";
 * import { Application } from "https://deno.land/x/oak/mod.ts"
 *
 * const app = new App();
 * app.use(anyExceptionFilter({
 *  logger: console,
 *  isHeaderResponseTime: true,
 * }));
 *
 * // other middleware
 *
 * await app.listen(":80");
 * ```
 */
export const anyExceptionFilter = (options: {
  logger?: Logger;
  isHeaderResponseTime?: boolean;
  isDisableFormat404?: boolean;
} = {}) => {
  const { logger = console, isHeaderResponseTime, isDisableFormat404 } =
    options;
  const middleware: Middleware = async function (
    ctx: Context,
    next: () => Promise<unknown>,
  ) {
    const start = Date.now();
    try {
      await next();
      // 在这里可以很方便地拦截处理响应给前台的数据
      if (!isDisableFormat404) {
        if (ctx.response.body === undefined && ctx.response.status === 404) {
          ctx.response.body = get404Message();
          ctx.response.status = 404; // TODO 这里需要重新赋一下，否则状态码变成200了
        }
      }
    } catch (err) {
      logger.error("anyExceptionFilter", err);
      ctx.response.status = err.status || 500;
      ctx.response.body = err.message;
    } finally {
      const ms = Date.now() - start;
      logger.debug(
        `${ctx.request.method} ${ctx.request.url} [${ctx.response.status}] - ${ms}ms`,
      );
      if (isHeaderResponseTime) {
        ctx.response.headers.set("X-Response-Time", `${ms}ms`);
      }
    }
  };

  return middleware;
};

export function get404Message() {
  return `                
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>not find-404</title>
    <link rel="shortcut icon" href="favicon.ico">
        <style type="text/css">
    
    
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            font-family: 'Noto Sans TC', sans-serif;
    
        }
    
    
    
        .wrap9{
            margin: 220px 30px;
            background-color: #000;
        }
        .container9{
            width: 1300px;
            margin: auto;
            text-align: center;
        }
        .container9 h1{
            width:50%;
            display: inline-block;
            margin-top: 50px;
            box-sizing: border-box;
            font-size: 80px;
            background-color: #a00;
            color: #fff;
            margin-bottom: 0.5em;
            
           
        }
    
        .container9 .txt{
            flex-shrink: 0;
            box-sizing: border-box;
            color: #fff;
        }
        .container9 .txt P{
            display: inline-block;
            margin-bottom: 30px;
            font-size: 26px;
            padding: 0 100px;
        }
        .container9 .txt p:first-child:first-letter{
            font-size: 40px;
        }
    
    
    
        </style>
    </head>
    <body bgcolor="black">
        
        <div class="wrap9">
            <div class="container9">
                <h1>404 WARNING</h1>
                <div class="txt">
                    <p>This is not what you want, but we are very serious. I just want to tell you in a special way that the page you visited does not exist or the file is invalid. You can contact the webmaster to solve your problem faster, or return to the homepage of the website to browse other pages.</p>
                </div>
            </div>
        </div>
    
    </body>
    <!-- partial -->
      
    </body>
    </html>
    `;
}
