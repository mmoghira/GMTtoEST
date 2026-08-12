import { pages, pageUrl } from "./config";

export interface ClusterLink {
  href: string;
  label: string;
  description?: string;
}

export const educationalPages: ClusterLink[] = [
  { href: "/blog/what-is-gmt/", label: "What is GMT?", description: "Learn about Greenwich Mean Time, UTC+0 offset, and history." },
  { href: "/what-is-utc/", label: "What is UTC?", description: "Complete guide to Coordinated Universal Time standard." },
  { href: "/what-is-est/", label: "What is EST?", description: "Complete guide to Eastern Standard Time (UTC-5) and cities." },
  { href: "/what-is-edt/", label: "What is EDT?", description: "Eastern Daylight Time rules, transition dates, and cities." },
  { href: "/gmt-vs-utc/", label: "GMT vs UTC", description: "Key differences between Greenwich Mean Time and UTC." },
  { href: "/est-vs-edt/", label: "EST vs EDT", description: "Understand Standard Time vs Daylight Saving Time in Eastern Time." },
  { href: "/utc-vs-est/", label: "UTC vs EST", description: "Comparing Universal Time with US Eastern Standard Time." },
  { href: "/standard-time-vs-daylight-saving-time/", label: "Standard Time vs DST", description: "Technical and biological breakdown of Standard vs DST." },
  { href: "/how-time-zones-work/", label: "How Time Zones Work", description: "The physics, solar time, and international standard behind 24 global time zones." },
  { href: "/what-is-utc-offset/", label: "What is a UTC Offset?", description: "How positive and negative UTC offsets function across longitudinal meridians." },
  { href: "/how-to-convert-time-zones/", label: "How to Convert Time Zones", description: "Practical steps and mathematical formulas for quick time zone conversion." },
  { href: "/why-time-zones-exist/", label: "Why Time Zones Exist", description: "History of solar time, railway time, and standard time zone creation." },
  { href: "/international-date-line-explained/", label: "International Date Line", description: "Navigating 180° meridian calendar date changes." },
  { href: "/iso-8601-date-time-format/", label: "ISO 8601 Standard Format", description: "Comprehensive guide to standard date-time formatting." },
  { href: "/unix-time-explained/", label: "Unix Time & POSIX Timestamps", description: "Explanation of Unix timestamps and epoch time." },
  { href: "/daylight-saving-time-explained/", label: "Daylight Saving Time Explained", description: "Annual clock changes, spring forward, and fall back dates." },
  { href: "/world-time-zones-guide/", label: "World Time Zones Guide", description: "Comprehensive guide to global time zones and UTC offsets." },
  { href: "/military-time-converter-guide/", label: "Military Time Guide", description: "Convert 24-hour military time to 12-hour standard time." },
  { href: "/time-zone-abbreviations/", label: "Time Zone Abbreviations", description: "Glossary of global timezone acronyms (EST, PST, BST, IST, CET)." },
];

export const toolsPages: ClusterLink[] = [
  { href: "/world-clock/", label: "Global World Clock", description: "Live clocks and offsets for 50+ major cities worldwide." },
  { href: "/meeting-planner/", label: "Global Meeting Planner", description: "Multi-city business hours overlap matrix and schedule exporter." },
  { href: "/event-time-converter/", label: "Event Time Converter", description: "Convert host events to local attendee times and generate .ics calendar downloads." },
  { href: "/time-difference-calculator/", label: "Time Difference Calculator", description: "Exact hour and minute difference between any two cities." },
  { href: "/business-hours-overlap/", label: "Business Hours Overlap Tool", description: "Visualize team work windows and find optimal meeting slots." },
  { href: "/dst-calendar-tool/", label: "DST Calendar Tool", description: "Countdown timers and country transition rules." },
  { href: "/workday-calculator/", label: "Holiday & Working Day Calculator", description: "Calculate business days between dates excluding weekends." },
  { href: "/time-zone-map/", label: "Interactive Time Zone Map", description: "SVG world map with active time zones and day/night line." },
  { href: "/travel-time-planner/", label: "Travel Planner & Jet Lag Minimizer", description: "Arrival local times, jet lag score, and circadian adjustment protocol." },
  { href: "/developer-tools/", label: "Developer Toolkit", description: "Unix timestamp converter, ISO 8601 builder, and code snippets." },
  { href: "/widgets/", label: "Embeddable Widgets Generator", description: "Free customizable clocks and converters for external websites." },
  { href: "/downloads/", label: "Download Center", description: "Printable PDF conversion charts and world time reference sheets." },
];

