import { Spinner } from "./deps.ts";
import { getColorEnabled, cyan } from "https://deno.land/std/fmt/colors.ts";
import { promptUser } from "./src/prompts.ts";
import type { IUserChoice } from "./src/prompts.ts";
import { getTemplatedFile } from "./src/template.ts";
import { writeTemplatedFile, writeStarterFiles } from "./src/write.ts";

const { exit } = Deno

if (!import.meta.main) console.log('something happened'), exit(1)


let print = (text: string): void =>
  getColorEnabled() ? console.log(cyan(text)) : console.log(text);

print(`
_,-=._              /|_/|
  \`-.}   \`=._,.-=-._.,  @ @._,
     \`._ _,-.   )      _,.-'
        \`    G.m-"^m\`m'
`);
print(
  "Haii!! This foxxo will help you bootstrap a Deno web project. Answer some questions, and your project will be created! ^w^",
);

const userChoice: IUserChoice = await promptUser();

const templateDefaults = {
  nl: "\n",
  main: "src/main.ts",
  flags: false,
  allow: {
    read: false,
    write: false,
    net: false,
  },
};

let templateOptions = {};
if (userChoice.webFramework) {
  templateOptions = {
    ...templateDefaults,
    main: "src/server.ts",
    isTs: userChoice.language === "typescript",
    framework: userChoice.webFramework,
    allow: {
      read: true,
      net: true,
    },
  };
}

let string = await getTemplatedFile(
  "scripts.yaml.ejs",
  templateOptions,
);
await writeTemplatedFile("scripts.yaml", string);

await writeStarterFiles(userChoice, templateOptions);
