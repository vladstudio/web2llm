import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import axios from "axios";
import * as cheerio from "cheerio"; // Use namespace import
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm"; // Import the GFM plugin
import fs from "fs/promises";
import { URL } from "url";
import yaml from "js-yaml"; // Import js-yaml

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
    .option("limit", { // Added limit option
      alias: "l",
      description: "Maximum total number of pages to crawl across all start URLs",
      type: "number",
      default: 100,
    })
    .help()
    .alias("help", "h")
    .parse(); // Parse arguments inside main

  // --- Call Main Logic for each URL ---
  const outputFile = argv.output;
  const contentSelector = argv.selector;
  const crawlMode = argv.crawlMode;
  const limit = argv.limit; // Get limit
  const allCombinedMarkdown = [];
  let totalVisitedCount = 0; // Track total pages visited across all crawls

  console.log(`Output: ${outputFile}`);
  console.log(`Selector: ${contentSelector}`);
  console.log(`Crawl Mode: ${crawlMode}`);
  console.log(`Limit: ${limit}`); // Log limit

  for (const startUrl of argv.url) {
    if (totalVisitedCount >= limit) { // Check limit before starting next URL
      console.log(`Info: Global crawl limit (${limit}) reached. Skipping remaining start URLs.`);
      break;
    }
    console.log(`\nStart: ${startUrl} (Visited: ${totalVisitedCount}/${limit})`);
    try {
      // Pass crawlMode, limit and current visited count
      const { markdown: markdownForUrl, visited: visitedInCrawl } = await crawlAndScrape(
        startUrl,
        contentSelector,
        crawlMode,
        limit,
        totalVisitedCount // Pass current count
      );
      if (markdownForUrl.length > 0) {
        allCombinedMarkdown.push(...markdownForUrl);
      }
      totalVisitedCount = visitedInCrawl; // Update total count from the value returned by crawlAndScrape
    } catch (error) {
      // Error is logged within crawlAndScrape if it's an invalid URL
    }
  }

  // --- Combine and Write Final Output ---
  console.log(`\nWrite: ${outputFile}`);

  // Prepare frontmatter data
  const frontmatterData = {
    command_args: {
      url: argv.url, // Array of URLs
      selector: contentSelector,
      'crawl-mode': crawlMode,
      limit: limit, // Add limit to frontmatter
      output: outputFile
    }
  };

  // Generate YAML frontmatter string
  const frontmatterYaml = yaml.dump(frontmatterData);
  const frontmatterBlock = `---\n${frontmatterYaml}---\n\n`;

  const markdownContent = allCombinedMarkdown.join("\n\n---\n\n"); // Separator between pages
  const finalOutputContent = frontmatterBlock + markdownContent; // Prepend frontmatter

  if (!markdownContent.trim()) {
    console.log("Info: No content scraped. Output file will contain only frontmatter.");
  }

  try {
    await fs.writeFile(outputFile, finalOutputContent.trim()); // Write content with frontmatter
    // Use totalVisitedCount for the final message as it reflects attempts, not just successes
    console.log(`OK: Visited ${totalVisitedCount} pages (limit: ${limit}). Saved content to ${outputFile}`);
  } catch (err) {
    console.error(`ERROR: Writing to ${outputFile} failed: ${err.message}`);
    process.exit(1);
  }
}

