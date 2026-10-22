import { tzMap } from "../i18n/config";

export interface ZoneMeta {
  abbr: string;
  name: string;
  offset: number; // in hours from UTC
  iana: string;
  dstCategory: "us_same" | "no_dst" | "uk_eu" | "southern" | "canada_atlantic";
}

export const ZONE_DICTIONARY: Record<string, ZoneMeta> = {
  GMT: { abbr: "GMT", name: "Greenwich Mean Time", offset: 0, iana: "Etc/GMT", dstCategory: "uk_eu" },
  UTC: { abbr: "UTC", name: "Coordinated Universal Time", offset: 0, iana: "UTC", dstCategory: "no_dst" },
  CST: { abbr: "CST", name: "Central Standard Time", offset: -6, iana: "America/Chicago", dstCategory: "us_same" },
  CDT: { abbr: "CDT", name: "Central Daylight Time", offset: -5, iana: "America/Chicago", dstCategory: "us_same" },
  PST: { abbr: "PST", name: "Pacific Standard Time", offset: -8, iana: "America/Los_Angeles", dstCategory: "us_same" },
  PDT: { abbr: "PDT", name: "Pacific Daylight Time", offset: -7, iana: "America/Los_Angeles", dstCategory: "us_same" },
  MST: { abbr: "MST", name: "Mountain Standard Time", offset: -7, iana: "America/Denver", dstCategory: "us_same" },
  MDT: { abbr: "MDT", name: "Mountain Daylight Time", offset: -6, iana: "America/Denver", dstCategory: "us_same" },
  EST: { abbr: "EST", name: "Eastern Standard Time", offset: -5, iana: "America/New_York", dstCategory: "us_same" },
  EDT: { abbr: "EDT", name: "Eastern Daylight Time", offset: -4, iana: "America/New_York", dstCategory: "us_same" },
  AST: { abbr: "AST", name: "Atlantic Standard Time", offset: -4, iana: "America/Halifax", dstCategory: "canada_atlantic" },
  ADT: { abbr: "ADT", name: "Atlantic Daylight Time", offset: -3, iana: "America/Halifax", dstCategory: "canada_atlantic" },
  AKST: { abbr: "AKST", name: "Alaska Standard Time", offset: -9, iana: "America/Anchorage", dstCategory: "us_same" },
  AKDT: { abbr: "AKDT", name: "Alaska Daylight Time", offset: -8, iana: "America/Anchorage", dstCategory: "us_same" },
  HST: { abbr: "HST", name: "Hawaii Standard Time", offset: -10, iana: "Pacific/Honolulu", dstCategory: "no_dst" },
  HDT: { abbr: "HDT", name: "Hawaii-Aleutian Daylight Time", offset: -9, iana: "America/Adak", dstCategory: "us_same" },
  BST: { abbr: "BST", name: "British Summer Time", offset: 1, iana: "Europe/London", dstCategory: "uk_eu" },
  CET: { abbr: "CET", name: "Central European Time", offset: 1, iana: "Europe/Paris", dstCategory: "uk_eu" },
  CEST: { abbr: "CEST", name: "Central European Summer Time", offset: 2, iana: "Europe/Paris", dstCategory: "uk_eu" },
  MET: { abbr: "MET", name: "Middle European Time", offset: 1, iana: "Europe/Paris", dstCategory: "uk_eu" },
  MEST: { abbr: "MEST", name: "Middle European Summer Time", offset: 2, iana: "Europe/Paris", dstCategory: "uk_eu" },
  EET: { abbr: "EET", name: "Eastern European Time", offset: 2, iana: "Europe/Athens", dstCategory: "uk_eu" },
  EEST: { abbr: "EEST", name: "Eastern European Summer Time", offset: 3, iana: "Europe/Athens", dstCategory: "uk_eu" },
  WET: { abbr: "WET", name: "Western European Time", offset: 0, iana: "Europe/Lisbon", dstCategory: "uk_eu" },
  WEST: { abbr: "WEST", name: "Western European Summer Time", offset: 1, iana: "Europe/Lisbon", dstCategory: "uk_eu" },
  MSK: { abbr: "MSK", name: "Moscow Standard Time", offset: 3, iana: "Europe/Moscow", dstCategory: "no_dst" },
  IST: { abbr: "IST", name: "India Standard Time", offset: 5.5, iana: "Asia/Kolkata", dstCategory: "no_dst" },
  JST: { abbr: "JST", name: "Japan Standard Time", offset: 9, iana: "Asia/Tokyo", dstCategory: "no_dst" },
  KST: { abbr: "KST", name: "Korea Standard Time", offset: 9, iana: "Asia/Seoul", dstCategory: "no_dst" },
  HKT: { abbr: "HKT", name: "Hong Kong Time", offset: 8, iana: "Asia/Hong_Kong", dstCategory: "no_dst" },
  PKT: { abbr: "PKT", name: "Pakistan Standard Time", offset: 5, iana: "Asia/Karachi", dstCategory: "no_dst" },
  IDT: { abbr: "IDT", name: "Israel Daylight Time", offset: 3, iana: "Asia/Jerusalem", dstCategory: "uk_eu" },
  AEST: { abbr: "AEST", name: "Australian Eastern Standard Time", offset: 10, iana: "Australia/Sydney", dstCategory: "southern" },
  AEDT: { abbr: "AEDT", name: "Australian Eastern Daylight Time", offset: 11, iana: "Australia/Sydney", dstCategory: "southern" },
  ACST: { abbr: "ACST", name: "Australian Central Standard Time", offset: 9.5, iana: "Australia/Adelaide", dstCategory: "southern" },
  ACDT: { abbr: "ACDT", name: "Australian Central Daylight Time", offset: 10.5, iana: "Australia/Adelaide", dstCategory: "southern" },
  AWST: { abbr: "AWST", name: "Australian Western Standard Time", offset: 8, iana: "Australia/Perth", dstCategory: "no_dst" },
  NZST: { abbr: "NZST", name: "New Zealand Standard Time", offset: 12, iana: "Pacific/Auckland", dstCategory: "southern" },
  NZDT: { abbr: "NZDT", name: "New Zealand Daylight Time", offset: 13, iana: "Pacific/Auckland", dstCategory: "southern" },
  NST: { abbr: "NST", name: "Newfoundland Standard Time", offset: -3.5, iana: "America/St_Johns", dstCategory: "canada_atlantic" },
  NDT: { abbr: "NDT", name: "Newfoundland Daylight Time", offset: -2.5, iana: "America/St_Johns", dstCategory: "canada_atlantic" },
  CHST: { abbr: "CHST", name: "Chamorro Standard Time", offset: 10, iana: "Pacific/Guam", dstCategory: "no_dst" },
  SST: { abbr: "SST", name: "Samoa Standard Time", offset: -11, iana: "Pacific/Pago_Pago", dstCategory: "no_dst" },
  CAT: { abbr: "CAT", name: "Central Africa Time", offset: 2, iana: "Africa/Maputo", dstCategory: "no_dst" },
  EAT: { abbr: "EAT", name: "East Africa Time", offset: 3, iana: "Africa/Nairobi", dstCategory: "no_dst" },
  WAT: { abbr: "WAT", name: "West Africa Time", offset: 1, iana: "Africa/Lagos", dstCategory: "no_dst" },
  SAST: { abbr: "SAST", name: "South Africa Standard Time", offset: 2, iana: "Africa/Johannesburg", dstCategory: "no_dst" },
  WIB: { abbr: "WIB", name: "Western Indonesia Time", offset: 7, iana: "Asia/Jakarta", dstCategory: "no_dst" },
  WIT: { abbr: "WIT", name: "Eastern Indonesia Time", offset: 9, iana: "Asia/Jayapura", dstCategory: "no_dst" },
  WITA: { abbr: "WITA", name: "Central Indonesia Time", offset: 8, iana: "Asia/Makassar", dstCategory: "no_dst" }
};

