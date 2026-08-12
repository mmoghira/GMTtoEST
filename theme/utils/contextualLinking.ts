import { pageUrl } from "../i18n/config";

interface LinkRule {
  keyword: string;
  slug: string;
  label: string;
}

const linkRules: LinkRule[] = [
  { keyword: "Greenwich Mean Time", slug: "blog/what-is-gmt", label: "Greenwich Mean Time" },
  { keyword: "Eastern Standard Time", slug: "what-is-est", label: "Eastern Standard Time" },
  { keyword: "Eastern Daylight Time", slug: "est-vs-edt", label: "Eastern Daylight Time" },
  { keyword: "Coordinated Universal Time", slug: "gmt-vs-utc", label: "Coordinated Universal Time" },
  { keyword: "Daylight Saving Time", slug: "daylight-saving-time-explained", label: "Daylight Saving Time" },
  { keyword: "British Summer Time", slug: "gmt-to-bst", label: "British Summer Time" },
  { keyword: "India Standard Time", slug: "ist-to-est", label: "India Standard Time" },
  { keyword: "Central Standard Time", slug: "gmt-to-cst", label: "Central Standard Time" },
  { keyword: "Pacific Standard Time", slug: "gmt-to-pst", label: "Pacific Standard Time" },
  { keyword: "Central European Time", slug: "cet-to-est", label: "Central European Time" },
];

/**
 * Utility function to enrich text content with contextual internal links on first occurrences.
 */
export function injectContextualLinks(htmlOrText: string, currentSlug = "", lang = "en"): string {
  if (!htmlOrText) return "";

  let result = htmlOrText;
  const linkedKeywords = new Set<string>();

  for (const rule of linkRules) {
    if (rule.slug === currentSlug || linkedKeywords.has(rule.keyword)) continue;

    // Use regex to match keyword outside HTML tags
    const regex = new RegExp(`(?<!<[^>]*)\\b(${rule.keyword})\\b(?![^<]*>)`, "i");
    if (regex.test(result)) {
      const targetUrl = pageUrl(lang, rule.slug);
      result = result.replace(
        regex,
        `<a href="${targetUrl}" class="contextual-link" title="${rule.label}">$1</a>`
      );
      linkedKeywords.add(rule.keyword);
    }
  }

  return result;
}
