import { app } from "./app.ts";

app
  .start({ port: Deno.env.get("PORT") ?? 3000 });
