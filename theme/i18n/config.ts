export type Lang = {
  code: string;
  name: string;
  dir: "ltr" | "rtl";
};

const rawSiteUrl = import.meta.env.SITE_URL || "https://gmttoestconverter.com";
export const siteUrl = rawSiteUrl.replace(/\/+$/, "").replace("://www.", "://");
export const multilingualPagesEnabled = true;
export const dynamicConvertersEnabled = import.meta.env.PUBLIC_ENABLE_DYNAMIC_CONVERTERS === "true";

export const allLanguages: Lang[] = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "es", name: "Español", dir: "ltr" },
  { code: "zh", name: "简体中文", dir: "ltr" },
  { code: "hi", name: "हिन्दी", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "pt", name: "Português", dir: "ltr" },
  { code: "ru", name: "Русский", dir: "ltr" },
  { code: "ja", name: "日本語", dir: "ltr" },
  { code: "de", name: "Deutsch", dir: "ltr" },
  { code: "fr", name: "Français", dir: "ltr" },
  { code: "ko", name: "한국어", dir: "ltr" },
  { code: "it", name: "Italiano", dir: "ltr" },
  { code: "tr", name: "Türkçe", dir: "ltr" },
  { code: "ur", name: "اردو", dir: "rtl" },
  { code: "bn", name: "বাংলা", dir: "ltr" },
  { code: "vi", name: "Tiếng Việt", dir: "ltr" },
  { code: "th", name: "ไทย", dir: "ltr" },
  { code: "id", name: "Indonesia", dir: "ltr" },
  { code: "fa", name: "فارسی", dir: "rtl" },
  { code: "pl", name: "Polski", dir: "ltr" }
];

export const languages: Lang[] = multilingualPagesEnabled ? allLanguages : allLanguages.slice(0, 1);

export const tzMap: Record<string, string> = {
  PST: 'America/Los_Angeles', PDT: 'America/Los_Angeles',
  CST: 'America/Chicago', CDT: 'America/Chicago',
  MST: 'America/Denver', MDT: 'America/Denver',
  EST: 'America/New_York', EDT: 'America/New_York',
  AST: 'America/Halifax', ADT: 'America/Halifax',
  AKST: 'America/Anchorage', AKDT: 'America/Anchorage',
  HST: 'Pacific/Honolulu', HDT: 'Pacific/Honolulu',
  WET: 'Europe/Lisbon', WEST: 'Europe/Lisbon',
  CET: 'Europe/Paris', CEST: 'Europe/Paris', MEST: 'Europe/Paris', MET: 'Europe/Paris',
  EET: 'Europe/Athens', EEST: 'Europe/Athens',
  MSK: 'Europe/Moscow',
  AEST: 'Australia/Sydney', AEDT: 'Australia/Sydney',
  ACST: 'Australia/Adelaide', ACDT: 'Australia/Adelaide',
  AWST: 'Australia/Perth',
  NZST: 'Pacific/Auckland', NZDT: 'Pacific/Auckland',
  IST: 'Asia/Kolkata',
  JST: 'Asia/Tokyo',
  HKT: 'Asia/Hong_Kong',
  WIB: 'Asia/Jakarta', WITA: 'Asia/Makassar', WIT: 'Asia/Jayapura',
  SAST: 'Africa/Johannesburg', CAT: 'Africa/Maputo', WAT: 'Africa/Lagos', EAT: 'Africa/Nairobi',
  BST: 'Europe/London',
  PKT: 'Asia/Karachi',
  IDT: 'Asia/Jerusalem',
  NST: 'America/St_Johns', NDT: 'America/St_Johns',
  ChST: 'Pacific/Guam',
  SST: 'Pacific/Pago_Pago',
  UTC: 'UTC', GMT: 'UTC',
  KST: 'Asia/Seoul'
};

