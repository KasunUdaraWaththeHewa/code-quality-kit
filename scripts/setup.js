const {
  existsSync,
  mkdirSync,
  writeFileSync,
  cpSync,
  readFileSync,
} = require("fs");
const { execSync } = require("child_process");

const isWindows = process.platform === "win32";

const configFile = ".codequalityrc.json";
const defaultSettings = {
  husky: true,
  eslint: true,
  prettier: true,
  commitlint: true,
  ci: true,
};

let settings = { ...defaultSettings };

function logStep(msg) {
  console.log("\x1b[36m%s\x1b[0m", "▶ " + msg);
}

function logSuccess(msg) {
  console.log("\x1b[32m%s\x1b[0m", "✅ " + msg);
}

function logWarning(msg) {
  console.warn("\x1b[33m%s\x1b[0m", "⚠ " + msg);
}

function logError(msg) {
  console.error("\x1b[31m%s\x1b[0m", "❌ " + msg);
}

logStep("Checking configuration file...");

if (existsSync(configFile)) {
  try {
    const userConfig = JSON.parse(readFileSync(configFile, "utf-8"));
    settings = { ...settings, ...userConfig };
    logSuccess(".codequalityrc.json loaded and parsed.");
  } catch (error) {
    logWarning("Invalid .codequalityrc.json. Using defaults.");
  }
} else {
  logWarning(".codequalityrc.json not found. Using defaults.");
}

const configDir = "./node_modules/code-quality-kit/config";
const workflowsDir = "./node_modules/code-quality-kit/.github/workflows";

if (settings.husky) {
  try {
    // Auto husky install (if not already initialized)
    try {
      if (!existsSync(".husky")) {
        logStep("Auto-installing Husky...");
        execSync("npx husky install");
        logSuccess("Husky installed.");
      }
    } catch (e) {
      logWarning("Husky auto-install failed: " + e.message);
    }

    logStep("Setting up Husky hooks...");
    if (!existsSync(".husky")) {
      execSync("npx husky install");
    }
    const huskyPreCommitPath = ".husky/pre-commit";

    // Create the hook with custom content
    execSync(`npx husky add ${huskyPreCommitPath} ""`);

    writeFileSync(
      huskyPreCommitPath,
      `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔧 Running Prettier..."
npx prettier --write .

echo "🔍 Running ESLint..."
npx eslint . --fix

echo "🎯 Running lint-staged..."
npx lint-staged
`,
    );

    if (!isWindows) {
      execSync(`chmod +x ${huskyPreCommitPath}`);
    } else {
      logWarning("Skipping chmod on Windows.");
    }

    if (settings.commitlint) {
      execSync('npx husky add .husky/commit-msg "npx commitlint --edit $1"');
    }
    logSuccess("Husky hooks configured.");
  } catch (e) {
    logError("Failed to set up Husky: " + e.message);
  }
}

if (settings.ci) {
  try {
    logStep("Copying GitHub Actions workflow...");
    if (!existsSync(".github/workflows")) {
      mkdirSync(".github/workflows", { recursive: true });
    }
    cpSync(
      workflowsDir + "/quality-check.yml",
      ".github/workflows/quality-check.yml",
    );
    logSuccess("GitHub Actions workflow configured.");
  } catch (e) {
    logError("Failed to copy CI workflow: " + e.message);
  }
}

if (settings.prettier) {
  writeFileSync(
    ".prettierrc.js",
    `module.exports = require('${configDir}/prettier.js');\n`,
  );
  logSuccess("Prettier config applied.");
}

if (settings.eslint) {
  writeFileSync(
    ".eslintrc.js",
    `module.exports = require('${configDir}/eslint.js');\n`,
  );
  logSuccess("ESLint config applied.");
}

writeFileSync(
  "lint-staged.config.js",
  `module.exports = require('${configDir}/lint-staged.js');\n`,
);
logSuccess("Lint-staged config applied.");

if (settings.commitlint) {
  writeFileSync(
    "commitlint.config.js",
    `module.exports = require('${configDir}/commitlint.js');\n`,
  );
  logSuccess("Commitlint config applied.");
}

logSuccess("✅ Code quality setup complete based on config.");
