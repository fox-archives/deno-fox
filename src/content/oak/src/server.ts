import { app } from "./app.ts";

await app.listen({ port: Deno.env.get("PORT") ?? 3000 });
