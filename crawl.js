import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import axios from "axios";
import * as cheerio from "cheerio"; // Use namespace import
import TurndownService from "turndown";
import fs from "fs/promises";
import { URL } from "url";

// Helper function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // --- Argument Parsing ---
  const argv = yargs(hideBin(process.argv))
    .option("url", {
      alias: "u",
      description: "One or more starting URLs to crawl",
      type: "array", // Accept multiple URLs
      demandOption: true,
      requiresArg: true,
    })
    .option("output", {
      alias: "o",
      description: "Output file name for the merged Markdown",
      type: "string",
      default: "output.md", // Default output filename
    })
    .option("selector", {
      alias: "s",
      description: "CSS selector for the main content area",
      type: "string",
      default: "main", // Default content selector
    })
    .option("crawl-mode", {
      alias: "m", // Add short alias
      description: "Set the crawling behavior",
      type: "string",
      choices: ["strict", "domain", "disabled"],
      default: "strict",
    })
    .help()
    .alias("help", "h")
    .parse(); // Parse arguments inside main

  // --- Call Main Logic for each URL ---
  const outputFile = argv.output;
  const contentSelector = argv.selector;
  const crawlMode = argv.crawlMode; // Get crawl mode
  const allCombinedMarkdown = [];
  let totalScraped = 0;

  console.log(`Output: ${outputFile}`);
  console.log(`Selector: ${contentSelector}`);
  console.log(`Crawl Mode: ${crawlMode}`); // Log crawl mode

  for (const startUrl of argv.url) {
    console.log(`\nStart: ${startUrl}`);
    try {
      // Pass crawlMode to the function
      const { markdown: markdownForUrl, count: scrapedCount } = await crawlAndScrape(startUrl, contentSelector, crawlMode);
      if (markdownForUrl.length > 0) {
        allCombinedMarkdown.push(...markdownForUrl); // Add content from this crawl
        totalScraped += scrapedCount;
      }
    } catch (error) {
      // Error is logged within crawlAndScrape if it's an invalid URL
      // Other errors might need logging here if needed
    }
  }

  // --- Combine and Write Final Output ---
  console.log(`\nWrite: ${outputFile}`);
  const finalMarkdown = allCombinedMarkdown.join("\n\n---\n\n"); // Separator between pages

  if (!finalMarkdown.trim()) {
    console.log("Info: No content scraped. Output file will be empty.");
  }

  try {
    await fs.writeFile(outputFile, finalMarkdown.trim());
    console.log(`OK: Saved ${totalScraped} pages to ${outputFile}`);
  } catch (err) {
    console.error(`ERROR: Writing to ${outputFile} failed: ${err.message}`);
    process.exit(1);
  }
}

