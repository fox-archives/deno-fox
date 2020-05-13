import { renderFile } from "https://deno.land/x/dejs@0.4.0/mod.ts";
import { join, dirname } from "https://deno.land/std/path/mod.ts";

const readerToString = async (reader: Deno.Reader) =>
  new TextDecoder().decode(await Deno.readAll(reader));

export const getTemplatedFile = async (
  file: string,
  opts: object,
): Promise<string> => {
  const absoluteFilePath = join(
    dirname(new URL(import.meta.url).pathname),
    "content",
    file,
  );
  return await readerToString(await renderFile(absoluteFilePath, opts));
};
