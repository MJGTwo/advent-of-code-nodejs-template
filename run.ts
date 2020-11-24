const solutionId = process.argv[2];

const runSolution = () => require(`./solutions/${solutionId}/solution.ts`);

const copyCodeTemplate = async () => {
  try {
    await require("./copy-template.ts");
    await runSolution();
  } catch (ex) {
    console.error(
      `Unable to run solution for '${solutionId}': ${ex}`,
      ex.stack
    );
  }
};

const start = async () => {
  try {
    await runSolution();
  } catch (ex) {
    if (!solutionId) {
      console.error(
        "No solution ID provided; please re-run with an argument, e.g.: npm start day1, or: node run day1"
      );
    } else {
      await copyCodeTemplate();
    }
  }
};

start();
