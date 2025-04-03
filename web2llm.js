import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import axios from "axios";
import * as cheerio from "cheerio"; // Use namespace import
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm"; // Import the GFM plugin
import fs from "fs/promises";
import { URL } from "url";
import path from "path"; // Import path module
// Removed js-yaml import
import { Readability } from "@mozilla/readability"; // Import Readability
import { JSDOM } from "jsdom"; // Import JSDOM

// Helper function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const optionsConfig = {
  url: {
    alias: "u",
    description: "One or more starting URLs to crawl",
    type: "array", // Accept multiple URLs
    demandOption: true,
    requiresArg: true,
  },
  output: {
    alias: "o",
    description: "Output file name",
    type: "string",
    default: "output.md",
  },
  selector: {
    alias: "s",
    description: "CSS selector for the content, disables auto-detection",
    type: "string",
    // No default - auto-detection is the default if this is omitted
  },
  crawl: {
    alias: "c",
    description: "Restrict crawl to URL prefix(es). Default: start URL.", // Shortened description
    type: "array", // Accept multiple URLs
    requiresArg: true,
    // No default here, handled in logic
  },
  limit: {
    alias: "l",
    description: "Maximum number of pages to crawl",
    type: "number",
    default: 100,
  },
  exclude: {
    alias: "x", // Changed alias from 'e' to 'x'
    description: "Regex patterns for URLs to exclude from crawling",
    type: "array", // Accept multiple patterns
    requiresArg: true,
    // Default excludes common non-HTML file extensions
    default: [
      "\\.(txt|pdf|zip|tar|gz|rar|docx?|xlsx?|pptx?|jpe?g|png|gif|svg|webp|mp[34])$",
    ],
  },
  href: {
    alias: "h",
    description: "Keep links instead of stripping them", // Updated description
    type: "boolean",
    default: false,
  },
};

async function main() {
  const userArgs = hideBin(process.argv);
  if (userArgs.length === 0) {
    // No arguments provided, show help and exit cleanly
    yargs(userArgs).options(optionsConfig).showHelp();
    process.exit(0);
  }

  // Proceed with parsing if arguments exist
  const argv = yargs(userArgs).options(optionsConfig).help().parse();

  // --- Call Main Logic for each URL ---
  const outputFile = argv.output;
  const contentSelector = argv.selector; // Will be undefined if not provided
  const crawlPrefixesArg = argv.crawl; // Array of URLs or undefined
  const limit = argv.limit;
  const excludePatterns = argv.exclude;
  const keepLinks = argv.href;
  const allCombinedMarkdown = [];
  let totalVisitedCount = 0;

  // Compile exclude patterns into RegExp objects
  let excludeRegexes = [];
  try {
    excludeRegexes = excludePatterns.map((pattern) => new RegExp(pattern));
  } catch (e) {
    console.error(
      `ERROR: Invalid regex pattern provided in --exclude option: ${e.message}`
    );
    process.exit(1);
  }

  console.log(`Output: ${outputFile}`);
  console.log(`Selector: ${contentSelector || "(auto-detect)"}`);
  // Log crawl prefixes if provided
  if (crawlPrefixesArg && crawlPrefixesArg.length > 0) {
    console.log(`Crawl Prefixes: ${crawlPrefixesArg.join(", ")}`);
  } else {
    console.log(`Crawl Prefixes: (Defaulting to start URL)`);
  }
  console.log(`Limit: ${limit}`);
  console.log(`Keep Links: ${keepLinks}`);
  if (excludeRegexes.length > 0) {
    console.log(`Exclude Patterns: ${excludePatterns.join(", ")}`);
  }

  for (const startUrl of argv.url) {
    if (totalVisitedCount >= limit) {
      console.log(
        `Info: Global crawl limit (${limit}) reached. Skipping remaining start URLs.`
      );
      break;
    }
    console.log(
      `\nStart: ${startUrl} (Visited: ${totalVisitedCount}/${limit})`
    );
    try {
      // Determine effective crawl prefixes for this specific startUrl
      const effectiveCrawlPrefixes =
        crawlPrefixesArg && crawlPrefixesArg.length > 0
          ? crawlPrefixesArg
          : [startUrl]; // Default to the current start URL if -c not provided

      // Pass compiled regexes and effective prefixes
      const { markdown: markdownForUrl, visited: visitedInCrawl } =
        await crawlAndScrape(
          startUrl,
          contentSelector,
          effectiveCrawlPrefixes, // Pass the calculated prefixes
          limit,
          totalVisitedCount,
          excludeRegexes,
          keepLinks
        );
      if (markdownForUrl.length > 0) {
        allCombinedMarkdown.push(...markdownForUrl);
      }
      totalVisitedCount = visitedInCrawl;
    } catch (error) {
      // Error is logged within crawlAndScrape if it's an invalid URL
    }
  }

  // --- Combine and Write Final Output ---
  console.log(`\nWrite: ${outputFile}`);

  // Combine all scraped markdown content
  const markdownContent = allCombinedMarkdown.join("\n\n---\n\n");

  if (!markdownContent.trim()) {
    console.log("Info: No content scraped. Output file will be empty.");
  }

  try {
    // Write only the combined markdown content to the file
    await fs.writeFile(outputFile, markdownContent.trim());
    console.log(
      `OK: Visited ${totalVisitedCount} pages (limit: ${limit}). Saved content to ${path.basename(outputFile)}` // Use path.basename()
    );
  } catch (err) {
    console.error(`ERROR: Writing to ${path.basename(outputFile)} failed: ${err.message}`); // Also update error message for consistency
    process.exit(1);
  }
}

