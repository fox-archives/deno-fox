import Spinner from 'https://raw.githubusercontent.com/ameerthehacker/cli-spinners/master/mod.ts';
// import { Input } from 'https://deno.land/x/cliffy/mod.ts'
import { Select } from 'https://raw.githubusercontent.com/eankeen/deno-cliffy/master/mod.ts'
import { getColorEnabled, cyan } from 'https://deno.land/std/fmt/colors.ts'
import * as dejs from 'https://deno.land/x/dejs@0.4.0/mod.ts';

type result = string | undefined

let print = (text: string): void => getColorEnabled() ? console.log(cyan(text)) : console.log(text)

print(`
_,-=._              /|_/|
  \`-.}   \`=._,.-=-._.,  @ @._,
     \`._ _,-.   )      _,.-'
        \`    G.m-"^m\`m'
`)
print('Haii!! This foxxo will help you bootstrap a Deno web project. First answer a few questions, and your project will be created')


const language: result = await Select.prompt({
  message: "What is your language of choice?",
  options: [
    "Typescript (recommended)",
    "Javascript"
  ],
});

const webFramework: result = await Select.prompt({
  message: "Select your web server?",
  options: [
    "Oak (github.com/oakserver/oak) (>620 stars)",
    "abc (github.com/zhmushan/abs) (>216 stars)",
    "pogo (github.com/sholladay/pogo) (>140 stars)",
    "Alosaur (github.com/alosaur/alosaur) (>131 stars)"
  ],
});

// const spinner = Spinner.getInstance();
// spinner.setSpinnerType("bouncingBar");
// spinner.start(cyan('Okay thankies! ^w^ Generating project...'));

// async function bufToStr(buf: Deno.Buffer): Promise<string> {
//   return (new TextDecoder()).decode(await Deno.readAll(buf));
// }

// const output: Deno.Reader = await dejs.renderFile('./src/templates/velociraptor/scripts.yaml.ejs', {})
// const buf = new Deno.Buffer();
// await buf.readFrom(output);
// const string = await bufToStr(buf);

let readerToString = async (reader: Deno.Reader) => new TextDecoder().decode(await Deno.readAll(reader));
let getTemplatedFile = async (file: string): Promise<string> => await readerToString(
  await dejs.renderFile(file, {}),
);

let string = await getTemplatedFile("./src/templates/velociraptor/scripts.yaml.ejs");
console.log(string);


// const buf = new Deno.Buffer(ab);
// await buf.readFrom(output)
// const uint8arr = new Uint8Array(500)
// await buf.write(uint8arr)
// const decoder = new TextDecoder('utf8')
// const string = decoder.decode(uint8arr)
