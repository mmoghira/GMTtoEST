export type Lang = {
  code: string;
  name: string;
  dir: "ltr" | "rtl";
};

const rawSiteUrl = import.meta.env.SITE_URL || "https://gmttoestconverter.com";
export const siteUrl = rawSiteUrl.replace(/\/+$/, "").replace("://www.", "://");
export const multilingualPagesEnabled = import.meta.env.PUBLIC_ENABLE_MULTILINGUAL === "true";
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
  { slug: "cdt-to-est", kind: "converter", labelKey: "cdtToEst" },
  { slug: "cst-to-est", kind: "converter", labelKey: "cstToEst" },
  { slug: "mst-to-est", kind: "dynamic", labelKey: "dynamic", context: { from: "MST", to: "EST", fromZone: "America/Denver", toZone: "America/New_York" } },
  { slug: "ast-to-est", kind: "dynamic", labelKey: "dynamic", context: { from: "AST", to: "EST", fromZone: "America/Halifax", toZone: "America/New_York" } },
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

export function getPageMeta(code: string, labelKey = "home", pageContext?: any) {
  const t = getTranslation(code);
  if (labelKey === "dynamic" && pageContext) {
    const { from, to } = pageContext;
    return {
      title: `${from} to ${to} Converter`,
      description: `Use this ${from} to ${to} converter for instant, date-aware conversions with daylight saving time handling, live clocks, and meeting planner.`,
      keywords: `${from} to ${to}, convert ${from} to ${to}, ${from} to ${to} converter, ${from} to ${to} time difference`,
      image: "/images/og/default.png",
      imageAlt: `${from} to ${to} Converter - timezone conversion tool`
    };
  }
  return t.pages[labelKey] || t.pages.home;
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
