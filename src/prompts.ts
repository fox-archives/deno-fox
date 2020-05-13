import { Select } from "https://raw.githubusercontent.com/eankeen/deno-cliffy/master/mod.ts";

export async function promptUser(): Promise<{
  language: string;
  isWebFramework: boolean;
  webFramework: string | undefined;
}> {
  const language: string = <string> await Select.prompt({
    message: "What is your language of choice?",
    options: [
      { value: "typescript", name: "Typescript (recommended)" },
      { value: "javascript", name: "Javascript" },
    ],
  });

  const webFramework: string = <string> await Select.prompt({
    message: "framework your web server?",
    options: [
      { value: "oak", name: "Oak (github.com/oakserver/oak) (>620 stars)" },
      { value: "abc", name: "abc (github.com/zhmushan/abs) (>216 stars)" },
      { value: "pogo", name: "pogo (github.com/sholladay/pogo) (>140 stars)" },
      {
        value: "alosaur",
        name: "Alosaur (github.com/alosaur/alosaur) (>131 stars)",
      },
    ],
  });

  return {
    language,
    isWebFramework: true,
    webFramework,
  };
}
