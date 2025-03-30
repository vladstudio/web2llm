# web2md

Crawls web pages starting from given URLs, scrapes main content, converts to Markdown, and merges into one file. Features automatic content detection, crawl scoping, page limits, exclusions, and GFM table conversion.

## Prerequisites

*   Node.js and npm installed.

## Installation

1.  Clone/download files (`web2md.js`, `package.json`).
2.  In the script's directory, run: `npm install`

## Usage

```bash
node web2md.js -u <URL1> [-u <URL2>...] [OPTIONS]
```

**Arguments:**

*   `-u`, `--url` (Required): One or more starting URLs.
*   `-o`, `--output`: Output file name (default: `output.md`).
*   `-s`, `--selector`: CSS selector for content (overrides auto-detect). If omitted, uses Readability.js for auto-detection.
*   `-m`, `--crawl-mode`: Crawl scope (default: `strict`). Choices:
    *   `strict`: Follow links only if URL starts with the base URL.
    *   `domain`: Follow links only if they are on the same domain (origin).
    *   `disabled`: Do not follow links.
*   `-l`, `--limit`: Max total pages to crawl (default: 100).
*   `-e`, `--exclude`: Regex pattern(s) to exclude URLs. Overrides default non-HTML file exclusion. Provide multiple times for multiple patterns.
*   `-h`, `--href`: Keep links in the output markdown. By default, links are stripped, keeping only the text content.
*   `--help`: Show help message.

##  Examples

```bash
# Crawl single site with auto-detection
node web2md.js -u https://example.com/docs/

# Crawl single site with specific selector
node web2md.js -u https://example.com/docs/ -s "#content" -o custom.md

# Crawl multiple sites, limit pages, exclude /api/ paths
node web2md.js -u https://site1.com -u https://site2.com/ -l 50 -e "/api/" -o combined.md

# Crawl only initial pages (no following links)
node web2md.js -u https://page1.com -u https://page2.com -m disabled
```

## How it Works

The script processes each starting URL. It fetches pages, attempts to extract the main content (using Readability by default, or a provided CSS selector), and converts it to Markdown (including GFM tables). It follows links based on the chosen `crawl-mode`, respecting the `limit` and `exclude` patterns. Visited URLs (ignoring `#fragments`) are tracked per crawl sequence to avoid duplicates. Finally, all collected Markdown is merged into the output file with YAML frontmatter containing the run arguments and a `rerun_command`.

## Credits

This tool relies on the following excellent libraries:

*   [Mozilla Readability](https://github.com/mozilla/readability): For automatic content extraction.
*   [Turndown](https://github.com/mixmark-io/turndown): For converting HTML to Markdown.

## Author

Created by Vlad Gerasimov. Visit [vlad.studio](https://vlad.studio/) and check out my wallpapers!
