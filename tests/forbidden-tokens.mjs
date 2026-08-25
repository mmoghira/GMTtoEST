import fs from "node:fs";
import path from "node:path";

const staticDir = path.join(process.cwd(), ".vercel", "output", "static");
const pagesToCheck = [
  "es/index.html",
  "es/gmt-to-est/index.html",
  "es/aest-to-est/index.html",
  "es/mst-to-est/index.html"
];

const forbiddenSpanishPageTokens = [
  "{from}",
  "{to}",
  "hours diff",
  "prev day",
  "same day",
  "next day",
  "DST transitions",
  "GMT time",
  "to EDT",
  "to MDT",
  "Tue,",
  "Mon,"
];

console.log("=== SCANNING SPANISH RENDERED PAGES FOR FORBIDDEN TOKENS ===");

let hasFailures = false;

for (const pageRel of pagesToCheck) {
  const pagePath = path.join(staticDir, pageRel);
  if (!fs.existsSync(pagePath)) {
    console.error(`MISSING: ${pageRel}`);
    hasFailures = true;
    continue;
  }

  const html = fs.readFileSync(pagePath, "utf8");

  // Extract visible body text (excluding script tags, style tags, and attribute values)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : html;
  
  // Remove script and style elements
  const cleanBody = bodyContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  console.log(`\nChecking /${pageRel}...`);

  for (const token of forbiddenSpanishPageTokens) {
    // Check if token occurs in text content
    const regex = new RegExp(`>[^<]*\\b${token.replace(/[{}]/g, "\\$&")}\\b[^<]*<`, "gi");
    const rawMatches = cleanBody.match(regex);
    if (rawMatches) {
      console.error(`  FAIL: Found forbidden token "${token}" in visible text:`, rawMatches);
      hasFailures = true;
    }
  }

  // Also check for raw {var}
  const rawCurlyMatches = cleanBody.match(/>[^{<]*\{[a-zA-Z0-9_-]+\}[^<]*</g);
  if (rawCurlyMatches) {
    console.error(`  FAIL: Found raw curly tokens in visible text:`, rawCurlyMatches);
    hasFailures = true;
  }

  if (!hasFailures) {
    console.log(`  PASS: Zero forbidden tokens found in /${pageRel}`);
  }
}

if (hasFailures) {
  process.exit(1);
}

console.log("\n>>> ALL FORBIDDEN TOKEN CHECKS PASSED! <<<");