const gmtList = ["ACDT","ACST","ADT","AEDT","AEST","AKDT","AKST","AST","AWST","BST","CAT","CDT","CEST","CET","ChST","CST","EAT","EDT","EEST","EET","HDT","HKT","HST","IDT","IST","JST","KST","MDT","MEST","MET","MSK","MST","NDT","NST","NZDT","NZST","PDT","PKT","PST","SAST","SST","UTC","WAT","WEST","WET","WIB","WIT","WITA"];
const estList = ["ACDT","ACST","ADT","AEDT","AEST","AKDT","AKST","AST","AWST","BST","CAT","CEST","CET","ChST","CST","EAT","EDT","EEST","EET","HDT","HKT","HST","IDT","IST","JST","KST","MDT","MEST","MET","MSK","MST","NDT","NST","NZDT","NZST","PDT","PKT","PST","SAST","SST","UTC","WAT","WEST","WET","WIB","WIT","WITA"];

const extraPages = dynamicConvertersEnabled ? [
  ...gmtList.map(z => ({ slug: `gmt-to-${z.toLowerCase()}`, kind: "dynamic", labelKey: "dynamic", context: { from: "GMT", to: z, fromZone: "UTC", toZone: tzMap[z] } })),
  ...estList.map(z => ({ slug: `${z.toLowerCase()}-to-est`, kind: "dynamic", labelKey: "dynamic", context: { from: z, to: "EST", fromZone: tzMap[z], toZone: "America/New_York" } }))
] : [];