export function formatUtc(offset: number): string {
  if (offset === 0) return "UTC+0";
  const sign = offset < 0 ? "UTC−" : "UTC+";
  const abs = Math.abs(offset);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  if (m === 0) {
    return `${sign}${h}`;
  }
  return `${sign}${h}:${String(m).padStart(2, "0")}`;
}

export function formatHoursDifference(delta: number): string {
  const abs = Math.abs(delta);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  if (m === 0) {
    return h === 1 ? "1 hour" : `${h} hours`;
  }
  if (h === 0) {
    return `${m} minutes`;
  }
  return `${h} ${h === 1 ? "hour" : "hours"} and ${m} minutes`;
}

export function getZoneMeta(zoneCode: string): ZoneMeta {
  const code = (zoneCode || "GMT").trim().toUpperCase();
  if (ZONE_DICTIONARY[code]) {
    return ZONE_DICTIONARY[code];
  }
  // Fallback to tzMap if not in dictionary
  const fallbackIana = tzMap[code] || "UTC";
  return {
    abbr: code,
    name: `${code} Time`,
    offset: 0,
    iana: fallbackIana,
    dstCategory: "no_dst"
  };
}

export interface QuickAnswerPayload {
  zoneA: string;
  zoneB: string;
  zoneAName: string;
  zoneBName: string;
  zoneBHeader: string;
  offsetA: number;
  offsetAFormatted: string;
  definitionSentence: string;
  sourceLiveTime: string;
  estLiveTime: string;
  targetLiveTime: string;
  liveTimeSentence: string;
  liveLineHtml?: string;
  tableConversions: Array<{ sourceTime: string; targetTime: string; estTime?: string }>;
  tableCaption: string;
  faqs: Array<{ q: string; a: string }>;
}

