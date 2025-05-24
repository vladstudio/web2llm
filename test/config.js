const config = {
  mdn: {
    testUrl:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website",
    expectedOutputPath: "test/fixtures/mdn.expected.md",
  },
  mdnText: {
    testUrl:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website",
    expectedOutputPath: "test/fixtures/mdn-text.expected.md",
  },
  // Simple test with faster URL for quick validation
  simple: {
    testUrl: "https://example.com",
    expectedOutputPath: "test/fixtures/simple.expected.md",
  }
};

// Remove the loop that resolves to absolute paths

export default config;
