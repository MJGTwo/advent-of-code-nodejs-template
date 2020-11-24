import path from "path";
import { read, write, position } from "promise-path";

export const fromHere = position(__dirname);
export const report = async (...messages: string[]): Promise<void> =>
  console.log(
    `[${require(await fromHere("./package.json")).logName} / ${__filename
      .split(path.sep)
      .pop()
      ?.split(".ts")
      .shift()}]`,
    ...messages
  );

export const replaceInFile = async (
  filename: string,
  search: string | RegExp,
  replace: string
): Promise<any> => {
  const haystack: string = await read(filename, "utf8");
  const ashes: string = haystack.replace(search, replace);
  return write(filename, ashes, "utf8");
};
