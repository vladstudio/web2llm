import { Readability } from "@mozilla/readability";
import * as cheerio from "cheerio";
import { config } from "dotenv";
import fs from "fs/promises";
import { JSDOM } from "jsdom";
import path from "path";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { fileURLToPath, URL } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, ".env") });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const optionsConfig = {
  url: {
    alias: "u",
    description: "One or more starting URLs to crawl",
    type: "array",
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
  },
  crawl: {
    alias: "c",
    description: "Restrict crawl to URL prefix(es). Default: start URL.",
    type: "array",
    requiresArg: true,
  },
  limit: {
    alias: "l",
    description: "Maximum number of pages to crawl",
    type: "number",
    default: 2000,
  },
  exclude: {
    alias: "x",
    description: "Regex patterns for URLs to exclude from crawling",
    type: "array",
    requiresArg: true,
    default: [
      "\\.(txt|pdf|zip|tar|gz|rar|docx?|xlsx?|pptx?|jpe?g|png|gif|svg|webp|mp[34])$",
    ],
  },
  href: {
    alias: "h",
    description: "Keep links instead of stripping them",
    type: "boolean",
    default: false,
  },
  images: {
    alias: "i",
    description: "Keep images instead of stripping them",
    type: "boolean",
    default: false,
  },
  remove: {
    alias: "r",
    description: "CSS selectors to remove from HTML before conversion",
    type: "array",
    requiresArg: true,
    default: [],
  },
};

async function main() {
  const userArgs = hideBin(process.argv);
  if (userArgs.length === 0) {
    yargs(userArgs).options(optionsConfig).showHelp();
    process.exit(0);
  }

  const argv = yargs(userArgs).options(optionsConfig).help().parse();

  const outputFile = argv.output;
  const contentSelector = argv.selector;
  const crawlPrefixesArg = argv.crawl;
  const limit = argv.limit;
  const excludePatterns = argv.exclude;
  const keepLinks = argv.href;
  const keepImages = argv.images;
  const removeSelectors = argv.remove;
  const allCombinedMarkdown = [];
  let totalVisitedCount = 0;
  let excludeRegexes = [];
  try {
    excludeRegexes = excludePatterns.map((pattern) => new RegExp(pattern));
  } catch (e) {
    console.error(
      `ERROR: Invalid regex pattern provided in --exclude option: ${e.message}`
    );
    process.exit(1);
  }

  console.log(`Output: ${path.basename(outputFile)}`);
  console.log(`Selector: ${contentSelector || "(auto-detect)"}`);
  if (crawlPrefixesArg && crawlPrefixesArg.length > 0) {
    console.log(`Crawl Prefixes: ${crawlPrefixesArg.join(", ")}`);
  } else {
    console.log(`Crawl Prefixes: (Defaulting to start URL)`);
  }
  console.log(`Limit: ${limit}`);
  console.log(`Keep Links: ${keepLinks}`);
  console.log(`Keep Images: ${keepImages}`);
  if (removeSelectors.length > 0) {
    console.log(`Remove Selectors: ${removeSelectors.join(", ")}`);
  }
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
      const effectiveCrawlPrefixes =
        crawlPrefixesArg && crawlPrefixesArg.length > 0
          ? crawlPrefixesArg
          : [startUrl];
      const { markdown: markdownForUrl, visited: visitedInCrawl } =
        await crawlAndScrape(
          startUrl,
          contentSelector,
          effectiveCrawlPrefixes,
          limit,
          totalVisitedCount,
          excludeRegexes,
          keepLinks,
          keepImages,
          removeSelectors
        );
      if (markdownForUrl.length > 0) {
        allCombinedMarkdown.push(...markdownForUrl);
      }
      totalVisitedCount = visitedInCrawl;
    } catch (error) {}
  }

  console.log(`\nWrite: ${path.basename(outputFile)}`);

  const markdownContent = allCombinedMarkdown.join("\n\n---\n\n");

  if (!markdownContent.trim()) {
    console.log("Info: No content scraped. Output file will be empty.");
  }

  try {
    await fs.writeFile(outputFile, markdownContent.trim());
    console.log(
      `OK: Visited ${totalVisitedCount} pages (limit: ${limit}). Saved content to ${path.basename(
        outputFile
      )}`
    );
  } catch (err) {
    console.error(
      `ERROR: Writing to ${path.basename(outputFile)} failed: ${err.message}`
    );
    process.exit(1);
  }
}

/**
 * Crawl and scrape pages.
 * @param {string} startUrl
 * @param {string|undefined} contentSelector
 * @param {string[]} crawlPrefixes
 * @param {number} limit
 * @param {number} currentTotalVisited
 * @param {RegExp[]} excludeRegexes
 * @param {boolean} keepLinks
 * @param {boolean} keepImages
 * @param {string[]} removeSelectors
 */
