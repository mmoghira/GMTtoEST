const DEFAULT_KEYWORD = "GMT to EST";

export function getPrimaryKeyword(keywords?: string, fallback = DEFAULT_KEYWORD): string {
  const firstKeyword = keywords
    ?.split(",")
    .map((item) => item.trim())
    .find(Boolean);

  return firstKeyword || fallback;
}

export function ensureKeywordInAlt(altText: string | undefined, keyword: string, fallbackAlt?: string): string {
  const normalizedKeyword = keyword.trim().toLowerCase();
  const baseAlt = altText?.trim() || fallbackAlt || `${keyword} featured image`;

  if (!normalizedKeyword) return baseAlt;
  if (baseAlt.toLowerCase().includes(normalizedKeyword)) return baseAlt;

  return `${baseAlt} - ${keyword}`;
}