export const dstPages: ClusterLink[] = [
  { href: "/what-is-daylight-saving-time/", label: "What is Daylight Saving Time?", description: "Complete guide to DST origin, purpose, and energy savings." },
  { href: "/dst-start-end-dates/", label: "DST Start & End Dates", description: "Global transition schedules for spring forward and fall back." },
  { href: "/countries-that-use-dst/", label: "Countries That Use DST", description: "List of nations utilizing daylight saving adjustments." },
  { href: "/countries-without-dst/", label: "Countries Without DST", description: "Nations that observe fixed year-round standard time." },
  { href: "/why-dst-exists/", label: "Why DST Exists", description: "Economic, historical, and agricultural background of DST." },
  { href: "/dst-history/", label: "DST History", description: "Evolution from Benjamin Franklin to modern daylight saving laws." },
  { href: "/business-impact-of-dst/", label: "Business Impact of DST", description: "Operational risks, missed meetings, and financial implications." },
  { href: "/dst-calendar/", label: "DST Calendar", description: "Updated annual calendar of DST transition dates worldwide." },
];

export const countryPages: ClusterLink[] = [
  { href: "/usa-time-zones/", label: "United States Time Zones", description: "Overview of EST, CST, MST, PST, AKST, and HST." },
  { href: "/canada-time-zones/", label: "Canada Time Zones", description: "Time zones across Canadian provinces from NDT to PST." },
  { href: "/australia-time-zones/", label: "Australia Time Zones", description: "Guide to AEST, ACST, AWST, and daylight saving in Australia." },
  { href: "/united-kingdom-time-zone/", label: "United Kingdom Time Zone", description: "GMT/BST observance and British summer adjustments." },
  { href: "/india-time-zone/", label: "India Time Zone", description: "Understanding India Standard Time (IST, UTC+5:30)." },
  { href: "/japan-time-zone/", label: "Japan Time Zone", description: "Japan Standard Time (JST, UTC+9) and non-DST policy." },
  { href: "/china-time-zone/", label: "China Time Zone", description: "Single timezone policy (Beijing Time, UTC+8)." },
  { href: "/pakistan-time-zone/", label: "Pakistan Time Zone", description: "Pakistan Standard Time (PKT, UTC+5)." },
  { href: "/germany-time-zone/", label: "Germany Time Zone", description: "Central European Time (CET/CEST) in Germany." },
  { href: "/france-time-zone/", label: "France Time Zone", description: "Metropolitan France and overseas territory time zones." },
  { href: "/brazil-time-zones/", label: "Brazil Time Zones", description: "Official time zones across Amazonian and coastal Brazil." },
  { href: "/mexico-time-zones/", label: "Mexico Time Zones", description: "Time zone rules across Mexican states." },
  { href: "/russia-time-zones/", label: "Russia Time Zones", description: "11 consecutive time zones from Kaliningrad to Kamchatka." },
  { href: "/south-africa-time-zone/", label: "South Africa Time Zone", description: "South Africa Standard Time (SAST, UTC+2)." },
  { href: "/uae-time-zone/", label: "UAE Time Zone", description: "Gulf Standard Time (GST, UTC+4) in Dubai and Abu Dhabi." },
];

export const cityPages: ClusterLink[] = [
  { href: "/new-york-time/", label: "New York Time", description: "Current time in New York (Eastern Time Zone)." },
  { href: "/los-angeles-time/", label: "Los Angeles Time", description: "Current time in Los Angeles (Pacific Time Zone)." },
  { href: "/chicago-time/", label: "Chicago Time", description: "Current time in Chicago (Central Time Zone)." },
  { href: "/toronto-time/", label: "Toronto Time", description: "Current time in Toronto, Ontario." },
  { href: "/vancouver-time/", label: "Vancouver Time", description: "Current time in Vancouver, British Columbia." },
  { href: "/london-time/", label: "London Time", description: "Current time in London, UK (GMT / BST)." },
  { href: "/paris-time/", label: "Paris Time", description: "Current time in Paris, France (CET / CEST)." },
  { href: "/berlin-time/", label: "Berlin Time", description: "Current time in Berlin, Germany (CET / CEST)." },
  { href: "/dubai-time/", label: "Dubai Time", description: "Current time in Dubai, UAE (GST, UTC+4)." },
  { href: "/karachi-time/", label: "Karachi Time", description: "Current time in Karachi, Pakistan (PKT, UTC+5)." },
  { href: "/mumbai-time/", label: "Mumbai Time", description: "Current time in Mumbai, India (IST, UTC+5:30)." },
  { href: "/delhi-time/", label: "Delhi Time", description: "Current time in New Delhi, India (IST, UTC+5:30)." },
  { href: "/tokyo-time/", label: "Tokyo Time", description: "Current time in Tokyo, Japan (JST, UTC+9)." },
  { href: "/seoul-time/", label: "Seoul Time", description: "Current time in Seoul, South Korea (KST, UTC+9)." },
  { href: "/singapore-time/", label: "Singapore Time", description: "Current time in Singapore (SST, UTC+8)." },
  { href: "/sydney-time/", label: "Sydney Time", description: "Current time in Sydney, Australia (AEST / AEDT)." },
  { href: "/auckland-time/", label: "Auckland Time", description: "Current time in Auckland, New Zealand (NZST / NZDT)." },
];

