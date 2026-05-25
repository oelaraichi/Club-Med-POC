const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function quoteArg(arg) {
  if (/^[\w@:/.=+-]+$/.test(arg)) {
    return arg;
  }

  return `"${String(arg).replace(/"/g, '\\"')}"`;
}

function runWithRobot(command, label) {
  const frames = ["[robot |]", "[robot /]", "[robot -]", "[robot \\\\]"];

  return new Promise((resolve) => {
    let frameIndex = 0;
    let timer;

    if (process.stdout.isTTY) {
      process.stdout.write(`${label} ${frames[frameIndex]}`);
      timer = setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length;
        process.stdout.write(`\r${label} ${frames[frameIndex]}`);
      }, 120);
    } else {
      console.log(`${label} (running)`);
    }

    const child = spawn(command, {
      shell: true,
      stdio: "inherit",
    });

    const finish = (code) => {
      if (timer) {
        clearInterval(timer);
        const status = code === 0 ? "done" : "failed";
        process.stdout.write(`\r${label} [${status}]          \n`);
      }
      resolve(typeof code === "number" ? code : 1);
    };

    child.on("close", finish);
    child.on("error", () => finish(1));
  });
}

async function main() {
  const userArgs = process.argv.slice(2).map(quoteArg).join(" ");

  const cucumberCommand = [
    "npx cucumber-js",
    "--format summary",
    "--format allure-cucumberjs/reporter",
    userArgs,
  ]
    .filter(Boolean)
    .join(" ");

  const testExitCode = await runWithRobot(cucumberCommand, "[QA] Test robot");

  const resultsDir = path.join(process.cwd(), "reports", "allure-results");
  if (!fs.existsSync(resultsDir)) {
    console.error(
      "[QA] Missing reports/allure-results. Check cucumber.js reporter configuration.",
    );
    process.exit(testExitCode !== 0 ? testExitCode : 1);
  }

  const allureExitCode = await runWithRobot(
    "npx allure generate reports/allure-results --clean -o reports/allure-report",
    "[QA] Report robot",
  );

  if (allureExitCode === 0) {
    console.log("[QA] Allure report generated: reports/allure-report/index.html");
  }

  if (testExitCode !== 0) {
    process.exit(testExitCode);
  }

  process.exit(allureExitCode);
}

main().catch(() => {
  process.exit(1);
});
