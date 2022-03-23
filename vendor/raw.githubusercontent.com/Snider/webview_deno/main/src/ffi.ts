import { CachePolicy, download, prepare } from "../deps.ts";

const version = "0.7.0-pre.1";
const policy = Deno.env.get("PLUGIN_URL") === undefined
  ? CachePolicy.STORE
  : CachePolicy.NONE;

const url = Deno.env.get("PLUGIN_URL") ?? `https://github.com/Snider/webview_deno/releases/download/${version}`

const urls = {
      darwin: `${url}/libwebview_deno.${Deno.build.arch}.dylib`,
      windows: `${url}/webview_deno.${Deno.build.arch}.dll`,
      linux: `${url}/libwebview_deno.${Deno.build.arch}.so`,
};

if (Deno.build.os === "windows") {
  const webview2loader = await download(`${url}/WebView2Loader.dll`);
  await Deno.copyFile(webview2loader, "./WebView2Loader.dll");

  // deno-lint-ignore no-window-prefix
  if (typeof window !== "undefined") window.addEventListener("unload", unload);
}

export function unload() {
  lib.close();
  if (Deno.build.os === "windows") {
    Deno.removeSync("./WebView2Loader.dll");
  }
}

const lib = await prepare({
  name: "webview_deno",
  urls,
  policy,
}, {
  "deno_webview_create": {
    parameters: ["i32", "pointer"],
    result: "pointer",
  },
  "deno_webview_destroy": {
    parameters: ["pointer"],
    result: "void",
  },
  "deno_webview_run": {
    parameters: ["pointer"],
    result: "void",
  },
  "deno_webview_terminate": {
    parameters: ["pointer"],
    result: "void",
  },
  "deno_webview_dispatch": {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  "deno_webview_set_title": {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  "deno_webview_get_window": {
    parameters: ["pointer"],
    result: "pointer",
  },
  "deno_webview_set_size": {
    parameters: ["pointer", "i32", "i32", "i32"],
    result: "void",
  },
  "deno_webview_navigate": {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  "deno_webview_eval": {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  "deno_webview_init": {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  "deno_webview_bind": {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  "deno_webview_return": {
    parameters: ["pointer", "pointer", "i32", "pointer"],
    result: "void",
  },
  "deno_webview_get_recv": {
    parameters: [],
    result: "pointer",
    nonblocking: true,
  },
});

export default lib;