// --- Crawling Logic for a single start URL ---
// Accept crawl prefixes, limit, current total visited count, and exclude regexes
async function crawlAndScrape(
  startUrl,
  contentSelector,
  crawlPrefixes, // Changed from crawlMode
  limit,
  currentTotalVisited,
  excludeRegexes,
  keepLinks // Accept renamed flag
) {
  // Validate URL
  let startUrlParsed;
  try {
    startUrlParsed = new URL(startUrl);
  } catch (error) {
    console.error(`ERROR: Invalid start URL: ${startUrl}`);
    throw error;
  }

  const turndownService = new TurndownService({ headingStyle: "atx" });

  // Conditionally add rule to strip links (Default behavior)
  if (!keepLinks) {
    // Inverted logic: strip if keepLinks is false
    turndownService.addRule("stripLink", {
      filter: "a",
      replacement: function (content) {
        // Keep only the inner content (text), discard the link itself
        return content;
      },
    });
    console.log("Info: Stripping links (default). Use --href to keep them."); // Updated log
  } else {
    console.log("Info: Keeping links (--href specified)."); // Log when keeping links
  }

  turndownService.use(gfm); // Apply GFM rules after custom rules if needed

  const visitedUrlsInThisCrawl = new Set();
  const urlsToProcess = [startUrl];
  const singleCrawlMarkdown = [];
  let visitedCountOverall = currentTotalVisited;

  while (urlsToProcess.length > 0 && visitedCountOverall < limit) {
    const currentUrl = urlsToProcess.shift();
    const currentUrlParsed = new URL(currentUrl);
    const normalizedUrl =
      currentUrlParsed.origin +
      currentUrlParsed.pathname +
      currentUrlParsed.search;

    // Check exclusion patterns *before* checking visited or processing
    const isExcludedInitially = excludeRegexes.some((regex) =>
      regex.test(currentUrl)
    );
    if (isExcludedInitially) {
      console.log(`Skip: ${currentUrl} (matches exclude pattern)`);
      continue;
    }

    if (visitedUrlsInThisCrawl.has(normalizedUrl)) {
      continue;
    }

    if (visitedCountOverall >= limit) {
      console.log(
        `Info: Global crawl limit (${limit}) reached during crawl for ${startUrl}.`
      );
      break;
    }

    console.log(`Crawl, ${visitedCountOverall + 1}/${limit}: ${currentUrl}`);
    visitedUrlsInThisCrawl.add(normalizedUrl);
    visitedCountOverall++;

    try {
      const response = await axios.get(currentUrl, { timeout: 10000 });
      const html = response.data;
      let contentHtml = null;

      // --- Scrape Content ---
      if (contentSelector) {
        console.log(
          `Info: Using provided selector "${contentSelector}" for ${currentUrl}`
        );
        const $ = cheerio.load(html);
        contentHtml = $(contentSelector).html();
      } else {
        try {
          const doc = new JSDOM(html, { url: currentUrl });
          const reader = new Readability(doc.window.document);
          const article = reader.parse();
          if (article && article.content) {
            contentHtml = article.content;
          } else {
            console.warn(
              `WARN: Readability could not extract content from ${currentUrl}.`
            );
          }
        } catch (readabilityError) {
          console.warn(
            `WARN: Readability processing failed for ${currentUrl}: ${readabilityError.message}`
          );
        }
      }

      if (contentHtml) {
        const markdown = turndownService.turndown(contentHtml);
        singleCrawlMarkdown.push(`## Page: ${currentUrl}\n\n${markdown}`);
      } else {
        if (contentSelector && !contentHtml) {
          console.log(
            `Info: No content found on ${currentUrl} with selector "${contentSelector}"`
          );
        }
      }

      // --- Find Links ---
      // Crawling is implicitly enabled if crawlPrefixes is not empty and limit not reached
      if (crawlPrefixes.length > 0 && visitedCountOverall < limit) {
        const $ = cheerio.load(html);
        $("a").each((i, link) => {
          if (visitedCountOverall + urlsToProcess.length >= limit) {
            return false;
          }

          const href = $(link).attr("href");
          if (!href || href.startsWith("mailto:")) return;

          try {
            const absoluteUrl = new URL(href, currentUrl).toString();
            const absoluteUrlParsed = new URL(absoluteUrl);
            const normalizedFoundUrl =
              absoluteUrlParsed.origin +
              absoluteUrlParsed.pathname +
              absoluteUrlParsed.search;

            // Check if the absolute URL starts with any of the provided prefixes
            const shouldCrawl = crawlPrefixes.some((prefix) =>
              absoluteUrl.startsWith(prefix)
            );

            if (
              shouldCrawl &&
              // absoluteUrl !== startUrl && // No longer needed, prefix check handles this
              !visitedUrlsInThisCrawl.has(normalizedFoundUrl) &&
              !urlsToProcess.includes(absoluteUrl)
            ) {
              // Check exclusion patterns *before* queueing
              const isExcluded = excludeRegexes.some((regex) =>
                regex.test(absoluteUrl)
              );

              if (!isExcluded) {
                // Check limit *before* adding to queue
                if (visitedCountOverall + urlsToProcess.length < limit) {
                  urlsToProcess.push(absoluteUrl);
                  // console.log(`  -> Queued: ${absoluteUrl}`); // Optional debug log
                } else {
                  // console.log(`Info: Limit reached, not queueing ${absoluteUrl}`); // Optional debug log
                  return false; // Stop processing links if adding one would exceed limit
                }
              } else {
                console.log(`Skip: ${absoluteUrl}`);
              }
            }
          } catch (urlError) {
            // Ignore invalid URLs in links
          }
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
          ? ` (Status: ${error.response.status})`
          : "";
        console.warn(
          `WARN: Fetch failed for ${currentUrl}: ${error.message}${status}`
        );
      } else {
        console.error(`ERROR: Processing ${currentUrl}: ${error.message}`);
      }
    }

    if (urlsToProcess.length > 0 && visitedCountOverall < limit) {
      await delay(200);
    }
  }

  const pagesVisitedInThisRun = visitedCountOverall - currentTotalVisited;
  console.log(
    `Done: ${startUrl} (${pagesVisitedInThisRun} pages visited in this run)`
  );
  return { markdown: singleCrawlMarkdown, visited: visitedCountOverall };
}

// --- Run the script ---
main().catch((error) => {
  console.error(`FATAL: An unexpected error occurred: ${error.message}`);
  process.exit(1);
});
