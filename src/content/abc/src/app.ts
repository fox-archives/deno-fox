import { Application } from "https://deno.land/x/abc/mod.ts";
import type { Context } from "https://deno.land/x/abc/context.ts";

const app = new Application();

app
  .get("/hello", (c: Context) => {
    return "Hello, Abc!";
  })

export { app }
