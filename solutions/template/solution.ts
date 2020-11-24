import { read } from "promise-path";
import { fromHere, report } from "../../util";

export async function run(day: string) {
  console.log("why am i running");
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  await solveForFirstStar(input);
  await solveForSecondStar(input);
}

async function solveForFirstStar(input) {
  const solution = "UNSOLVED";
  report("Input:", input);
  report("Solution 1:", solution);
}

async function solveForSecondStar(input) {
  const solution = "UNSOLVED";
  report("Solution 2:", solution);
}
