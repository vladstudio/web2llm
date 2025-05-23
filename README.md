# web2llm

A tiny CLI app that crawls web pages starting from given URLs, scrapes main content, converts to Markdown, and merges into one file. Features automatic content detection, crawl scoping, limits, exclusions, and GFM table conversion.

## Prerequisites

- Node.js and npm installed.

## Installation

1.  Clone/download files (`web2llm.js`, `package.json`).
2.  In the script's directory, run: `npm install`

## Usage

```bash
node web2llm.js -u <URL1> [-u <URL2>...] [OPTIONS]
```

**Arguments:**

- `-u`, `--url` (Required): One or more starting URLs.
- `-o`, `--output`: Output file name (default: `output.md`).
- `-s`, `--selector`: CSS selector for content (overrides auto-detect). If omitted, uses Readability.js for auto-detection.
- `-c`, `--crawl`: Restrict crawl to URL prefix(es). If omitted, defaults to restricting crawl to the *current starting URL* being processed. Provide multiple times for multiple prefixes (e.g., `-c http://a.com/docs -c http://b.com/api`). Links must start with one of these prefixes to be followed.
- `-l`, `--limit`: Max total pages to crawl across all starting URLs (default: 2000).
- `-x`, `--exclude`: Regex pattern(s) to exclude URLs. Provide multiple times for multiple patterns. Default excludes common non-HTML file extensions (`\.(txt|pdf|zip|tar|gz|rar|docx?|xlsx?|pptx?|jpe?g|png|gif|svg|webp|mp[34])$`).
- `-h`, `--href`: Keep links in the output markdown. By default, links are stripped, keeping only the text content.
- `-r`, `--remove`: CSS selector(s) to remove from HTML before conversion. Provide multiple times for multiple selectors (e.g., `-r .sidebar -r .demo`).
- `--help`: Show help message.

## Examples

```bash
# Crawl single site with auto-detection
node web2llm.js -u https://example.com/docs/

# Crawl single site with specific selector
node web2llm.js -u https://example.com/docs/ -s "#content" -o custom.md

# Crawl multiple sites, limit pages, exclude /api/ paths, keep links
node web2llm.js -u https://site1.com -u https://site2.com/ -l 50 -x "/api/" -h -o combined.md

# Crawl within a specific section of a site
node web2llm.js -u https://example.com/docs/ -c https://example.com/docs/ -o docs_only.md

# Crawl multiple specific prefixes across different start URLs
node web2llm.js -u https://site1.com/start -u https://site2.com/another -c https://site1.com/start/feature -c https://site2.com/another/guide -l 20

# Remove unwanted elements before conversion
node web2llm.js -u https://example.com/docs/ -r .sidebar -r .demo -r .advertisement -o clean.md
```

## How it Works

The script processes each starting URL provided via `-u`. For each start URL:
1. It fetches the page.
2. Removes unwanted elements if `--remove` selectors are specified.
3. Extracts main content using Readability.js (default) or a CSS selector (`-s`).
4. Converts the content to Markdown using Turndown (with GFM plugin). Links are stripped by default unless `-h` is used.
5. Finds links (`<a>` tags) on the page.
6. **Crawling Logic:**
   - If the `--crawl` option is **not** provided, it only queues links that start with the *current start URL*.
   - If the `--crawl` option **is** provided, it only queues links that start with *any* of the URL prefixes given in `--crawl`.
   - It respects the total page limit (`-l`) and excludes URLs matching `--exclude` patterns.
   - It avoids re-visiting URLs within the same overall crawl session.
7. Repeats steps 1-6 for queued URLs until the queue is empty or the limit is reached.
8. After processing all start URLs, it combines all collected Markdown content (separated by `---`) and saves it to the output file (`-o`).

## Credits

This tool relies on the following excellent libraries:

- [yargs](https://github.com/yargs/yargs): For command-line argument parsing.
- [axios](https://github.com/axios/axios): For fetching web pages.
- [cheerio](https://github.com/cheeriojs/cheerio): For parsing HTML and finding links.
- [Mozilla Readability](https://github.com/mozilla/readability): For automatic content extraction.
- [jsdom](https://github.com/jsdom/jsdom): Used by Readability for DOM parsing.
- [Turndown](https://github.com/mixmark-io/turndown): For converting HTML to Markdown.
- [turndown-plugin-gfm](https://github.com/mixmark-io/turndown-plugin-gfm): For GFM table support in Turndown.

## Author

Created by Vlad Gerasimov. Visit [vlad.studio](https://vlad.studio/) and check out my wallpapers!
