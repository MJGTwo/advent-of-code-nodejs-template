import express from "express";
import { find, write } from "promise-path";
import { fromHere, report } from "../util";

const app = express();
import packageData from "../package.json";

async function generateIndexHTML() {
  const title: string = packageData.logName;
  const here: string = await fromHere("../");
  const solutions = await find(await fromHere("/*"));
  const links = solutions
    .filter((n) => n.indexOf(".ts") === -1 && n.indexOf(".html") === -1)
    .map((solution) => {
      const folder = solution.substr(here.length);
      return `      <li><a href="/${folder}/viewer.html">${folder}</a></li>`;
    });

  const html = `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <style> html, body { font-family: sans-serif; }</style>
  </head>
  <body>
    <h1>${title}</h1>
    <ul>
${links.join("\n")}
    </ul>
  </body>
</html>
  `;

  report("Updated hard coded index:", await fromHere("index.html"));
  await write(fromHere("index.html"), html, "utf8");

  return html;
}

app.use("/solutions", async () => express.static(await fromHere("")));

app.get("/", async (req, res) => {
  const html = await generateIndexHTML();
  res.send(html);
});

const port = 8080;
app.listen(port, () => report(`Listening on http://localhost:${port}/`));