export const businessPages: ClusterLink[] = [
  { href: "/best-time-us-europe-meetings/", label: "Best Time for US–Europe Meetings", description: "Overlap schedules between North America and Europe." },
  { href: "/best-time-us-asia-meetings/", label: "Best Time for US–Asia Meetings", description: "Bridge 12–15 hour gaps between US and Asian hubs." },
  { href: "/remote-team-scheduling/", label: "Remote Team Scheduling", description: "Frameworks for async work and fair rotation across distributed teams." },
  { href: "/time-zones-for-freelancers/", label: "Time Zones for Freelancers", description: "Managing client deadlines and global invoicing." },
  { href: "/global-customer-support-scheduling/", label: "Global Customer Support", description: "Designing 24/7 follow-the-sun support handovers." },
  { href: "/stock-market-opening-times/", label: "Stock Market Opening Times", description: "NYSE, NASDAQ, LSE, Tokyo, and Hong Kong trading hours." },
];

export const developerPages: ClusterLink[] = [
  { href: "/handling-time-zones-javascript/", label: "Time Zones in JavaScript", description: "Date caveats, Intl.DateTimeFormat, and Luxon/Day.js." },
  { href: "/time-zones-in-python/", label: "Time Zones in Python", description: "datetime, zoneinfo module, and pytz best practices." },
  { href: "/php-datetime-guide/", label: "PHP DateTime Guide", description: "DateTimeZone and UTC storage strategies." },
  { href: "/java-time-api/", label: "Java Time API", description: "ZonedDateTime, Instant, and ZoneId in Java." },
  { href: "/time-zone-database-iana/", label: "IANA Time Zone Database", description: "Olson tzdb database releases and maintainer rules." },
];

export const abbreviationPages: ClusterLink[] = [
  { href: "/gmt/", label: "GMT - Greenwich Mean Time", description: "UTC+0 standard reference time zone." },
  { href: "/utc/", label: "UTC - Coordinated Universal Time", description: "Primary time standard by which the world regulates clocks." },
  { href: "/est/", label: "EST - Eastern Standard Time", description: "UTC-5 standard time for eastern North America." },
  { href: "/edt/", label: "EDT - Eastern Daylight Time", description: "UTC-4 daylight saving time for eastern North America." },
  { href: "/cst/", label: "CST - Central Standard Time", description: "UTC-6 standard time for central North America." },
  { href: "/pst/", label: "PST - Pacific Standard Time", description: "UTC-8 standard time for western North America." },
  { href: "/bst/", label: "BST - British Summer Time", description: "UTC+1 daylight saving time in the United Kingdom." },
  { href: "/ist/", label: "IST - India Standard Time", description: "UTC+5:30 official time zone for India." },
  { href: "/cet/", label: "CET - Central European Time", description: "UTC+1 standard time across central Europe." },
];

// Region mappings for converters
const regionMap: Record<string, { countries: ClusterLink[]; cities: ClusterLink[] }> = {
  est: {
    countries: [countryPages[0], countryPages[1]], // USA, Canada
    cities: [cityPages[0], cityPages[3]], // New York, Toronto
  },
  pst: {
    countries: [countryPages[0]], // USA
    cities: [cityPages[1], cityPages[4]], // Los Angeles, Vancouver
  },
  cst: {
    countries: [countryPages[0], countryPages[1]],
    cities: [cityPages[2]], // Chicago
  },
  gmt: {
    countries: [countryPages[3]], // UK
    cities: [cityPages[5]], // London
  },
  bst: {
    countries: [countryPages[3]],
    cities: [cityPages[5]],
  },
  ist: {
    countries: [countryPages[4]], // India
    cities: [cityPages[10], cityPages[11]], // Mumbai, Delhi
  },
  aest: {
    countries: [countryPages[2]], // Australia
    cities: [cityPages[15]], // Sydney
  },
  jst: {
    countries: [countryPages[5]], // Japan
    cities: [cityPages[12]], // Tokyo
  },
};

/**
 * Returns 8-12 semantically related converter pages for a given slug.
 */
