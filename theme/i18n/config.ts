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
  { slug: "cdt-to-est", kind: "dynamic", labelKey: "cdtToEst", context: { from: "CDT", to: "EST", fromZone: "America/Chicago", toZone: "America/New_York" } },
  { slug: "cst-to-est", kind: "dynamic", labelKey: "cstToEst", context: { from: "CST", to: "EST", fromZone: "America/Chicago", toZone: "America/New_York" } },
  { slug: "kst-to-est", kind: "dynamic", labelKey: "kstToEst", context: { from: "KST", to: "EST", fromZone: "Asia/Seoul", toZone: "America/New_York" } },
  { slug: "pdt-to-est", kind: "dynamic", labelKey: "pdtToEst", context: { from: "PDT", to: "EST", fromZone: "America/Los_Angeles", toZone: "America/New_York" } },
  { slug: "mst-to-est", kind: "dynamic", labelKey: "mstToEst", context: { from: "MST", to: "EST", fromZone: "America/Denver", toZone: "America/New_York" } },
  { slug: "ast-to-est", kind: "dynamic", labelKey: "astToEst", context: { from: "AST", to: "EST", fromZone: "America/Halifax", toZone: "America/New_York" } },
  { slug: "gmt-to-acdt", kind: "dynamic", labelKey: "gmtToAcdt", context: { from: "GMT", to: "ACDT", fromZone: "UTC", toZone: "Australia/Adelaide" } },
  { slug: "gmt-to-bst", kind: "dynamic", labelKey: "gmtToBst", context: { from: "GMT", to: "BST", fromZone: "UTC", toZone: "Europe/London" } },
  { slug: "gmt-to-aest", kind: "dynamic", labelKey: "gmtToAest", context: { from: "GMT", to: "AEST", fromZone: "UTC", toZone: "Australia/Sydney" } },
  { slug: "gmt-to-idt", kind: "dynamic", labelKey: "gmtToIdt", context: { from: "GMT", to: "IDT", fromZone: "UTC", toZone: "Asia/Jerusalem" } },
  { slug: "eest-to-est", kind: "dynamic", labelKey: "eestToEst", context: { from: "EEST", to: "EST", fromZone: "Europe/Athens", toZone: "America/New_York" } },
  { slug: "gmt-to-nzst", kind: "dynamic", labelKey: "gmtToNzst", context: { from: "GMT", to: "NZST", fromZone: "UTC", toZone: "Pacific/Auckland" } },
  { slug: "aest-to-est", kind: "dynamic", labelKey: "aestToEst", context: { from: "AEST", to: "EST", fromZone: "Australia/Sydney", toZone: "America/New_York" } },
  { slug: "gmt-to-eet", kind: "dynamic", labelKey: "gmtToEet", context: { from: "GMT", to: "EET", fromZone: "UTC", toZone: "Europe/Athens" } },
  { slug: "est-to-gmt", kind: "reverse", labelKey: "estToGmt" },
  { slug: "gmt-vs-est", kind: "difference", labelKey: "gmtVsEst" },
  { slug: "time-zone-guide", kind: "guide", labelKey: "guide" },
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
  const specificDynamicKeys = ["cdtToEst", "cstToEst", "kstToEst", "pdtToEst", "mstToEst", "astToEst"];
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