// --- Crawling Logic for a single start URL ---
async function crawlAndScrape(startUrl, contentSelector, crawlMode) { // Accept crawlMode
  // Accept startUrl and selector
  // Validate URL
  let startUrlParsed;
  try {
    startUrlParsed = new URL(startUrl);
  } catch (error) {
    console.error(`ERROR: Invalid start URL: ${startUrl}`);
    throw error; // Re-throw to be caught in main loop
  }

  const turndownService = new TurndownService();
  const visitedUrls = new Set(); // Stores normalized URLs for THIS crawl
  const urlsToProcess = [startUrl]; // Stores URLs to fetch for THIS crawl
  const singleCrawlMarkdown = []; // Stores markdown for THIS crawl
  let scrapedCount = 0;
  // const baseOrigin = startUrlParsed.origin;
  // const basePathname = startUrlParsed.pathname.substring(
  //   0,
  //   startUrlParsed.pathname.lastIndexOf("/") + 1
  // );

  // console.log(
  //   `Info: Restricting crawl to origin: ${baseOrigin} and path starting with: ${basePathname}`
  // ); // Removed as per user feedback (implied by startswith check)

  while (urlsToProcess.length > 0) {
    const currentUrl = urlsToProcess.shift(); // Get the next URL (may have hash)
    const currentUrlParsed = new URL(currentUrl);
    const normalizedUrl =
      currentUrlParsed.origin +
      currentUrlParsed.pathname +
      currentUrlParsed.search; // Remove hash

    if (visitedUrls.has(normalizedUrl)) {
      // console.log(`Skip: ${normalizedUrl} (already processed)`); // Optional: uncomment for debugging
      continue; // Skip if base URL already visited
    }

    console.log(`Crawl: ${currentUrl}`); // Log the original URL being fetched
    visitedUrls.add(normalizedUrl); // Add the normalized URL to visited set

    try {
      const response = await axios.get(currentUrl, { timeout: 10000 }); // 10s timeout
      const html = response.data;
      const $ = cheerio.load(html); // Usage remains the same

      // --- Scrape Content ---
      const contentHtml = $(contentSelector).html(); // Get inner HTML of selected element
      if (contentHtml) {
        const markdown = turndownService.turndown(contentHtml);
        singleCrawlMarkdown.push(`## Page: ${currentUrl}\n\n${markdown}`); // Use singleCrawlMarkdown here
        scrapedCount++;
        // console.log(`  -> Scraped content.`); // Removed for brevity
      } else {
        console.log(`Info: No content found on ${currentUrl} with selector "${contentSelector}"`);
      }

      // --- Find Links (only if crawlMode is not 'disabled' or if it's the first URL) ---
      if (crawlMode !== 'disabled' || urlsToProcess.length === 0) { // urlsToProcess is empty only after the first URL if disabled
        $("a").each((i, link) => {
          const href = $(link).attr("href");
          if (!href || href.startsWith('mailto:')) return; // Ignore empty or mailto links

        try {
          // Resolve relative URLs based on the *original* currentUrl
          const absoluteUrl = new URL(href, currentUrl).toString();
          const absoluteUrlParsed = new URL(absoluteUrl);
          const normalizedFoundUrl =
            absoluteUrlParsed.origin +
            absoluteUrlParsed.pathname +
            absoluteUrlParsed.search; // Normalize found URL

          // --- Filter Links based on crawlMode ---
          let shouldCrawl = false;
          if (crawlMode === 'strict') {
            shouldCrawl = absoluteUrl.startsWith(startUrl);
          } else if (crawlMode === 'domain') {
            // Check if the origin (protocol + hostname + port) matches
            shouldCrawl = absoluteUrlParsed.origin === startUrlParsed.origin;
          }
          // 'disabled' mode is handled by the outer 'if'

          if (
            shouldCrawl &&
            absoluteUrl !== startUrl && // Avoid re-adding start URL
            !visitedUrls.has(normalizedFoundUrl) && // Check normalized URL against visited set
            !urlsToProcess.includes(absoluteUrl) // Check original URL against queue
          ) {
            urlsToProcess.push(absoluteUrl); // Add the original URL (with hash if present) to the queue
            // console.log(`  -> Found (${crawlMode}): ${absoluteUrl}`); // Optional debug log
          }
        } catch (urlError) {
          // console.warn(`WARN: Ignoring invalid URL in link: ${href} on page ${currentUrl}`); // Optional: uncomment for debugging
        }
      }); // End of $("a").each
     } // End of if (crawlMode !== 'disabled'...)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Log specific Axios error messages (e.g., 404, timeout)
        const status = error.response?.status ? ` (Status: ${error.response.status})` : '';
        console.warn(`WARN: Fetch failed for ${currentUrl}: ${error.message}${status}`);
      } else {
        // Log other processing errors
        console.error(`ERROR: Processing ${currentUrl}: ${error.message}`);
      }
    }

    // Be polite - add a small delay
    if (urlsToProcess.length > 0) {
      await delay(200); // 200ms delay
    }
  }

  console.log(`Done: ${startUrl} (${scrapedCount} pages scraped)`);
  return { markdown: singleCrawlMarkdown, count: scrapedCount }; // Return collected markdown and count
}

// --- Run the script ---
main().catch((error) => {
  // Errors during crawlAndScrape specific to a URL are handled in the main loop
  // This catches broader unexpected errors in the main function itself
  console.error(`FATAL: An unexpected error occurred: ${error.message}`);
  process.exit(1);
});
