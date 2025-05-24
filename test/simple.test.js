import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import config from "./config.js";

const { testUrl, expectedOutputPath } = config.simple;

describe("web2llm.js Simple E2E test", () => {
  const outputFileName = "test-output-simple.md";
  const actualOutputPath = path.resolve(process.cwd(), outputFileName);

  const cleanup = () => {
    if (fs.existsSync(actualOutputPath)) {
      fs.unlinkSync(actualOutputPath);
    }
  };

  before(cleanup);
  after(cleanup);

  it("should generate markdown for simple URL using Kadoa API", () => {
    const command = `node web2llm.js -u "${testUrl}" -o ${outputFileName}`;

    try {
      // Execute the crawl command with Kadoa API timeout
      execSync(command, { encoding: "utf-8", timeout: 300000 });

      // Check if the output file was created
      assert.ok(
        fs.existsSync(actualOutputPath),
        `Output file ${outputFileName} was not created.`
      );

      // Read actual content
      const actualContent = fs.readFileSync(actualOutputPath, "utf-8");

      // Basic validation - ensure content exists and is not empty
      assert.ok(
        actualContent.trim().length > 0,
        "Generated markdown should not be empty."
      );

      // Check for basic markdown structure
      assert.ok(
        actualContent.includes("# ") || actualContent.includes("## "),
        "Generated markdown should contain headers."
      );
    } catch (error) {
      console.error("Test failed during execution:", error);
      if (error.stdout) console.error("STDOUT:", error.stdout);
      if (error.stderr) console.error("STDERR:", error.stderr);
      assert.fail(`Test execution failed: ${error.message}`);
    }
  });
});