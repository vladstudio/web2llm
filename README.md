# URL Content Crawler & Markdown Converter

This script crawls a starting URL, scrapes content from it and its child pages (within the same path), converts the content to Markdown, and merges it into a single file.

## Prerequisites

*   Node.js and npm installed.

## Installation

1.  Clone or download the script files (`crawl.js`, `package.json`).
2.  Navigate to the script's directory in your terminal.
3.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

Run the script using `node crawl.js` followed by the required arguments:

```bash
node crawl.js --url <STARTING_URL> [OPTIONS]
```

**Required Argument:**

*   `--url` or `-u`: One or more full starting URLs to crawl. Provide the flag multiple times for multiple URLs (e.g., `-u URL1 -u URL2`).

**Optional Arguments:**

*   `--output` or `-o`: The name of the output Markdown file (default: `output.md`).
*   `--selector` or `-s`: (Optional) CSS selector for the main content element. If omitted, the script will attempt to automatically detect the main content using the Readability algorithm. Use this option to override auto-detection if it doesn't work well for a specific site (e.g., `--selector "#content"`).
*   `--crawl-mode` or `-m`: Defines the crawling behavior (default: `strict`).
    *   `strict`: Only follow links if the target URL string starts with the initial URL string.
    *   `domain`: Follow any link that points to the same domain (origin) as the initial URL.
    *   `disabled`: Do not follow any links; only scrape the initial URL(s).
*   `--limit` or `-l`: Maximum total number of pages to crawl across all start URLs (default: 100).
*   `--help` or `-h`: Show help message.

**Examples:**

1.  Crawl a single site using the default content selector (`main`) and output to `output.md`:
    ```bash
    node crawl.js --url https://example.com/docs/
    ```

2.  Crawl a single site, overriding automatic content detection with a specific selector (`#content`), and output to a custom file (`my_docs.md`):
    ```bash
    node crawl.js --url https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide --selector "#content" --output my_docs.md
    ```

3.  Crawl multiple sites (using automatic detection for the first, specific selector for the second) and merge into `combined_output.md`:
    ```bash
    node crawl.js -u https://site1.com/docs -u https://site2.com/api --selector "#main-content" -o combined_output.md
    ```
    *(Note: The `--selector` override and `--crawl-mode` apply to all URLs in a single run. If different settings are needed per URL, run the script separately.)*

4.  Crawl only the initial page (no following links), using automatic content detection:
    ```bash
    node crawl.js --url https://example.com/page --crawl-mode disabled
    ```

5.  Crawl all pages within the same domain:
    ```bash
    node crawl.js --url https://example.com/docs --crawl-mode domain
    ```

6.  Crawl strictly, but stop after visiting 10 pages total:
    ```bash
    node crawl.js --url https://example.com/docs --limit 10
    ```

## How it Works

*   Processes each `--url` provided in sequence according to the specified `--crawl-mode`.
*   For each starting URL:
    *   Finds links (`<a>` tags) on the page (unless `crawl-mode` is `disabled`).
    *   Filters and follows links based on the `crawl-mode`:
        *   `strict`: Target URL must start with the starting URL string.
        *   `domain`: Target URL must have the same origin (protocol + hostname + port) as the starting URL.
        *   `disabled`: No links are followed.
*   Stops crawling additional pages (across all starting URLs) once the global `--limit` is reached.
*   Ignores URL fragments (`#...`) when checking if a page has already been visited within a crawl sequence, preventing duplicate crawls of the same base page.
*   For each unique page visited (up to the limit):
    *   If `--selector` is provided, extracts the inner HTML of the element matching the selector.
    *   If `--selector` is omitted, attempts to automatically extract the main content using the Readability algorithm.
*   Converts the extracted HTML (if any) to Markdown, including GFM tables.
*   Combines Markdown from all pages across all processed starting URLs into the single `--output` file, separated by `---`.
*   Prepends a YAML frontmatter block to the output file containing:
    *   `command_args`: The parsed arguments used for the run.
    *   `rerun_command`: A reconstructed command string that can be copied and pasted to rerun the script with the same parameters.
