#!/usr/bin/env node

import { execSync } from "node:child_process";
import config from "./test/config.js"; // Import the central config object

const testIds = Object.keys(config);

if (testIds.length === 0) {
  console.log("No tests defined in test/config.js.");
  process.exit(0);
}

console.log(`Found ${testIds.length} tests in config. Updating fixtures...`);

// Process each test configuration sequentially
// Using a simple loop instead of Promise.all for sequential execution
for (const testId of testIds) {
  console.log(`\nProcessing test: ${testId}`);
  const testConfig = config[testId];

  if (!testConfig.testUrl || !testConfig.expectedOutputPath) {
    console.warn(
      `Skipping "${testId}": Missing testUrl or expectedOutputPath in config.`
    );
    continue; // Skip to the next test
  }

  try {
    const { testUrl, expectedOutputPath } = testConfig;

    // Construct the command
    let command = `node crawl.js -u "${testUrl}"`; // Start building command

    // Add -t flag specifically for mdnText test
    if (testId === "mdnText") {
      command += " -t";
    }

    command += ` -o "${expectedOutputPath}"`; // Add output path

    console.log(`Executing: ${command}`);
    // Execute the crawl command to update the fixture file
    execSync(command, { encoding: "utf-8", stdio: "inherit", timeout: 120000 }); // 120 seconds timeout
    console.log(`Successfully updated: ${expectedOutputPath}`);
  } catch (error) {
    console.error(
      `Failed to update fixture for test "${testId}":`,
      error.message
    );
    // Optionally, log more details like stderr if needed
    // if (error.stderr) console.error("STDERR:", error.stderr);
    // Decide if one failure should stop the whole script or just report and continue
    // process.exit(1); // Uncomment to stop on first error
  }
}

console.log("\nFixture update process complete.");
