import fs from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';

// Helper function to extract markdown content after YAML frontmatter
const extractMarkdownContent = (content) => {
  const parts = content.split('---');
  // Expecting --- frontmatter --- content
  if (parts.length >= 3) {
    // Join parts after the second '---' separator
    return parts.slice(2).join('---').trim();
  }
  // If no frontmatter, return the whole content
  return content.trim();
};

describe('crawl.js E2E tests', () => {
  const outputFileName = 'test-output.md';
  const expectedFileName = 'test.md';
  const testUrl = 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website';
  const actualOutputPath = path.resolve(process.cwd(), outputFileName);
  const expectedOutputPath = path.resolve(process.cwd(), expectedFileName);

  // Clean up function
  const cleanup = () => {
    if (fs.existsSync(actualOutputPath)) {
      fs.unlinkSync(actualOutputPath);
    }
  };

  // Clean up before tests run (in case previous run failed)
  before(cleanup);

  // Clean up after tests run
  after(cleanup);

  // Note: node:test doesn't have a direct equivalent to Jest's per-test timeout
  // in the same way. Timeouts are typically handled at the runner level or via AbortController.
  // For simplicity, we rely on the default Node test runner timeout or configure it globally if needed.
  it('should generate correct markdown for MDN Getting Started page', () => {
    const command = `node crawl.js -u "${testUrl}" -o ${outputFileName}`;

    try {
      // Execute the crawl command
      // Increase timeout if needed via execSync options
      execSync(command, { encoding: 'utf-8', timeout: 60000 }); // 60 seconds timeout

      // Check if the output file was created
      assert.ok(fs.existsSync(actualOutputPath), `Output file ${outputFileName} was not created.`);

      // Read expected and actual content
      const expectedContent = fs.readFileSync(expectedOutputPath, 'utf-8');
      const actualContent = fs.readFileSync(actualOutputPath, 'utf-8');

      // Extract markdown parts
      const expectedMarkdown = extractMarkdownContent(expectedContent);
      const actualMarkdown = extractMarkdownContent(actualContent);

      // Compare the markdown content
      assert.strictEqual(actualMarkdown, expectedMarkdown, 'Generated markdown does not match expected markdown.');

    } catch (error) {
      // Log error details for easier debugging
      console.error('Test failed during execution:', error);
      if (error.stdout) console.error('STDOUT:', error.stdout);
      if (error.stderr) console.error('STDERR:', error.stderr);
      // Re-throw the error to fail the test using assert.fail
      assert.fail(`Test execution failed: ${error.message}`);
    }
  });
});
