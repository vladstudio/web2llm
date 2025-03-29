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
    description: 'The starting URL to crawl',
    type: 'string',
    demandOption: true, // Make URL mandatory
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

  // --- Call Main Logic ---
  await crawlAndScrape(argv); // Pass parsed args
}


// --- Main Logic ---
async function crawlAndScrape(argv) { // Accept argv as parameter
  const startUrl = argv.url;
  const outputFile = argv.output;
  const contentSelector = argv.selector;

  console.log(`Starting crawl at: ${startUrl}`);
  console.log(`Content selector: ${contentSelector}`);
  console.log(`Output file: ${outputFile}`);

  // Validate URL
  try {
    new URL(startUrl);
  } catch (error) {
    console.error(`Error: Invalid start URL provided: ${startUrl}`);
    process.exit(1);
  }

  const turndownService = new TurndownService();
  const visitedUrls = new Set();
  const urlsToProcess = [startUrl];
  const allMarkdownContent = [];
  const startUrlParsed = new URL(startUrl);
  const baseOrigin = startUrlParsed.origin;
  // Get the directory path part of the start URL
  const basePathname = startUrlParsed.pathname.substring(0, startUrlParsed.pathname.lastIndexOf('/') + 1);

  console.log(`Restricting crawl to origin: ${baseOrigin} and path starting with: ${basePathname}`);

  while (urlsToProcess.length > 0) {
    const currentUrl = urlsToProcess.shift(); // Get the next URL

    if (visitedUrls.has(currentUrl)) {
      continue; // Skip if already visited
    }

    console.log(`Processing: ${currentUrl}`);
    visitedUrls.add(currentUrl);

    try {
      const response = await axios.get(currentUrl, { timeout: 10000 }); // 10s timeout
      const html = response.data;
      const $ = cheerio.load(html); // Usage remains the same

      // --- Scrape Content ---
      const contentHtml = $(contentSelector).html(); // Get inner HTML of selected element
      if (contentHtml) {
        const markdown = turndownService.turndown(contentHtml);
        allMarkdownContent.push(`## Page: ${currentUrl}\n\n${markdown}`);
        console.log(`  -> Scraped content.`);
      } else {
        console.log(`  -> No content found with selector "${contentSelector}"`);
      }

      // --- Find Links ---
      $('a').each((i, link) => {
        const href = $(link).attr('href');
        if (!href) return;

        try {
          const absoluteUrl = new URL(href, currentUrl).toString(); // Resolve relative URLs
          const absoluteUrlParsed = new URL(absoluteUrl);

          // --- Filter Links ---
          // 1. Same origin?
          // 2. Path starts with the base path of the initial URL?
          // 3. Not already visited or in the queue?
          if (
            absoluteUrlParsed.origin === baseOrigin &&
            absoluteUrlParsed.pathname.startsWith(basePathname) &&
            !visitedUrls.has(absoluteUrl) &&
            !urlsToProcess.includes(absoluteUrl)
          ) {
            urlsToProcess.push(absoluteUrl);
            console.log(`  -> Found valid link: ${absoluteUrl}`);
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

  console.log(`\nFinished crawling. Found content from ${allMarkdownContent.length} pages.`);

  // --- Combine and Write Output ---
  const finalMarkdown = allMarkdownContent.join('\n\n---\n\n'); // Separator between pages

  if (!finalMarkdown.trim()) {
      console.log("No content was scraped. Output file will be empty.");
  }

  try {
    await fs.writeFile(outputFile, finalMarkdown.trim());
    console.log(`Successfully wrote merged content to ${outputFile}`);
  } catch (err) {
    console.error(`Error writing to file ${outputFile}:`, err);
    process.exit(1);
  }
}

// --- Run the script ---
main().catch(error => {
  console.error('An unexpected error occurred:', error);
  process.exit(1);
});
