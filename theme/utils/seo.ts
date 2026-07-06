const DEFAULT_KEYWORD = "GMT to EST";
const DISPLAY_TITLE_OVERRIDES: Record<string, string> = {
  "2026-monaco-grand-prix-schedule-gmt-est-timezone": "2026 Monaco Grand Prix Schedule in GMT and EST",
  "black-friday-cyber-monday-2026-times-gmt-est-timezone": "Black Friday and Cyber Monday 2026 Sale Times by Time Zone",
  "clocks-change-2026-uk-us-daylight-saving-dates": "2026 UK and US Daylight Saving Clock Change Dates",
  "fifa-world-cup-2026-kickoff-times-gmt-est-timezone": "FIFA World Cup 2026 Kickoff Times in GMT and EST",
  "icc-womens-t20-world-cup-2026-schedule-gmt-est-bst-timezone": "Women's T20 World Cup 2026 Schedule in GMT and EST",
  "la-2028-olympics-timezone-guide-gmt-bst-pkt-ist-worldwide": "LA 2028 Olympics Time Zone Guide",
  "uefa-champions-league-final-2026-kickoff-time-gmt-est": "UEFA Champions League Final 2026 Kickoff Time by Zone",
  "wimbledon-2026-schedule-gmt-est-bst-timezone": "Wimbledon 2026 Schedule in GMT and EST"
};

export function getConciseDisplayTitle(slug: string, fallback: string): string {
  return DISPLAY_TITLE_OVERRIDES[slug] || fallback;
}

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