export function getQuickAnswerPayload(
  zoneCode: string,
  targetCodeOrDate: string | Date = "EST",
  dateNow: Date = new Date()
): QuickAnswerPayload {
  const targetCode = typeof targetCodeOrDate === "string" ? targetCodeOrDate.toUpperCase() : "EST";
  const now = targetCodeOrDate instanceof Date ? targetCodeOrDate : dateNow;
  const sourceCode = (zoneCode || "GMT").trim().toUpperCase();

  if (sourceCode === "WHAT-IS-EST" || sourceCode === "WHAT_IS_EST" || sourceCode === "WHATISEST") {
    let estLiveTime = "";
    let gmtLiveTime = "";
    try {
      estLiveTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/New_York"
      }).format(now);
    } catch (e) {
      estLiveTime = "--:--";
    }

    try {
      gmtLiveTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
      }).format(now);
    } catch (e) {
      gmtLiveTime = "--:--";
    }

    return {
      zoneA: "GMT",
      zoneB: "EST",
      zoneAName: "Greenwich Mean Time",
      zoneBName: "Eastern Standard Time",
      zoneBHeader: "EST Time",
      offsetA: 0,
      offsetAFormatted: "UTC+0",
      definitionSentence: "EST (Eastern Standard Time, UTC-5) is the time zone used across the eastern United States and Canada in winter, 5 hours behind GMT (UTC+0).",
      sourceLiveTime: gmtLiveTime,
      estLiveTime,
      targetLiveTime: estLiveTime,
      liveTimeSentence: `Right now it is ${estLiveTime} EST (${gmtLiveTime} GMT)`,
      liveLineHtml: `Right now it is <strong>${estLiveTime} EST</strong> (<strong>${gmtLiveTime} GMT</strong>)`,
      tableConversions: [
        { sourceTime: "12 AM GMT", targetTime: "7 PM EST (previous day)", estTime: "7 PM EST (previous day)" },
        { sourceTime: "6 AM GMT", targetTime: "1 AM EST", estTime: "1 AM EST" },
        { sourceTime: "9 AM GMT", targetTime: "4 AM EST", estTime: "4 AM EST" },
        { sourceTime: "12 PM GMT", targetTime: "7 AM EST", estTime: "7 AM EST" },
        { sourceTime: "5 PM GMT", targetTime: "12 PM EST", estTime: "12 PM EST" },
        { sourceTime: "9 PM GMT", targetTime: "4 PM EST", estTime: "4 PM EST" }
      ],
      tableCaption: "Eastern Time is EST (UTC-5) in winter and EDT (UTC-4) in summer, so the gap to GMT shifts between 5 and 4 hours.",
      faqs: [
        {
          q: "What is EST time?",
          a: "EST stands for Eastern Standard Time (UTC-5). It is the standard time zone for the eastern US and Canada, used from the first Sunday in November to the second Sunday in March."
        },
        {
          q: "What is the difference between EST and EDT?",
          a: "EST (UTC-5) is Eastern Standard Time, used in winter. EDT (UTC-4) is Eastern Daylight Time, used in summer when clocks spring forward one hour. The US switches back to EST on the first Sunday of November."
        },
        {
          q: "Is EST the same as GMT-5?",
          a: "Yes. EST is exactly 5 hours behind GMT (UTC+0) all year. GMT never changes — when Eastern switches to EDT in summer, the gap to GMT becomes 4 hours instead of 5."
        }
      ]
    };
  }

  if ((sourceCode === "GMT" || sourceCode === "UTC") && targetCode === "IST") {
    let sourceLiveTime = "";
    let targetLiveTime = "";
    try {
      sourceLiveTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
      }).format(now);
    } catch (e) {
      sourceLiveTime = "--:--";
    }

    try {
      targetLiveTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      }).format(now);
    } catch (e) {
      targetLiveTime = "--:--";
    }

    return {
      zoneA: "GMT",
      zoneB: "IST",
      zoneAName: "Greenwich Mean Time",
      zoneBName: "India Standard Time",
      zoneBHeader: "IST (India Standard Time)",
      offsetA: 0,
      offsetAFormatted: "UTC+0",
      definitionSentence: "IST (India Standard Time, UTC+5:30) is 5 hours 30 minutes ahead of GMT (UTC+0).",
      sourceLiveTime,
      estLiveTime: targetLiveTime,
      targetLiveTime,
      liveTimeSentence: `Right now it is ${sourceLiveTime} GMT = ${targetLiveTime} IST.`,
      tableConversions: [
        { sourceTime: "12 AM GMT", targetTime: "5:30 AM IST", estTime: "5:30 AM IST" },
        { sourceTime: "6 AM GMT", targetTime: "11:30 AM IST", estTime: "11:30 AM IST" },
        { sourceTime: "9 AM GMT", targetTime: "2:30 PM IST", estTime: "2:30 PM IST" },
        { sourceTime: "12 PM GMT", targetTime: "5:30 PM IST", estTime: "5:30 PM IST" },
        { sourceTime: "5 PM GMT", targetTime: "10:30 PM IST", estTime: "10:30 PM IST" },
        { sourceTime: "9 PM GMT", targetTime: "2:30 AM IST (next day)", estTime: "2:30 AM IST (next day)" }
      ],
      tableCaption: "IST never observes daylight saving, so the 5 hour 30 minute gap stays the same all year.",
      faqs: [
        {
          q: "What is the time difference between GMT and IST?",
          a: "IST (India Standard Time) is 5 hours and 30 minutes ahead of GMT. The difference never changes, because India does not observe daylight saving time."
        },
        {
          q: "What is 12 PM GMT in IST?",
          a: "12 PM GMT is 5:30 PM IST on the same day."
        },
        {
          q: "Does the GMT to IST time difference change in summer?",
          a: "No. Neither GMT nor IST observes daylight saving, so the gap stays 5 hours 30 minutes all year — unlike GMT to EST, which changes between 5 and 4 hours."
        }
      ]
    };
  }

  if ((sourceCode === "IST" && targetCode === "GMT") || sourceCode === "IST-TO-GMT" || sourceCode === "IST_TO_GMT") {
    let istLiveTime = "";
    let gmtLiveTime = "";
    try {
      istLiveTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      }).format(now);
    } catch (e) {
      istLiveTime = "--:--";
    }

    try {
      gmtLiveTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
      }).format(now);
    } catch (e) {
      gmtLiveTime = "--:--";
    }

    return {
      zoneA: "IST",
      zoneB: "GMT",
      zoneAName: "India Standard Time",
      zoneBName: "Greenwich Mean Time",
      zoneBHeader: "GMT Time",
      offsetA: 5.5,
      offsetAFormatted: "UTC+5:30",
      definitionSentence: "IST (India Standard Time, UTC+5:30) is 5 hours 30 minutes ahead of GMT (UTC+0). Neither zone observes daylight saving, so this difference stays the same all year.",
      sourceLiveTime: istLiveTime,
      estLiveTime: gmtLiveTime,
      targetLiveTime: gmtLiveTime,
      liveTimeSentence: `Right now it is ${istLiveTime} IST (${gmtLiveTime} GMT)`,
      liveLineHtml: `Right now it is <strong>${istLiveTime} IST</strong> (<strong>${gmtLiveTime} GMT</strong>)`,
      tableConversions: [
        { sourceTime: "12 AM IST", targetTime: "6:30 PM GMT (previous day)", estTime: "6:30 PM GMT (previous day)" },
        { sourceTime: "6 AM IST", targetTime: "12:30 AM GMT", estTime: "12:30 AM GMT" },
        { sourceTime: "9 AM IST", targetTime: "3:30 AM GMT", estTime: "3:30 AM GMT" },
        { sourceTime: "12 PM IST", targetTime: "6:30 AM GMT", estTime: "6:30 AM GMT" },
        { sourceTime: "5 PM IST", targetTime: "11:30 AM GMT", estTime: "11:30 AM GMT" },
        { sourceTime: "9 PM IST", targetTime: "3:30 PM GMT", estTime: "3:30 PM GMT" }
      ],
      tableCaption: "IST is always UTC+5:30 and GMT is always UTC+0 — neither observes daylight saving, so the 5.5-hour gap stays the same all year.",
      faqs: [
        {
          q: "What is the time difference between IST and GMT?",
          a: "IST is 5 hours 30 minutes ahead of GMT. When it is 12:00 PM in India, it is 6:30 AM GMT. The difference never changes, because neither IST nor GMT observes daylight saving time."
        },
        {
          q: "Is IST ahead of or behind GMT?",
          a: "IST is ahead of GMT by 5 hours 30 minutes. To convert IST to GMT, subtract 5 hours 30 minutes — early-morning IST times fall on the previous day in GMT."
        },
        {
          q: "Does India change its clocks for daylight saving?",
          a: "No. India stays on IST (UTC+5:30) all year, and GMT never changes either, so IST to GMT conversions are identical in every season."
        }
      ]
    };
  }

  if ((sourceCode === "EST" && targetCode === "IST") || sourceCode === "EST-TO-IST" || sourceCode === "EST_TO_IST") {
    let estLiveTime = "";
    let istLiveTime = "";
    try {
      estLiveTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/New_York"
      }).format(now);
    } catch (e) {
      estLiveTime = "--:--";
    }

    try {
      istLiveTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      }).format(now);
    } catch (e) {
      istLiveTime = "--:--";
    }

    return {
      zoneA: "EST",
      zoneB: "IST",
      zoneAName: "Eastern Standard Time",
      zoneBName: "India Standard Time",
      zoneBHeader: "IST Time",
      offsetA: -5,
      offsetAFormatted: "UTC-5",
      definitionSentence: "IST (India Standard Time, UTC+5:30) is 10 hours 30 minutes ahead of EST (Eastern Standard Time, UTC-5), so evening times in Eastern Time land on the next day in India.",
      sourceLiveTime: estLiveTime,
      estLiveTime,
      targetLiveTime: istLiveTime,
      liveTimeSentence: `Right now it is ${estLiveTime} EST (${istLiveTime} IST)`,
      liveLineHtml: `Right now it is <strong>${estLiveTime} EST</strong> (<strong>${istLiveTime} IST</strong>)`,
      tableConversions: [
        { sourceTime: "12 AM EST", targetTime: "10:30 AM IST", estTime: "10:30 AM IST" },
        { sourceTime: "6 AM EST", targetTime: "4:30 PM IST", estTime: "4:30 PM IST" },
        { sourceTime: "9 AM EST", targetTime: "7:30 PM IST", estTime: "7:30 PM IST" },
        { sourceTime: "12 PM EST", targetTime: "10:30 PM IST", estTime: "10:30 PM IST" },
        { sourceTime: "5 PM EST", targetTime: "3:30 AM IST (next day)", estTime: "3:30 AM IST (next day)" },
        { sourceTime: "9 PM EST", targetTime: "7:30 AM IST (next day)", estTime: "7:30 AM IST (next day)" }
      ],
      tableCaption: "Eastern Time is EST (UTC-5) in winter and EDT (UTC-4) in summer, so the gap to IST shifts between 10.5 and 9.5 hours. IST never changes.",
      faqs: [
        {
          q: "What is the time difference between EST and IST?",
          a: "IST is 10 hours 30 minutes ahead of EST (UTC-5). When Eastern Time is on daylight saving (EDT, UTC-4), the difference is 9 hours 30 minutes instead."
        },
        {
          q: "Is IST ahead of or behind EST?",
          a: "IST is ahead of EST — by 10.5 hours in winter and 9.5 hours during EDT. Morning and afternoon EST times land on the same day in India; evening EST times land in the early hours of the next day."
        },
        {
          q: "What is 9 AM EST in IST?",
          a: "9 AM EST is 7:30 PM IST on the same day. During daylight saving time, 9 AM EDT is 6:30 PM IST."
        }
      ]
    };
  }

  const meta = getZoneMeta(sourceCode);
  const estOffset = -5; // EST standard offset
  const delta = meta.offset - estOffset; // diff: zoneA - EST
  const diffFormatted = formatHoursDifference(delta);
  const offsetAFormatted = formatUtc(meta.offset);

  // 1. Definition Sentence
  let definitionSentence = "";
  if (delta > 0) {
    definitionSentence = `${meta.abbr} (${meta.name}, ${offsetAFormatted}) is ${diffFormatted} ahead of EST (Eastern Standard Time, UTC−5).`;
  } else if (delta < 0) {
    definitionSentence = `${meta.abbr} (${meta.name}, ${offsetAFormatted}) is ${diffFormatted} behind EST (Eastern Standard Time, UTC−5).`;
  } else {
    definitionSentence = `${meta.abbr} (${meta.name}, ${offsetAFormatted}) is at the same time as EST (Eastern Standard Time, UTC−5).`;
  }

  // 2. Live Time
  let sourceLiveTime = "";
  let estLiveTime = "";
  try {
    sourceLiveTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: meta.iana
    }).format(now);
  } catch (e) {
    sourceLiveTime = "--:--";
  }

  try {
    estLiveTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York"
    }).format(now);
  } catch (e) {
    estLiveTime = "--:--";
  }

  const liveTimeSentence = `Right now it is ${sourceLiveTime} ${meta.abbr} = ${estLiveTime} EST.`;

  // 3. Compact Static Table: 12 AM, 6 AM, 9 AM, 12 PM, 6 PM, 9 PM
  const sampleHours = [0, 6, 9, 12, 18, 21];
  const minutesDiff = Math.round((-5 - meta.offset) * 60);

  const tableConversions = sampleHours.map((h) => {
    // Source Time Format
    const sourcePeriod = h < 12 ? "AM" : "PM";
    const sourceDisplayHour = h % 12 || 12;
    const sourceTime = `${sourceDisplayHour}:00 ${sourcePeriod} ${meta.abbr}`;

    // Target EST Calculation (Standard Time)
    const totalEstMinutes = h * 60 + minutesDiff;
    let dayNote = "";
    let normalizedMinutes = totalEstMinutes;
    if (totalEstMinutes < 0) {
      dayNote = " (previous day)";
      normalizedMinutes = ((totalEstMinutes % 1440) + 1440) % 1440;
    } else if (totalEstMinutes >= 1440) {
      dayNote = " (next day)";
      normalizedMinutes = totalEstMinutes % 1440;
    }

    const estH = Math.floor(normalizedMinutes / 60);
    const estM = normalizedMinutes % 60;
    const estPeriod = estH < 12 ? "AM" : "PM";
    const estDisplayHour = estH % 12 || 12;
    const estDisplayMinutes = String(estM).padStart(2, "0");
    const estTime = `${estDisplayHour}:${estDisplayMinutes} ${estPeriod} EST${dayNote}`;

    return { sourceTime, targetTime: estTime, estTime };
  });

  const tableCaption = "Standard time conversions. Note: The difference changes by one hour during daylight saving.";

  // 4. 3 Visible FAQs
  const faq1Question = `What is the time difference between ${meta.abbr} and EST?`;
  let faq1Answer = "";
  if (meta.abbr === "EST") {
    faq1Answer = "Eastern Standard Time (EST, UTC−5) is the same time zone, so there is no time difference.";
  } else if (delta > 0) {
    faq1Answer = `The standard time difference between ${meta.name} (${meta.abbr}, ${offsetAFormatted}) and Eastern Standard Time (EST, UTC−5) is ${diffFormatted}. ${meta.abbr} is ${diffFormatted} ahead of EST.`;
  } else if (delta < 0) {
    faq1Answer = `The standard time difference between ${meta.name} (${meta.abbr}, ${offsetAFormatted}) and Eastern Standard Time (EST, UTC−5) is ${diffFormatted}. EST is ${diffFormatted} ahead of ${meta.abbr} (${meta.abbr} is ${diffFormatted} behind EST).`;
  } else {
    faq1Answer = `Both ${meta.abbr} (${meta.name}, ${offsetAFormatted}) and Eastern Standard Time (EST, UTC−5) operate at the same standard offset of UTC−5 with zero time difference.`;
  }

  const faq2Question = `Is ${meta.abbr} ahead of or behind EST?`;
  let faq2Answer = "";
  if (delta > 0) {
    faq2Answer = `${meta.abbr} is ahead of EST. Specifically, ${meta.abbr} is ${diffFormatted} ahead of Eastern Standard Time.`;
  } else if (delta < 0) {
    faq2Answer = `${meta.abbr} is behind EST. Specifically, ${meta.abbr} is ${diffFormatted} behind Eastern Standard Time.`;
  } else {
    faq2Answer = `${meta.abbr} is neither ahead nor behind EST; both share the same UTC offset of UTC−5 during standard time.`;
  }

  const faq3Question = `Does the ${meta.abbr} to EST difference change during daylight saving time?`;
  let faq3Answer = "";
  switch (meta.dstCategory) {
    case "us_same":
      faq3Answer = `No, the difference between ${meta.abbr} and Eastern Time remains ${diffFormatted} year-round because both regions observe Daylight Saving Time on the same schedule, transitioning between standard time and daylight saving time simultaneously.`;
      break;
    case "uk_eu":
      faq3Answer = `Yes, the difference changes by 1 hour for 1 to 3 weeks each spring and autumn because the United Kingdom and Europe transition into and out of daylight saving time on different dates than North America.`;
      break;
    case "southern":
      faq3Answer = `Yes, the time difference changes because the Southern Hemisphere observes Daylight Saving Time during the North American winter, causing clocks to move in opposite directions across seasons.`;
      break;
    case "canada_atlantic":
      faq3Answer = `No, the time difference between ${meta.abbr} and Eastern Time remains consistent year-round because Atlantic Canada and Eastern Time switch to Daylight Saving Time on identical dates.`;
      break;
    case "no_dst":
    default:
      faq3Answer = `Yes. Because Eastern Time shifts between EST (UTC−5) in winter and EDT (UTC−4) in summer while ${meta.abbr} does not observe Daylight Saving Time, the difference changes by 1 hour during Daylight Saving Time.`;
      break;
  }

  const faqs = [
    { q: faq1Question, a: faq1Answer },
    { q: faq2Question, a: faq2Answer },
    { q: faq3Question, a: faq3Answer }
  ];

  return {
    zoneA: meta.abbr,
    zoneB: "EST",
    zoneAName: meta.name,
    zoneBName: "Eastern Standard Time",
    zoneBHeader: "EST (Eastern Standard Time)",
    offsetA: meta.offset,
    offsetAFormatted,
    definitionSentence,
    sourceLiveTime,
    estLiveTime,
    targetLiveTime: estLiveTime,
    liveTimeSentence,
    tableConversions,
    tableCaption,
    faqs
  };
}