// --- Crawling Logic for a single start URL ---
// Accept limit and current total visited count
async function crawlAndScrape(startUrl, contentSelector, crawlMode, limit, currentTotalVisited) {
  // Validate URL
  let startUrlParsed;
  try {
    startUrlParsed = new URL(startUrl);
  } catch (error) {
    console.error(`ERROR: Invalid start URL: ${startUrl}`);
    throw error; // Re-throw to be caught in main loop
  }

  const turndownService = new TurndownService({ headingStyle: 'atx' }); // Use ATX headings (#)
  turndownService.use(gfm); // Enable GFM plugins (tables, strikethrough, etc.)

  const visitedUrlsInThisCrawl = new Set(); // Stores normalized URLs visited *within this specific crawl*
  const urlsToProcess = [startUrl]; // Stores URLs to fetch for THIS crawl
  const singleCrawlMarkdown = []; // Stores markdown for THIS crawl
  let visitedCountOverall = currentTotalVisited; // Track overall visited count passed in

  while (urlsToProcess.length > 0 && visitedCountOverall < limit) { // Check limit in loop condition
    const currentUrl = urlsToProcess.shift(); // Get the next URL (may have hash)
    const currentUrlParsed = new URL(currentUrl);
    const normalizedUrl =
      currentUrlParsed.origin +
      currentUrlParsed.pathname +
      currentUrlParsed.search; // Remove hash

    if (visitedUrlsInThisCrawl.has(normalizedUrl)) {
      // console.log(`Skip: ${normalizedUrl} (already processed in this run)`); // Optional: uncomment for debugging
      continue; // Skip if base URL already visited *in this specific crawl*
    }

    // Check limit *before* processing (redundant due to while loop, but safe)
    if (visitedCountOverall >= limit) {
        console.log(`Info: Global crawl limit (${limit}) reached during crawl for ${startUrl}.`);
        break; // Exit the while loop for this startUrl
    }

    console.log(`Crawl: ${currentUrl} (${visitedCountOverall + 1}/${limit})`); // Show progress towards limit
    visitedUrlsInThisCrawl.add(normalizedUrl); // Add the normalized URL to visited set for *this* crawl
    visitedCountOverall++; // Increment global counter *after* deciding to process

    try {
      const response = await axios.get(currentUrl, { timeout: 10000 }); // 10s timeout
      const html = response.data;
      const $ = cheerio.load(html); // Usage remains the same

      // --- Scrape Content ---
      const contentHtml = $(contentSelector).html(); // Get inner HTML of selected element
      if (contentHtml) {
        const markdown = turndownService.turndown(contentHtml);
        singleCrawlMarkdown.push(`## Page: ${currentUrl}\n\n${markdown}`); // Use singleCrawlMarkdown here
      } else {
        console.log(`Info: No content found on ${currentUrl} with selector "${contentSelector}"`);
      }

      // --- Find Links (only if crawlMode is not 'disabled') ---
      // Check limit *before* finding/adding links
      if (crawlMode !== 'disabled' && visitedCountOverall < limit) {
        $("a").each((i, link) => {
          // Check limit inside loop as well, in case many links are found on one page
          if (visitedCountOverall + urlsToProcess.length >= limit) {
              // console.log(`Info: Limit reached while checking links on ${currentUrl}`); // Optional debug
              return false; // Stop processing further links on this page
          }

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
              !visitedUrlsInThisCrawl.has(normalizedFoundUrl) && // Check normalized URL against visited set for *this* crawl
              !urlsToProcess.includes(absoluteUrl) // Check original URL against queue for *this* crawl
            ) {
               // Check limit *before* adding to queue
              if (visitedCountOverall + urlsToProcess.length < limit) { // Check if adding one more exceeds limit
                   urlsToProcess.push(absoluteUrl); // Add the original URL (with hash if present) to the queue
                   // console.log(`  -> Queued (${crawlMode}): ${absoluteUrl}`); // Optional debug log
              } else {
                   // console.log(`Info: Limit reached, not queueing ${absoluteUrl}`); // Optional debug log
                   return false; // Stop processing links if adding one would exceed limit
              }
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

    // Be polite - add a small delay (only if more processing might happen)
    if (urlsToProcess.length > 0 && visitedCountOverall < limit) {
      await delay(200); // 200ms delay
    }
  } // End of while loop

  // Report pages visited in *this specific crawl* for the Done message
  const pagesVisitedInThisRun = visitedCountOverall - currentTotalVisited;
  console.log(`Done: ${startUrl} (${pagesVisitedInThisRun} pages visited in this run)`);
  // Return collected markdown and the *updated total* visited count
  return { markdown: singleCrawlMarkdown, visited: visitedCountOverall };
}

// --- Run the script ---
main().catch((error) => {
  // Errors during crawlAndScrape specific to a URL are handled in the main loop
  // This catches broader unexpected errors in the main function itself
  console.error(`FATAL: An unexpected error occurred: ${error.message}`);
  process.exit(1);
});
