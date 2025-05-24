#!/usr/bin/env node

import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import config from "./test/config.js";

/**
 * Script to update test fixture files with actual output from web2llm
 * using the new Kadoa API implementation.
 */

console.log("🔄 Updating test fixtures with Kadoa API output...\n");

// Process each test configuration
for (const [testName, testConfig] of Object.entries(config)) {
  console.log(`📝 Processing ${testName} test...`);
  
  const { testUrl, expectedOutputPath } = testConfig;
  const tempOutputFile = `temp-fixture-${testName}.md`;
  const tempOutputPath = path.resolve(process.cwd(), tempOutputFile);
  
  try {
    // Determine the command based on test type
    let command;
    if (testName === 'mdn') {
      // MDN test uses --href flag to keep links
      command = `node web2llm.js -u "${testUrl}" -c "${testUrl}" --href -o ${tempOutputFile}`;
    } else if (testName === 'mdnText') {
      // MDN text test strips links (default behavior)
      command = `node web2llm.js -u "${testUrl}" -c "${testUrl}" -o ${tempOutputFile}`;
    } else if (testName === 'simple') {
      // Simple test for example.com
      command = `node web2llm.js -u "${testUrl}" -o ${tempOutputFile}`;
    } else {
      console.log(`⚠️  Unknown test type: ${testName}, skipping...`);
      continue;
    }
    
    console.log(`   Running: ${command}`);
    
    // Execute the command with extended timeout for Kadoa API
    execSync(command, { 
      encoding: "utf-8", 
      timeout: 300000, // 5 minutes timeout
      stdio: 'inherit' // Show output in real-time
    });
    
    // Check if output file was created
    if (!fs.existsSync(tempOutputPath)) {
      console.error(`❌ Output file ${tempOutputFile} was not created for ${testName}`);
      continue;
    }
    
    // Read the generated content
    const newContent = fs.readFileSync(tempOutputPath, "utf-8");
    
    // Ensure the fixtures directory exists
    const fixturesDir = path.dirname(expectedOutputPath);
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }
    
    // Update the expected output file
    fs.writeFileSync(expectedOutputPath, newContent);
    console.log(`✅ Updated ${expectedOutputPath}`);
    
    // Clean up temporary file
    fs.unlinkSync(tempOutputPath);
    
  } catch (error) {
    console.error(`❌ Failed to update ${testName} fixture:`, error.message);
    if (error.stdout) console.error("STDOUT:", error.stdout);
    if (error.stderr) console.error("STDERR:", error.stderr);
    
    // Clean up temporary file if it exists
    if (fs.existsSync(tempOutputPath)) {
      fs.unlinkSync(tempOutputPath);
    }
    
    // Continue with other tests instead of exiting
    continue;
  }
}

console.log("\n🎉 Fixture update process completed!");
console.log("💡 Run 'npm test' to verify all tests pass with the updated fixtures.");