import { read, write, position } from "promise-path";

export const fromHere = (directory = __dirname): string => position(directory);
export const report = (...messages: string[]): void =>
  console.log(
    `[${require(fromHere("./package.json")).logName} / ${__filename
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