export const pages: any[] = [
  { slug: "", kind: "converter", labelKey: "home" },
  { slug: "gmt-to-est", kind: "converter", labelKey: "gmtToEst" },
  { slug: "gmt-to-akdt", kind: "dynamic", labelKey: "gmtToAkdt", context: { from: "GMT", to: "AKDT", fromZone: "UTC", toZone: "America/Anchorage" } },
  { slug: "gmt-to-awst", fill: "none", kind: "dynamic", labelKey: "gmtToAwst", context: { from: "GMT", to: "AWST", fromZone: "UTC", toZone: "Australia/Perth" } },
  { slug: "wita-to-est", kind: "dynamic", labelKey: "witaToEst", context: { from: "WITA", to: "EST", fromZone: "Asia/Makassar", toZone: "America/New_York" } },
  { slug: "gmt-to-met", kind: "dynamic", labelKey: "gmtToMet", context: { from: "GMT", to: "MET", fromZone: "UTC", toZone: "Europe/Berlin" } },
  { slug: "gmt-to-pdt", kind: "dynamic", labelKey: "gmtToPdt", context: { from: "GMT", to: "PDT", fromZone: "UTC", toZone: "America/Los_Angeles" } },
  { slug: "cdt-to-est", kind: "dynamic", labelKey: "cdtToEst", context: { from: "CDT", to: "EST", fromZone: "America/Chicago", toZone: "America/New_York" } },
  { slug: "cst-to-est", kind: "dynamic", labelKey: "cstToEst", context: { from: "CST", to: "EST", fromZone: "America/Chicago", toZone: "America/New_York" } },
  { slug: "kst-to-est", kind: "dynamic", labelKey: "kstToEst", context: { from: "KST", to: "EST", fromZone: "Asia/Seoul", toZone: "America/New_York" } },
  { slug: "pdt-to-est", kind: "dynamic", labelKey: "pdtToEst", context: { from: "PDT", to: "EST", fromZone: "America/Los_Angeles", toZone: "America/New_York" } },
  { slug: "mst-to-est", kind: "dynamic", labelKey: "mstToEst", context: { from: "MST", to: "EST", fromZone: "America/Denver", toZone: "America/New_York" } },
  { slug: "ast-to-est", kind: "dynamic", labelKey: "astToEst", context: { from: "AST", to: "EST", fromZone: "America/Halifax", toZone: "America/New_York" } },
  { slug: "gmt-to-acdt", kind: "dynamic", labelKey: "gmtToAcdt", context: { from: "GMT", to: "ACDT", fromZone: "UTC", toZone: "Australia/Adelaide" } },
  { slug: "gmt-to-aedt", kind: "dynamic", labelKey: "gmtToAedt", context: { from: "GMT", to: "AEDT", fromZone: "UTC", toZone: "Australia/Sydney" } },
  { slug: "gmt-to-bst", kind: "dynamic", labelKey: "gmtToBst", context: { from: "GMT", to: "BST", fromZone: "UTC", toZone: "Europe/London" } },
  { slug: "gmt-to-aest", kind: "dynamic", labelKey: "gmtToAest", context: { from: "GMT", to: "AEST", fromZone: "UTC", toZone: "Australia/Sydney" } },
  { slug: "gmt-to-idt", kind: "dynamic", labelKey: "gmtToIdt", context: { from: "GMT", to: "IDT", fromZone: "UTC", toZone: "Asia/Jerusalem" } },
  { slug: "eest-to-est", kind: "dynamic", labelKey: "eestToEst", context: { from: "EEST", to: "EST", fromZone: "Europe/Athens", toZone: "America/New_York" } },
  { slug: "gmt-to-nzst", kind: "dynamic", labelKey: "gmtToNzst", context: { from: "GMT", to: "NZST", fromZone: "UTC", toZone: "Pacific/Auckland" } },
  { slug: "aest-to-est", kind: "dynamic", labelKey: "aestToEst", context: { from: "AEST", to: "EST", fromZone: "Australia/Sydney", toZone: "America/New_York" } },
  { slug: "aedt-to-est", kind: "dynamic", labelKey: "aedtToEst", context: { from: "AEDT", to: "EST", fromZone: "Australia/Sydney", toZone: "America/New_York" } },
  { slug: "gmt-to-eet", kind: "dynamic", labelKey: "gmtToEet", context: { from: "GMT", to: "EET", fromZone: "UTC", toZone: "Europe/Athens" } },
  { slug: "edt-to-est", kind: "dynamic", labelKey: "edtToEst", context: { from: "EDT", to: "EST", fromZone: "Etc/GMT+4", toZone: "Etc/GMT+5" } },
  { slug: "gmt-to-cdt", kind: "dynamic", labelKey: "gmtToCdt", context: { from: "GMT", to: "CDT", fromZone: "UTC", toZone: "America/Chicago" } },
  { slug: "gmt-to-eat", kind: "dynamic", labelKey: "gmtToEat", context: { from: "GMT", to: "EAT", fromZone: "UTC", toZone: "Africa/Nairobi" } },
  { slug: "eat-to-est", kind: "dynamic", labelKey: "eatToEst", context: { from: "EAT", to: "EST", fromZone: "Africa/Nairobi", toZone: "America/New_York" } },
  { slug: "gmt-to-ist", kind: "dynamic", labelKey: "gmtToIst", context: { from: "GMT", to: "IST", fromZone: "UTC", toZone: "Asia/Kolkata" } },
  { slug: "eet-to-est", kind: "dynamic", labelKey: "eetToEst", context: { from: "EET", to: "EST", fromZone: "Europe/Athens", toZone: "America/New_York" } },
  { slug: "gmt-to-pst", kind: "dynamic", labelKey: "gmtToPst", context: { from: "GMT", to: "PST", fromZone: "UTC", toZone: "America/Los_Angeles" } },
  { slug: "hst-to-est", kind: "dynamic", labelKey: "hstToEst", context: { from: "HST", to: "EST", fromZone: "Pacific/Honolulu", toZone: "America/New_York" } },
  { slug: "idt-to-est", kind: "dynamic", labelKey: "idtToEst", context: { from: "IDT", to: "EST", fromZone: "Asia/Jerusalem", toZone: "America/New_York" } },
  { slug: "pkt-to-est", kind: "dynamic", labelKey: "pktToEst", context: { from: "PKT", to: "EST", fromZone: "Asia/Karachi", toZone: "America/New_York" } },
  { slug: "nst-to-est", kind: "dynamic", labelKey: "nstToEst", context: { from: "NST", to: "EST", fromZone: "America/St_Johns", toZone: "America/New_York" } },
  { slug: "jst-to-est", kind: "dynamic", labelKey: "jstToEst", context: { from: "JST", to: "EST", fromZone: "Asia/Tokyo", toZone: "America/New_York" } },
  { slug: "gmt-to-akst", kind: "dynamic", labelKey: "gmtToAkst", context: { from: "GMT", to: "AKST", fromZone: "UTC", toZone: "America/Anchorage" } },
  { slug: "gmt-to-ast", kind: "dynamic", labelKey: "gmtToAst", context: { from: "GMT", to: "AST", fromZone: "UTC", toZone: "America/Halifax" } },
  { slug: "gmt-to-cst", kind: "dynamic", labelKey: "gmtToCst", context: { from: "GMT", to: "CST", fromZone: "UTC", toZone: "America/Chicago" } },
  { slug: "gmt-to-utc", kind: "dynamic", labelKey: "gmtToUtc", context: { from: "GMT", to: "UTC", fromZone: "UTC", toZone: "UTC" } },
  { slug: "cat-to-est", kind: "dynamic", labelKey: "catToEst", context: { from: "CAT", to: "EST", fromZone: "Africa/Maputo", toZone: "America/New_York" } },
  { slug: "ist-to-est", kind: "dynamic", labelKey: "istToEst", context: { from: "IST", to: "EST", fromZone: "Asia/Kolkata", toZone: "America/New_York" } },
  { slug: "mest-to-est", kind: "dynamic", labelKey: "mestToEst", context: { from: "MEST", to: "EST", fromZone: "Europe/Paris", toZone: "America/New_York" } },
  { slug: "gmt-to-sst", kind: "dynamic", labelKey: "gmtToSst", context: { from: "GMT", to: "SST", fromZone: "UTC", toZone: "Pacific/Pago_Pago" } },
  { slug: "acst-to-est", kind: "dynamic", labelKey: "acstToEst", context: { from: "ACST", to: "EST", fromZone: "Australia/Adelaide", toZone: "America/New_York" } },
  { slug: "gmt-to-acst", kind: "dynamic", labelKey: "gmtToAcst", context: { from: "GMT", to: "ACST", fromZone: "UTC", toZone: "Australia/Adelaide" } },
  { slug: "west-to-est", kind: "dynamic", labelKey: "westToEst", context: { from: "WEST", to: "EST", fromZone: "Europe/Lisbon", toZone: "America/New_York" } },
  { slug: "gmt-to-kst", kind: "dynamic", labelKey: "gmtToKst", context: { from: "GMT", to: "KST", fromZone: "UTC", toZone: "Asia/Seoul" } },
  { slug: "bst-to-est", kind: "dynamic", labelKey: "bstToEst", context: { from: "BST", to: "EST", fromZone: "Europe/London", toZone: "America/New_York" } },
  { slug: "cet-to-est", kind: "dynamic", labelKey: "cetToEst", context: { from: "CET", to: "EST", fromZone: "Europe/Paris", toZone: "America/New_York" } },
  { slug: "gmt-to-ndt", kind: "dynamic", labelKey: "gmtToNdt", context: { from: "GMT", to: "NDT", fromZone: "UTC", toZone: "America/St_Johns" } },
  { slug: "awst-to-est", kind: "dynamic", labelKey: "awstToEst", context: { from: "AWST", to: "EST", fromZone: "Australia/Perth", toZone: "America/New_York" } },
  { slug: "wit-to-est", kind: "dynamic", labelKey: "witToEst", context: { from: "WIT", to: "EST", fromZone: "Asia/Jayapura", toZone: "America/New_York" } },
  { slug: "gmt-to-sast", kind: "dynamic", labelKey: "gmtToSast", context: { from: "GMT", to: "SAST", fromZone: "UTC", toZone: "Africa/Johannesburg" } },
  { slug: "gmt-to-mdt", kind: "dynamic", labelKey: "gmtToMdt", context: { from: "GMT", to: "MDT", fromZone: "UTC", toZone: "America/Denver" } },
  { slug: "gmt-to-eest", kind: "dynamic", labelKey: "gmtToEest", context: { from: "GMT", to: "EEST", fromZone: "UTC", toZone: "Europe/Athens" } },
  { slug: "wet-to-est", kind: "dynamic", labelKey: "wetToEst", context: { from: "WET", to: "EST", fromZone: "Europe/Lisbon", toZone: "America/New_York" } },
  { slug: "msk-to-est", kind: "dynamic", labelKey: "mskToEst", context: { from: "MSK", to: "EST", fromZone: "Europe/Moscow", toZone: "America/New_York" } },
  { slug: "nzst-to-est", kind: "dynamic", labelKey: "nzstToEst", context: { from: "NZST", to: "EST", fromZone: "Pacific/Auckland", toZone: "America/New_York" } },
  { slug: "nzdt-to-est", kind: "dynamic", labelKey: "nzdtToEst", context: { from: "NZDT", to: "EST", fromZone: "Pacific/Auckland", toZone: "America/New_York" } },
  { slug: "akdt-to-est", kind: "dynamic", labelKey: "akdtToEst", context: { from: "AKDT", to: "EST", fromZone: "America/Anchorage", toZone: "America/New_York" } },
  { slug: "wat-to-est", kind: "dynamic", labelKey: "watToEst", context: { from: "WAT", to: "EST", fromZone: "Africa/Lagos", toZone: "America/New_York" } },
  { slug: "acdt-to-est", kind: "dynamic", labelKey: "acdtToEst", context: { from: "ACDT", to: "EST", fromZone: "Australia/Adelaide", toZone: "America/New_York" } },
  { slug: "cest-to-est", kind: "dynamic", labelKey: "cestToEst", context: { from: "CEST", to: "EST", fromZone: "Europe/Paris", toZone: "America/New_York" } },
  { slug: "gmt-to-chst", kind: "dynamic", labelKey: "gmtToChst", context: { from: "GMT", to: "CHST", fromZone: "UTC", toZone: "Pacific/Guam" } },
  { slug: "gmt-to-west", kind: "dynamic", labelKey: "gmtToWest", context: { from: "GMT", to: "WEST", fromZone: "UTC", toZone: "Europe/Lisbon" } },
  { slug: "gmt-to-wet", kind: "dynamic", labelKey: "gmtToWet", context: { from: "GMT", to: "WET", fromZone: "UTC", toZone: "Europe/Lisbon" } },
  { slug: "gmt-to-wit", kind: "dynamic", labelKey: "gmtToWit", context: { from: "GMT", to: "WIT", fromZone: "UTC", toZone: "Asia/Jayapura" } },
  { slug: "gmt-to-wita", kind: "dynamic", labelKey: "gmtToWita", context: { from: "GMT", to: "WITA", fromZone: "UTC", toZone: "Asia/Makassar" } },
  { slug: "gmt-to-cest", kind: "dynamic", labelKey: "gmtToCest", context: { from: "GMT", to: "CEST", fromZone: "UTC", toZone: "Europe/Paris" } },
  { slug: "gmt-to-mest", kind: "dynamic", labelKey: "gmtToMest", context: { from: "GMT", to: "MEST", fromZone: "UTC", toZone: "Europe/Berlin" } },
  { slug: "mdt-to-est", kind: "dynamic", labelKey: "mdtToEst", context: { from: "MDT", to: "EST", fromZone: "America/Denver", toZone: "America/New_York" } },
  { slug: "est-to-gmt", kind: "reverse", labelKey: "estToGmt" },
  { slug: "gmt-vs-est", kind: "difference", labelKey: "gmtVsEst" },
  { slug: "time-zone-guide", kind: "guide", labelKey: "guide" },
  { slug: "tools", kind: "tool", labelKey: "tools" },
  { slug: "world-clock", kind: "tool", labelKey: "worldClock" },
  { slug: "meeting-planner", kind: "tool", labelKey: "meetingPlanner" },
  { slug: "event-time-converter", kind: "tool", labelKey: "eventTimeConverter" },
  { slug: "time-difference-calculator", kind: "tool", labelKey: "timeDifferenceCalculator" },
  { slug: "business-hours-overlap", kind: "tool", labelKey: "businessHoursOverlap" },
  { slug: "holiday-calendar", kind: "tool", labelKey: "holidayCalendar" },
  { slug: "travel-planner", kind: "tool", labelKey: "travelPlanner" },
  { slug: "developer-tools", kind: "tool", labelKey: "developerTools" },
  ...extraPages
];

