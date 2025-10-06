const { execSync } = require("node:child_process");
const { dependencies } = require("../lib/package.json");

execSync(
  `pnpm update --latest -r ${Object.keys(dependencies)
    .map((dep) => `"\\!${dep}"`)
    .join(" ")}`,
);
