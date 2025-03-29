import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import axios from "axios";
import * as cheerio from "cheerio"; // Use namespace import
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm"; // Import the GFM plugin
import fs from "fs/promises";
import { URL } from "url";
import yaml from "js-yaml"; // Import js-yaml
import { Readability } from "@mozilla/readability"; // Import Readability
import { JSDOM } from "jsdom"; // Import JSDOM

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
      description: "CSS selector for the main content area (optional; overrides auto-detection)",
      type: "string",
      // No default - auto-detection is the default if this is omitted
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
  const contentSelector = argv.selector; // Will be undefined if not provided
  const crawlMode = argv.crawlMode;
  const limit = argv.limit;
  const allCombinedMarkdown = [];
  let totalVisitedCount = 0; // Track total pages visited across all crawls

  console.log(`Output: ${outputFile}`);
  console.log(`Selector: ${contentSelector || '(auto-detect)'}`); // Indicate auto-detect
  console.log(`Crawl Mode: ${crawlMode}`);
  console.log(`Limit: ${limit}`);

  for (const startUrl of argv.url) {
    if (totalVisitedCount >= limit) {
      console.log(`Info: Global crawl limit (${limit}) reached. Skipping remaining start URLs.`);
      break;
    }
    console.log(`\nStart: ${startUrl} (Visited: ${totalVisitedCount}/${limit})`);
    try {
      // Pass crawlMode, limit and current visited count
      const { markdown: markdownForUrl, visited: visitedInCrawl } = await crawlAndScrape(
        startUrl,
        contentSelector, // Pass the selector (or undefined)
        crawlMode,
        limit,
        totalVisitedCount
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

  // Reconstruct the command string for frontmatter
  let commandParts = ['node', 'crawl.js'];
  argv.url.forEach(url => commandParts.push('-u', JSON.stringify(url)));
  // Only add selector to command if it was explicitly provided
  if (contentSelector) {
    commandParts.push('--selector', JSON.stringify(contentSelector));
  }
  commandParts.push('--crawl-mode', crawlMode);
  commandParts.push('--limit', limit.toString());
  commandParts.push('--output', JSON.stringify(outputFile));
  const rerunCommand = commandParts.join(' ');

  // Prepare frontmatter data
  const frontmatterArgs = {
    url: argv.url,
    'crawl-mode': crawlMode,
    limit: limit,
    output: outputFile
  };
  // Only include selector in args if provided
  if (contentSelector) {
    frontmatterArgs.selector = contentSelector;
  }

  const frontmatterData = {
    rerun_command: rerunCommand,
    command_args: frontmatterArgs
  };

  // Generate YAML frontmatter string
  const frontmatterYaml = yaml.dump(frontmatterData);
  const frontmatterBlock = `---\n${frontmatterYaml}---\n\n`;

  const markdownContent = allCombinedMarkdown.join("\n\n---\n\n");
  const finalOutputContent = frontmatterBlock + markdownContent;

  if (!markdownContent.trim()) {
    console.log("Info: No content scraped. Output file will contain only frontmatter.");
  }

  try {
    await fs.writeFile(outputFile, finalOutputContent.trim());
    console.log(`OK: Visited ${totalVisitedCount} pages (limit: ${limit}). Saved content to ${outputFile}`);
  } catch (err) {
    console.error(`ERROR: Writing to ${outputFile} failed: ${err.message}`);
    process.exit(1);
  }
}

// --- Crawling Logic for a single start URL ---
async function crawlAndScrape(startUrl, contentSelector, crawlMode, limit, currentTotalVisited) {
  // Validate URL
  let startUrlParsed;
  try {
    startUrlParsed = new URL(startUrl);
  } catch (error) {
    console.error(`ERROR: Invalid start URL: ${startUrl}`);
    throw error;
  }

  const turndownService = new TurndownService({ headingStyle: 'atx' });
  turndownService.use(gfm);

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

    if (visitedUrlsInThisCrawl.has(normalizedUrl)) {
      continue;
    }

    if (visitedCountOverall >= limit) {
        console.log(`Info: Global crawl limit (${limit}) reached during crawl for ${startUrl}.`);
        break;
    }

    console.log(`Crawl: ${currentUrl} (${visitedCountOverall + 1}/${limit})`);
    visitedUrlsInThisCrawl.add(normalizedUrl);
    visitedCountOverall++;

    try {
      const response = await axios.get(currentUrl, { timeout: 10000 });
      const html = response.data;
      let contentHtml = null;

      // --- Scrape Content ---
      if (contentSelector) {
        // User provided a selector - use Cheerio
        console.log(`Info: Using provided selector "${contentSelector}" for ${currentUrl}`); // Keep this log for clarity when overriding
        const $ = cheerio.load(html);
        contentHtml = $(contentSelector).html();
      } else {
        // No selector provided - attempt auto-detection with Readability (no "Attempting" log)
        try {
          const doc = new JSDOM(html, { url: currentUrl });
          const reader = new Readability(doc.window.document);
          const article = reader.parse();
          if (article && article.content) {
            contentHtml = article.content;
            // No success log here - assume success unless warned below
          } else {
            // Only log Readability failure
            console.warn(`WARN: Readability could not extract content from ${currentUrl}.`);
          }
        } catch (readabilityError) {
            console.warn(`WARN: Readability processing failed for ${currentUrl}: ${readabilityError.message}`);
        }
      }

      // Convert extracted HTML (if any) to Markdown
      if (contentHtml) {
        const markdown = turndownService.turndown(contentHtml);
        singleCrawlMarkdown.push(`## Page: ${currentUrl}\n\n${markdown}`);
      } else {
         // Log if manual selector failed (Readability failure logged above)
         if(contentSelector && !contentHtml) {
             console.log(`Info: No content found on ${currentUrl} with selector "${contentSelector}"`);
         }
      }

      // --- Find Links (only if crawlMode is not 'disabled') ---
      if (crawlMode !== 'disabled' && visitedCountOverall < limit) {
        // Use Cheerio to find links even if Readability was used for content
        const $ = cheerio.load(html);
        $("a").each((i, link) => {
          if (visitedCountOverall + urlsToProcess.length >= limit) {
              return false;
          }

          const href = $(link).attr("href");
          if (!href || href.startsWith('mailto:')) return;

          try {
            const absoluteUrl = new URL(href, currentUrl).toString();
            const absoluteUrlParsed = new URL(absoluteUrl);
            const normalizedFoundUrl =
              absoluteUrlParsed.origin +
              absoluteUrlParsed.pathname +
              absoluteUrlParsed.search;

            let shouldCrawl = false;
            if (crawlMode === 'strict') {
              shouldCrawl = absoluteUrl.startsWith(startUrl);
            } else if (crawlMode === 'domain') {
              shouldCrawl = absoluteUrlParsed.origin === startUrlParsed.origin;
            }

            if (
              shouldCrawl &&
              absoluteUrl !== startUrl &&
              !visitedUrlsInThisCrawl.has(normalizedFoundUrl) &&
              !urlsToProcess.includes(absoluteUrl)
            ) {
              if (visitedCountOverall + urlsToProcess.length < limit) {
                   urlsToProcess.push(absoluteUrl);
              } else {
                   return false;
              }
            }
          } catch (urlError) {
            // Ignore invalid URLs in links
          }
        });
       }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ? ` (Status: ${error.response.status})` : '';
        console.warn(`WARN: Fetch failed for ${currentUrl}: ${error.message}${status}`);
      } else {
        console.error(`ERROR: Processing ${currentUrl}: ${error.message}`);
      }
    }

    if (urlsToProcess.length > 0 && visitedCountOverall < limit) {
      await delay(200);
    }
  }

  const pagesVisitedInThisRun = visitedCountOverall - currentTotalVisited;
  console.log(`Done: ${startUrl} (${pagesVisitedInThisRun} pages visited in this run)`);
  return { markdown: singleCrawlMarkdown, visited: visitedCountOverall };
}

// --- Run the script ---
main().catch((error) => {
  console.error(`FATAL: An unexpected error occurred: ${error.message}`);
  process.exit(1);
});
