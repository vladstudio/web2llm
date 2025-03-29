import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import axios from 'axios';
import * as cheerio from 'cheerio'; // Use namespace import
import TurndownService from 'turndown';
import fs from 'fs/promises';
import { URL } from 'url';

// Helper function for delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  // --- Argument Parsing ---
  const argv = yargs(hideBin(process.argv))
    .option('url', {
      alias: 'u',
      description: 'One or more starting URLs to crawl',
      type: 'array', // Accept multiple URLs
      demandOption: true,
      requiresArg: true,
  })
  .option('output', {
    alias: 'o',
    description: 'Output file name for the merged Markdown',
    type: 'string',
    default: 'output.md', // Default output filename
  })
  .option('selector', {
    alias: 's',
    description: 'CSS selector for the main content area',
    type: 'string',
    default: 'main', // Default content selector
  })
    .help()
    .alias('help', 'h')
    .parse(); // Parse arguments inside main

  // --- Call Main Logic for each URL ---
  const outputFile = argv.output;
  const contentSelector = argv.selector;
  const allCombinedMarkdown = [];

  for (const startUrl of argv.url) {
    console.log(`\n--- Processing Start URL: ${startUrl} ---`);
    try {
      const markdownForUrl = await crawlAndScrape(startUrl, contentSelector);
      if (markdownForUrl.length > 0) {
        allCombinedMarkdown.push(...markdownForUrl); // Add content from this crawl
      }
    } catch (error) {
        console.error(`Error processing start URL ${startUrl}:`, error);
        // Decide if you want to continue with other URLs or exit
        // continue; // Uncomment to continue with next URL on error
        // process.exit(1); // Uncomment to exit on first error
    }
  }

  // --- Combine and Write Final Output ---
  console.log(`\n--- Writing final output to ${outputFile} ---`);
  const finalMarkdown = allCombinedMarkdown.join('\n\n---\n\n'); // Separator between pages

  if (!finalMarkdown.trim()) {
      console.log("No content was scraped across all URLs. Output file will be empty.");
  }

  try {
    await fs.writeFile(outputFile, finalMarkdown.trim());
    console.log(`Successfully wrote merged content to ${outputFile}`);
  } catch (err) {
    console.error(`Error writing final output to file ${outputFile}:`, err);
    process.exit(1);
  }
}


// --- Crawling Logic for a single start URL ---
async function crawlAndScrape(startUrl, contentSelector) { // Accept startUrl and selector
  console.log(`Starting crawl at: ${startUrl}`);
  console.log(`Content selector: ${contentSelector}`);

  // Validate URL
  try {
    new URL(startUrl);
  } catch (error) {
    console.error(`Error: Invalid start URL provided: ${startUrl}`);
    throw error; // Re-throw to be caught in main loop
  }

  const turndownService = new TurndownService();
  const visitedUrls = new Set(); // Stores normalized URLs for THIS crawl
  const urlsToProcess = [startUrl]; // Stores URLs to fetch for THIS crawl
  const singleCrawlMarkdown = []; // Stores markdown for THIS crawl
  const startUrlParsed = new URL(startUrl);
  const baseOrigin = startUrlParsed.origin;
  const basePathname = startUrlParsed.pathname.substring(0, startUrlParsed.pathname.lastIndexOf('/') + 1);

  console.log(`Restricting crawl to origin: ${baseOrigin} and path starting with: ${basePathname}`);

  while (urlsToProcess.length > 0) {
    const currentUrl = urlsToProcess.shift(); // Get the next URL (may have hash)
    const currentUrlParsed = new URL(currentUrl);
    const normalizedUrl = currentUrlParsed.origin + currentUrlParsed.pathname + currentUrlParsed.search; // Remove hash

    if (visitedUrls.has(normalizedUrl)) {
      console.log(`  -> Skipping already processed (normalized): ${normalizedUrl}`);
      continue; // Skip if base URL already visited
    }

    console.log(`Processing: ${currentUrl}`); // Log the original URL being fetched
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
        console.log(`  -> Scraped content.`);
      } else {
        console.log(`  -> No content found with selector "${contentSelector}"`);
      }

      // --- Find Links ---
      $('a').each((i, link) => {
        const href = $(link).attr('href');
        if (!href) return;

        try {
          // Resolve relative URLs based on the *original* currentUrl
          const absoluteUrl = new URL(href, currentUrl).toString();
          const absoluteUrlParsed = new URL(absoluteUrl);
          const normalizedFoundUrl = absoluteUrlParsed.origin + absoluteUrlParsed.pathname + absoluteUrlParsed.search; // Normalize found URL

          // --- Filter Links ---
          // 1. URL string starts with the original startUrl string?
          // 2. Not the startUrl itself?
          // 3. Normalized version not already visited?
          // 4. Original URL not already in the queue? (Avoid adding duplicates before normalization check)
          if (
            absoluteUrl.startsWith(startUrl) && // Stricter check based on feedback
            absoluteUrl !== startUrl &&        // Avoid re-adding start URL
            !visitedUrls.has(normalizedFoundUrl) && // Check normalized URL against visited set
            !urlsToProcess.includes(absoluteUrl) // Check original URL against queue
          ) {
            urlsToProcess.push(absoluteUrl); // Add the original URL (with hash if present) to the queue
            console.log(`  -> Found valid link (starts with startUrl): ${absoluteUrl}`);
          }
        } catch (urlError) {
          // Ignore invalid URLs found in hrefs
          // console.warn(`  -> Ignoring invalid URL in link: ${href}`);
        }
      });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.warn(`  -> Failed to fetch ${currentUrl}: ${error.message}`);
      } else {
        console.error(`  -> Error processing ${currentUrl}:`, error);
      }
    }

    // Be polite - add a small delay
    if (urlsToProcess.length > 0) {
        await delay(200); // 200ms delay
    }
  }

  console.log(`\nFinished crawling for ${startUrl}. Found content from ${singleCrawlMarkdown.length} pages.`);
  return singleCrawlMarkdown; // Return collected markdown for this crawl
}

// --- Run the script ---
main().catch(error => {
  console.error('An unexpected error occurred:', error);
  process.exit(1);
});
