export type Lang = {
  code: string;
  name: string;
  dir: "ltr" | "rtl";
};

const rawSiteUrl = import.meta.env.SITE_URL || "https://gmttoestconverter.com";
export const siteUrl = rawSiteUrl.replace(/\/+$/, "").replace("://www.", "://");

export const languages: Lang[] = [
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
const estList = ["ACDT","ACST","ADT","AEDT","AEST","AKDT","AKST","AST","AWST","BST","CAT","CDT","CEST","CET","ChST","CST","EAT","EDT","EEST","EET","HDT","HKT","HST","IDT","IST","JST","KST","MDT","MEST","MET","MSK","MST","NDT","NST","NZDT","NZST","PDT","PKT","PST","SAST","SST","UTC","WAT","WEST","WET","WIB","WIT","WITA"];

const extraPages = [
  ...gmtList.map(z => ({ slug: `gmt-to-${z.toLowerCase()}`, kind: "dynamic", labelKey: "dynamic", context: { from: "GMT", to: z, fromZone: "UTC", toZone: tzMap[z] } })),
  ...estList.map(z => ({ slug: `${z.toLowerCase()}-to-est`, kind: "dynamic", labelKey: "dynamic", context: { from: z, to: "EST", fromZone: tzMap[z], toZone: "America/New_York" } }))
];

export const pages: any[] = [
  { slug: "", kind: "converter", labelKey: "home" },
  { slug: "gmt-to-est", kind: "converter", labelKey: "gmtToEst" },
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
      keywords: `${from} to ${to}, convert ${from} to ${to}, ${from} to ${to} converter, ${from} to ${to} time difference`
    };
  }
  return t.pages[labelKey] || t.pages.home;
}

export function pageUrl(lang: string, slug = "") {
  if (lang === "en") {
    if (!slug) return "/";
    return `/${slug}/`;
  }
  return `/${lang}/${slug ? `${slug}/` : ""}`;
}
