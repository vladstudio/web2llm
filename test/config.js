import path from "node:path";

const config = {
  mdn: {
    testUrl:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website",
    expectedFileName: "mdn.expected.md",
  },
  mdnText: {
    testUrl:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website",
    expectedFileName: "mdn-text.expected.md",
  },
  // Add other test configurations here, e.g.:
  // anotherTest: {
  //   testUrl: "https://example.com/another-page",
  //   expectedFileName: "another.expected.md",
  // }
};

// Resolve full paths for expected files
for (const key in config) {
  config[key].expectedOutputPath = path.resolve(
    process.cwd(),
    "test",
    "fixtures",
    config[key].expectedFileName
  );
}

export default config;
