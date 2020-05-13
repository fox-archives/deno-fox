import { join, dirname } from "https://deno.land/std/path/mod.ts";
import { copy } from "https://deno.land/std/fs/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts"
import type { IUserChoice } from "./prompts.ts"
import { getTemplatedFile } from "./template.ts";
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
  const parentDirname = dirname(writePath)
  await ensureDir(parentDirname)

  await writeTextFile(writePath, content);
}

export async function writeStarterFiles(
  userChoice: IUserChoice,
  templateOptions: object
): Promise<void> {
  const appString = await getTemplatedFile(
    `${userChoice.webFramework}/src/app.ejs`,
    templateOptions,
  )
  const serverString = await getTemplatedFile(
    `${userChoice.webFramework}/src/server.ejs`,
    templateOptions,
  );

  let ext = userChoice.language === "typescript" ? "ts" : "js"
  await writeTemplatedFile(`src/app.${ext}`, appString);
  await writeTemplatedFile(`src/server.${ext}`, serverString)
}
