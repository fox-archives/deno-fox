const { writeTextFile } = Deno;
import { join, dirname } from "https://deno.land/std/path/mod.ts";

export async function writeTemplatedFile(
  filePath: string,
  content: string,
): Promise<void> {
  let absoluteFilePath: string;
  const env = Deno.env.get("DENO_ENV");
  if (env === "test") {
    absoluteFilePath = join(
      dirname(new URL(import.meta.url).pathname),
      "../test/fixtures",
      filePath,
    );
  } else if (env === "development") {
    absoluteFilePath = join(
      dirname(new URL(import.meta.url).pathname),
      "../tmp",
      filePath,
    );
  } else {
    absoluteFilePath = join(Deno.cwd(), filePath);
  }
  await writeTextFile(absoluteFilePath, content);
}
