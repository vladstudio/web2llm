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
  // Add other test configurations here, e.g.:
  // anotherTest: {
  //   testUrl: "https://example.com/another-page",
  //   expectedOutputPath: "test/fixtures/another.expected.md",
  // }
};

// Remove the loop that resolves to absolute paths

export default config;
