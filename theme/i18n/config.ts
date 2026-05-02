export type Lang = {
  code: string;
  name: string;
  dir: "ltr" | "rtl";
};

export const siteUrl = import.meta.env.SITE_URL || "https://gmttoest.com";

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

export const pages = [
  { slug: "", kind: "converter", labelKey: "home" },
  { slug: "gmt-to-est", kind: "converter", labelKey: "gmtToEst" },
  { slug: "est-to-gmt", kind: "reverse", labelKey: "estToGmt" },
  { slug: "gmt-vs-est", kind: "difference", labelKey: "gmtVsEst" },
  { slug: "time-zone-guide", kind: "guide", labelKey: "guide" }
] as const;

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

export function getPageMeta(code: string, labelKey = "home") {
  const t = getTranslation(code);
  return t.pages[labelKey] || t.pages.home;
}

export function pageUrl(lang: string, slug = "") {
  return `/${lang}/${slug ? `${slug}/` : ""}`;
}