async function crawlAndScrape(
  startUrl,
  contentSelector,
  crawlPrefixes,
  limit,
  currentTotalVisited,
  excludeRegexes,
  keepLinks,
  keepImages,
  removeSelectors
) {
  let startUrlParsed;
  try {
    startUrlParsed = new URL(startUrl);
  } catch (error) {
    console.error(`ERROR: Invalid start URL: ${startUrl}`);
    throw error;
  }

  const turndownService = new TurndownService({ headingStyle: "atx" });

  if (!keepLinks) {
    turndownService.addRule("stripLink", {
      filter: "a",
      replacement: function (content) {
        return content;
      },
    });
    console.log("Info: Stripping links (default). Use --href to keep them.");
  } else {
    console.log("Info: Keeping links (--href specified).");
  }

  if (!keepImages) {
    turndownService.addRule("stripImage", {
      filter: "img",
      replacement: function (content, node) {
        return "";
      },
    });
    console.log("Info: Stripping images (default). Use --images to keep them.");
  } else {
    console.log("Info: Keeping images (--images specified).");
  }

  turndownService.addRule("shikiCodeBlock", {
    filter: function (node, options) {
      return node.nodeName === "PRE" && node.querySelector("span.line > span");
    },
    replacement: function (content, node, options) {
      let code = "";
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          code += child.textContent;
        } else if (
          child.nodeType === Node.ELEMENT_NODE &&
          child.nodeName === "SPAN" &&
          child.classList.contains("line")
        ) {
          code += Array.from(child.childNodes)
            .map((innerChild) => innerChild.textContent)
            .join("");
          code += "\n";
        } else {
          code += child.textContent;
        }
      });

      const language = node.getAttribute("data-language") || "";
      return "\n```" + language + "\n" + code.trim() + "\n```\n";
    },
  });

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
      console.log(`Info: Fetching with Kadoa API: ${currentUrl}`);

      const kadoaApiKey = process.env.KADOA_API_KEY;
      if (!kadoaApiKey) {
        throw new Error("KADOA_API_KEY environment variable is not set");
      }

      const response = await fetch("https://api.kadoa.com/v4/adhoc/body", {
        method: "POST",
        headers: {
          "x-api-key": kadoaApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: currentUrl }),
      });

      if (!response.ok) {
        throw new Error(
          `Kadoa API request failed: ${response.status} ${response.statusText}`
        );
      }

      const kadoaResult = await response.json();

      if (kadoaResult.status.toLowerCase() !== "success") {
        throw new Error(
          `Kadoa API returned non-success status: ${kadoaResult.status}`
        );
      }

      let html = "";
      if (typeof kadoaResult.data === "string") {
        html = kadoaResult.data;
      } else if (kadoaResult.data && typeof kadoaResult.data === "object") {
        if (kadoaResult.data.html) {
          html = kadoaResult.data.html;
        } else if (kadoaResult.data.content) {
          html = kadoaResult.data.content;
        } else {
          html = `<html><body>${JSON.stringify(
            kadoaResult.data
          )}</body></html>`;
        }
      } else {
        throw new Error("No usable content found in Kadoa API response");
      }

      if (!html.includes("<html>") && !html.includes("<HTML>")) {
        html = `<html><head><title>${currentUrl}</title></head><body>${html}</body></html>`;
      }

      await fs.writeFile("temp.html", html);

      if (removeSelectors.length > 0) {
        console.log(`Info: Removing selectors: ${removeSelectors.join(", ")}`);
        const $ = cheerio.load(html);
        removeSelectors.forEach((selector) => {
          try {
            $(selector).remove();
          } catch (error) {
            console.warn(
              `WARN: Invalid CSS selector "${selector}": ${error.message}`
            );
          }
        });
        html = $.html();
      }

      let contentHtml = null;
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

            const shouldCrawl = crawlPrefixes.some((prefix) =>
              absoluteUrl.startsWith(prefix)
            );

            if (
              shouldCrawl &&
              !visitedUrlsInThisCrawl.has(normalizedFoundUrl) &&
              !urlsToProcess.includes(absoluteUrl)
            ) {
              const isExcluded = excludeRegexes.some((regex) =>
                regex.test(absoluteUrl)
              );

              if (!isExcluded) {
                if (visitedCountOverall + urlsToProcess.length < limit) {
                  urlsToProcess.push(absoluteUrl);
                } else {
                  return false;
                }
              } else {
                console.log(`Skip: ${absoluteUrl}`);
              }
            }
          } catch (urlError) {}
        });
      }
    } catch (error) {
      console.error(`ERROR: Processing ${currentUrl}: ${error.message}`);
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

main().catch((error) => {
  console.error(`FATAL: An unexpected error occurred: ${error.message}`);
  process.exit(1);
});