const modules = import.meta.glob("./translations/*.json", { eager: true });

function deepMerge(base: any, override: any): any {
  if (Array.isArray(base) || Array.isArray(override)) return override ?? base;
  if (typeof base !== "object" || base === null) return override ?? base;
  const output = { ...base };
  for (const key of Object.keys(override || {})) output[key] = deepMerge(base[key], override[key]);
  return output;
}

export function getLang(code: string) {
  return languages.find((lang) => lang.code === code) || languages[0];
}

export function getTranslation(code: string): any {
  const english = (modules["./translations/en.json"] as any)?.default || {};
  const selected = (modules[`./translations/${code}.json`] as any)?.default || english;
  return deepMerge(english, selected);
}

function replaceTemplates(text: string, replacements: Record<string, string>): string {
  if (!text) return "";
  let result = text;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`{${key}}`, "g"), value);
  }
  return result;
}

export function getPageMeta(code: string, labelKey = "home", pageContext?: any) {
  const t = getTranslation(code);
  const english = (modules["./translations/en.json"] as any)?.default || {};
  const selected = (modules[`./translations/${code}.json`] as any)?.default || english;
  const specificDynamicKeys = ["cdtToEst", "cstToEst", "kstToEst", "pdtToEst", "mstToEst", "astToEst", "gmtToAkdt", "gmtToAwst", "witaToEst", "gmtToMet", "gmtToPdt"];
  const isSpecificDynamic = specificDynamicKeys.includes(labelKey);

  if ((labelKey === "dynamic" || isSpecificDynamic) && pageContext) {
    const { from, to, fromZone, toZone } = pageContext;
    const replacements = { from, to, fromZone: fromZone || "UTC", toZone: toZone || "UTC" };

    const selectedSpecificMeta = selected.pages?.[labelKey];
    const englishSpecificMeta = english.pages?.[labelKey];
    const usesEnglishSpecificFallback =
      code !== "en" &&
      isSpecificDynamic &&
      selectedSpecificMeta?.title === englishSpecificMeta?.title;
    const localizedHomeMeta = selected.pages?.home || t.pages?.home || {};
    const localizedPairMeta = {
      ...(selected.pages?.dynamic || t.pages?.dynamic || {}),
      title: localizedHomeMeta.title
        ?.replace(/\bGMT\b/g, "{from}")
        .replace(/\bEST\b/g, "{to}"),
      description: localizedHomeMeta.description
        ?.replace(/\bGMT\b/g, "{from}")
        .replace(/\bEST\b/g, "{to}")
    };
    const baseMeta = usesEnglishSpecificFallback
      ? localizedPairMeta
      : selectedSpecificMeta || t.pages[labelKey] || t.pages.dynamic || {};
    const rawTitle = isSpecificDynamic
      ? localizedPairMeta.title || baseMeta.title || "{from} to {to} Converter"
      : baseMeta.title || "{from} to {to} Converter";
    const rawDescription = baseMeta.description || "Use this {from} to {to} converter for instant, date-aware conversions with daylight saving time handling, live clocks, and meeting planner.";
    
    const title = replaceTemplates(rawTitle, replacements);
    const description = replaceTemplates(rawDescription, replacements);

    const faqsSource = isSpecificDynamic && !usesEnglishSpecificFallback
      ? (t[`faqs_${labelKey}`]?.items || [])
      : (selected.faqs_dynamic || t.faqs_dynamic || []);
    const useCasesSource = isSpecificDynamic && !usesEnglishSpecificFallback
      ? (t[`useCases_${labelKey}`]?.items || [])
      : (selected.useCases_dynamic || t.useCases_dynamic || []);
    const topicsSource = isSpecificDynamic && !usesEnglishSpecificFallback
      ? (t[`topics_${labelKey}`]?.items || [])
      : (selected.topics_dynamic || t.topics_dynamic || []);

    const faqs = faqsSource.map((faq: any) => ({
      q: replaceTemplates(faq.q, replacements),
      a: replaceTemplates(faq.a, replacements)
    }));
    
    const useCases = useCasesSource.map((uc: any) => ({
      title: replaceTemplates(uc.title, replacements),
      text: replaceTemplates(uc.text, replacements)
    }));
    
    const topics = topicsSource.map((topic: any) => ({
      title: replaceTemplates(topic.title, replacements),
      text: replaceTemplates(topic.text, replacements)
    }));

    return {
      title,
      description,
      keywords: `${title}, ${from} to ${to}, convert ${from} to ${to}, ${from} to ${to} time difference`,
      image: baseMeta.image || "/images/og/default.png",
      imageAlt: baseMeta.imageAlt || `${from} to ${to} Converter - timezone conversion tool`,
      faqs,
      useCases,
      topics
    };
  }
  if (labelKey === "authorJackie") {
    return t.pages.authorJackie || {
      title: "Jackie Bruce",
      description: "Author profile for Jackie Bruce, a timezone content specialist covering GMT, EST, EDT, daylight saving time, and global scheduling.",
      image: "/images/og/default.png",
      imageAlt: "Jackie Bruce Author Profile - GMT to EST Converter"
    };
  }

  const baseMeta = t.pages[labelKey] || t.pages.home;
  
  // Resolve page-specific arrays
  let faqs = [];
  let useCases = [];
  let topics = [];

  if (labelKey === "home" || labelKey === "gmtToEst") {
    faqs = t.faqs_home?.items || t.faqs?.items || [];
    useCases = t.useCases_home?.items || t.useCases?.items || [];
    topics = t.topics_home?.items || t.topics?.items || [];
  } else if (labelKey === "gmtVsEst" || labelKey === "difference") {
    faqs = t.faqs_difference?.items || [];
    useCases = t.useCases_difference?.items || [];
    topics = t.topics_difference?.items || [];
  } else if (labelKey === "estToGmt" || labelKey === "reverse") {
    faqs = t.faqs_reverse?.items || [];
    useCases = t.useCases_reverse?.items || [];
    topics = t.topics_reverse?.items || [];
  } else if (labelKey === "guide") {
    faqs = t.faqs_guide?.items || [];
    useCases = t.useCases_guide?.items || [];
    topics = t.topics_guide?.items || [];
  } else {
    faqs = t[`faqs_${labelKey}`]?.items || t.faqs_dynamic || t.faqs?.items || [];
    useCases = t[`useCases_${labelKey}`]?.items || t.useCases_dynamic || t.useCases?.items || [];
    topics = t[`topics_${labelKey}`]?.items || t.topics_dynamic || t.topics?.items || [];
  }

  const description = code !== "en" &&
    labelKey !== "home" &&
    baseMeta.description === t.pages?.home?.description
      ? `${baseMeta.title}. ${baseMeta.description}`
      : baseMeta.description;

  return {
    ...baseMeta,
    description,
    faqs,
    useCases,
    topics
  };
}

function uppercaseZone(value: string) {
  return value.toUpperCase();
}

export function getConverterDisplayName(page: any) {
  if (!page || !["converter", "reverse", "difference", "dynamic"].includes(page.kind)) return undefined;
  if (!page.slug) return "GMT to EST Converter";
  if (page.slug === "est-to-gmt") return "EST to GMT Converter";
  if (page.slug === "gmt-vs-est") return "GMT vs EST Difference";
  if (page.context?.from && page.context?.to) return `${page.context.from} to ${page.context.to} Converter`;

  const toEstMatch = page.slug.match(/^([a-z0-9]+)-to-est$/i);
  if (toEstMatch) return `${uppercaseZone(toEstMatch[1])} to EST Converter`;

  const gmtToMatch = page.slug.match(/^gmt-to-([a-z0-9]+)$/i);
  if (gmtToMatch) return `GMT to ${uppercaseZone(gmtToMatch[1])} Converter`;

  return undefined;
}

export function pageUrl(lang: string, slug = "") {
  if (lang === "en") {
    if (!slug) return "/";
    return `/${slug}/`;
  }
  return `/${lang}/${slug ? `${slug}/` : ""}`;
}
