import { Application } from "https://deno.land/x/oak/mod.ts";
import type { Context } from "https:/deno.land/x/oak/context.ts";

const app = new Application();

app.use((ctx: Context) => {
  ctx.response.body = "Hello World!";
});

export { app };
