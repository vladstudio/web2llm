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
*   `--selector` or `-s`: The CSS selector for the main content element to scrape on each page (default: `main`). Use the selector that targets the primary content area of the website you are crawling (e.g., `#content`, `.article-body`).
*   `--help` or `-h`: Show help message.

**Examples:**

1.  Crawl a single site using the default content selector (`main`) and output to `output.md`:
    ```bash
    node crawl.js --url https://example.com/docs/
    ```

2.  Crawl a single site using a specific content selector (`#content`) and output to a custom file (`my_docs.md`):
    ```bash
    node crawl.js --url https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide --selector "#content" --output my_docs.md
    ```

3.  Crawl multiple sites (using default selector for the first, specific for the second) and merge into `combined_output.md`:
    ```bash
    node crawl.js -u https://site1.com/docs -u https://site2.com/api --selector "#main-content" -o combined_output.md
    ```
    *(Note: The `--selector` applies to all URLs in a single run. If different selectors are needed, run the script separately for each site and combine the output files manually.)*

## How it Works

*   Processes each `--url` provided in sequence.
*   For each starting URL:
    *   Finds links (`<a>` tags) on the page.
    *   Follows links **only if** their absolute URL string starts with that specific starting URL string.
*   Ignores URL fragments (`#...`) when checking if a page has already been visited, preventing duplicate crawls of the same base page.
*   For each unique page visited, it extracts the inner HTML of the element matching the `--selector`.
*   Converts the extracted HTML to Markdown.
*   Combines Markdown from all pages across all processed starting URLs into the single `--output` file, separated by `---`.
