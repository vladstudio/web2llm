import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import config from "./config.js"; // Import central config

// Get MDN Text specific config - NOTE: This needs to be added to config.js
const { testUrl, expectedOutputPath } = config.mdnText;

// extract markdown content after YAML frontmatter
const extractMarkdownContent = (content) => {
  const parts = content.split("---");
  // Expecting --- frontmatter --- content
  if (parts.length >= 3) {
    // Join parts after the second '---' separator
    return parts.slice(2).join("---").trim();
  }
  // If no frontmatter, return the whole content
  return content.trim();
};

describe("crawl.js E2E tests for MDN Text", () => {
  const outputFileName = "test-output-mdn-text.md"; // Temporary file generated by the test
  const actualOutputPath = path.resolve(process.cwd(), outputFileName); // Output file in root CWD
  // expectedOutputPath is imported from config

  const cleanup = () => {
    if (fs.existsSync(actualOutputPath)) {
      fs.unlinkSync(actualOutputPath);
    }
  };

  // Clean up before tests run (in case previous run failed)
  before(cleanup);

  // Clean up after tests run
  after(cleanup);

  it("should generate correct markdown with links stripped (default behavior) for MDN page", () => {
    // -t flag removed, as stripping links is now the default
    const command = `node crawl.js -u "${testUrl}" -o ${outputFileName}`;

    try {
      // Execute the crawl command
      // Increase timeout if needed via execSync options
      execSync(command, { encoding: "utf-8", timeout: 60000 }); // 60 seconds timeout

      // Check if the output file was created
      assert.ok(
        fs.existsSync(actualOutputPath),
        `Output file ${outputFileName} was not created.`
      );

      // Read expected and actual content
      const expectedContent = fs.readFileSync(expectedOutputPath, "utf-8");
      const actualContent = fs.readFileSync(actualOutputPath, "utf-8");

      // Extract markdown parts (still relevant if frontmatter is added by crawl.js even with -t)
      const expectedMarkdown = extractMarkdownContent(expectedContent);
      const actualMarkdown = extractMarkdownContent(actualContent);

      // Compare the markdown content
      assert.strictEqual(
        actualMarkdown,
        expectedMarkdown,
        "Generated text markdown does not match expected markdown."
      );
    } catch (error) {
      // Log error details for easier debugging
      console.error("Test failed during execution:", error);
      if (error.stdout) console.error("STDOUT:", error.stdout);
      if (error.stderr) console.error("STDERR:", error.stderr);
      // Re-throw the error to fail the test using assert.fail
      assert.fail(`Test execution failed: ${error.message}`);
    }
  });
});
