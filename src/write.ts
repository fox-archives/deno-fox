import { join, dirname } from "https://deno.land/std/path/mod.ts";
import { copy } from "https://deno.land/std/fs/mod.ts";
import type { starterWebFrameworkNames } from './@types/defs.d.ts';

const { writeTextFile } = Deno;

let currentDir = dirname(new URL(import.meta.url).pathname);

function getWriteDirectory(): string {
  const env = Deno.env.get("DENO_ENV");
  if (env === "test") {
    return join(
      currentDir,
      "../test/fixtures",
    );
  } else if (env === "development") {
    return join(
      currentDir,
      "../tmp",
    );
  } else {
    return join(Deno.cwd());
  }
}

export async function writeTemplatedFile(
  filePath: string,
  content: string,
): Promise<void> {
  const writePath = join(getWriteDirectory(), filePath)
  await writeTextFile(writePath, content);
}

export async function writeStarterFiles(
  starterName: starterWebFrameworkNames,
): Promise<void> {
  const from = join(currentDir, "content", starterName, "src");
  const to = join(getWriteDirectory(), "src");
  await copy(from, to);

}
