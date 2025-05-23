# AGENT.md - Development Guide

## Commands
- **Test all**: `npm test` (uses Node.js built-in test runner)
- **Test single file**: `node --test test/mdn.test.js`
- **Run main script**: `node web2llm.js -u <URL> [options]`
- **Install Playwright browsers**: `npx playwright install chromium`
- **No build/lint/typecheck**: Project uses vanilla JS without build steps

## Code Style
- ES modules (`"type": "module"` in package.json)
- Use `import` statements (not `require`)
- File imports with `.js` extension (ES module requirement)
- camelCase for variables and functions
- Prefer `const`/`let` over `var`
- Use template literals for strings with variables
- Async/await preferred over Promise chains

## Testing
- Uses Node.js built-in test runner (`node:test`)
- Test files: `test/**/*.test.js`
- Test config in `test/config.js` with expected output fixtures
- E2E tests execute CLI and compare with expected markdown files
- Clean up temporary files in `before`/`after` hooks
- Use `execSync` with timeout for CLI execution tests

## Error Handling
- Log errors with descriptive messages using `console.error`
- Use try/catch blocks for async operations
- Exit with proper codes: `process.exit(1)` for errors, `process.exit(0)` for clean exit
- Validate URLs with `new URL()` constructor