export function getRelatedConverters(currentSlug: string, lang = "en"): ClusterLink[] {
  const converterPages = pages.filter(
    (page: any) =>
      ["converter", "reverse", "difference", "dynamic"].includes(page.kind) &&
      page.slug !== currentSlug &&
      page.slug !== ""
  );

  const matches: ClusterLink[] = [];
  const targetLower = currentSlug.toLowerCase();

  if (targetLower.startsWith("gmt-to-")) {
    const zone = targetLower.replace("gmt-to-", "");
    const reverseSlug = `${zone}-to-est`;
    const reversePage = converterPages.find((p) => p.slug === reverseSlug);
    if (reversePage) {
      matches.push({
        href: pageUrl(lang, reversePage.slug),
        label: `${zone.toUpperCase()} to EST Converter`,
        description: `Convert ${zone.toUpperCase()} directly to Eastern Standard Time.`,
      });
    }
  } else if (targetLower.endsWith("-to-est")) {
    const zone = targetLower.replace("-to-est", "");
    const gmtSlug = `gmt-to-${zone}`;
    const gmtPage = converterPages.find((p) => p.slug === gmtSlug);
    if (gmtPage) {
      matches.push({
        href: pageUrl(lang, gmtPage.slug),
        label: `GMT to ${zone.toUpperCase()} Converter`,
        description: `Convert Greenwich Mean Time to ${zone.toUpperCase()}.`,
      });
    }
  }

  const staples = ["gmt-to-est", "est-to-gmt", "gmt-vs-est", "gmt-to-pst", "gmt-to-cst", "gmt-to-utc", "ist-to-est", "bst-to-est", "cet-to-est"];
  for (const staple of staples) {
    if (staple !== currentSlug && matches.length < 12) {
      const p = pages.find((item) => item.slug === staple);
      if (p && !matches.some((m) => m.href === pageUrl(lang, p.slug))) {
        matches.push({
          href: pageUrl(lang, p.slug),
          label: p.slug === "gmt-to-est" ? "GMT to EST Converter"
            : p.slug === "est-to-gmt" ? "EST to GMT Converter"
            : p.slug === "gmt-vs-est" ? "GMT vs EST Difference"
            : `${p.context?.from || "GMT"} to ${p.context?.to || "EST"} Converter`,
          description: `Instant calculation for ${p.slug}.`,
        });
      }
    }
  }

  for (const page of converterPages) {
    if (matches.length >= 10) break;
    const href = pageUrl(lang, page.slug);
    if (!matches.some((m) => m.href === href)) {
      const label = page.slug === "est-to-gmt" ? "EST to GMT Converter"
        : page.slug === "gmt-vs-est" ? "GMT vs EST Difference"
        : page.context?.from && page.context?.to ? `${page.context.from} to ${page.context.to} Converter`
        : page.slug;
      matches.push({ href, label, description: `Time conversion guide for ${label}.` });
    }
  }

  return matches.slice(0, 10);
}

/**
 * Returns "Users Also Visit" recommendations.
 */
export function getUsersAlsoVisit(currentSlug: string, lang = "en"): ClusterLink[] {
  const currentLower = currentSlug.toLowerCase();
  const suggestions: ClusterLink[] = [];

  const candidates = [
    { slug: "gmt-to-est", label: "GMT to EST Converter" },
    { slug: "gmt-to-cst", label: "GMT to CST Converter" },
    { slug: "gmt-to-pst", label: "GMT to PST Converter" },
    { slug: "gmt-to-utc", label: "GMT to UTC Converter" },
    { slug: "ist-to-est", label: "IST to EST Converter" },
    { slug: "bst-to-est", label: "BST to EST Converter" },
    { slug: "cet-to-est", label: "CET to EST Converter" },
    { slug: "est-to-gmt", label: "EST to GMT Converter" },
    { slug: "gmt-vs-est", label: "GMT vs EST Difference" },
  ];

  for (const item of candidates) {
    if (item.slug !== currentLower) {
      suggestions.push({
        href: pageUrl(lang, item.slug),
        label: item.label,
        description: `Popular comparison for users managing global clocks.`,
      });
    }
  }

  return suggestions.slice(0, 6);
}

/**
 * Returns Educational guides for a page.
 */
export function getEducationalGuides(currentSlug: string): ClusterLink[] {
  return educationalPages.filter((item) => item.href !== `/${currentSlug}/`).slice(0, 6);
}

/**
 * Returns Country & City suggestions based on page slug.
 */
export function getCountryCitySuggestions(currentSlug: string): { countries: ClusterLink[]; cities: ClusterLink[] } {
  const lower = currentSlug.toLowerCase();
  let zoneKey = "";
  if (lower.startsWith("gmt-to-")) zoneKey = lower.replace("gmt-to-", "");
  else if (lower.endsWith("-to-est")) zoneKey = lower.replace("-to-est", "");

  const matched = regionMap[zoneKey] || {
    countries: [countryPages[0], countryPages[1]], // Default USA & Canada
    cities: [cityPages[0], cityPages[1]], // New York & LA
  };

  return {
    countries: matched.countries.length ? matched.countries : [countryPages[0]],
    cities: matched.cities.length ? matched.cities : [cityPages[0]],
  };
}
