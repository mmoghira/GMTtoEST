/**
 * Stock Market Hours Configuration & Calculation Utilities
 * 
 * Supports NYSE and Nasdaq regular equity trading hours, pre-market,
 * after-hours, and official 2026–2027 market holidays and early closes.
 * 
 * Timezone: America/New_York (Eastern Time - handles EST / EDT automatically)
 */

export interface MarketHoliday {
  date: string; // YYYY-MM-DD
  day: string;
  name: string;
  year: number;
}

export interface EarlyClose {
  date: string; // YYYY-MM-DD
  day: string;
  reason: string;
  closeTime: string; // "1:00 p.m. ET"
  year: number;
}

// ---------------------------------------------------------------------------
// 4.1 Authoritative Market Holidays — 2026
// ---------------------------------------------------------------------------
export const MARKET_HOLIDAYS_2026: MarketHoliday[] = [
  { date: "2026-01-01", day: "Thursday", name: "New Year's Day", year: 2026 },
  { date: "2026-01-19", day: "Monday", name: "Martin Luther King Jr. Day", year: 2026 },
  { date: "2026-02-16", day: "Monday", name: "Washington's Birthday / Presidents Day", year: 2026 },
  { date: "2026-04-03", day: "Friday", name: "Good Friday", year: 2026 },
  { date: "2026-05-25", day: "Monday", name: "Memorial Day", year: 2026 },
  { date: "2026-06-19", day: "Friday", name: "Juneteenth", year: 2026 },
  { date: "2026-07-03", day: "Friday", name: "Independence Day observed", year: 2026 },
  { date: "2026-09-07", day: "Monday", name: "Labor Day", year: 2026 },
  { date: "2026-11-26", day: "Thursday", name: "Thanksgiving Day", year: 2026 },
  { date: "2026-12-25", day: "Friday", name: "Christmas Day", year: 2026 },
];

// ---------------------------------------------------------------------------
// 4.2 Authoritative Early Closes — 2026 (Regular session closes at 1:00 p.m. ET)
// ---------------------------------------------------------------------------
export const EARLY_CLOSES_2026: EarlyClose[] = [
  { date: "2026-11-27", day: "Friday", reason: "Day after Thanksgiving", closeTime: "1:00 p.m. ET", year: 2026 },
  { date: "2026-12-24", day: "Thursday", reason: "Christmas Eve", closeTime: "1:00 p.m. ET", year: 2026 },
];

// ---------------------------------------------------------------------------
// 4.3 Authoritative Market Holidays — 2027
// ---------------------------------------------------------------------------
export const MARKET_HOLIDAYS_2027: MarketHoliday[] = [
  { date: "2027-01-01", day: "Friday", name: "New Year's Day", year: 2027 },
  { date: "2027-01-18", day: "Monday", name: "Martin Luther King Jr. Day", year: 2027 },
  { date: "2027-02-15", day: "Monday", name: "Washington's Birthday / Presidents Day", year: 2027 },
  { date: "2027-03-26", day: "Friday", name: "Good Friday", year: 2027 },
  { date: "2027-05-31", day: "Monday", name: "Memorial Day", year: 2027 },
  { date: "2027-06-18", day: "Friday", name: "Juneteenth observed", year: 2027 },
  { date: "2027-07-05", day: "Monday", name: "Independence Day observed", year: 2027 },
  { date: "2027-09-06", day: "Monday", name: "Labor Day", year: 2027 },
  { date: "2027-11-25", day: "Thursday", name: "Thanksgiving Day", year: 2027 },
  { date: "2027-12-24", day: "Friday", name: "Christmas Day observed", year: 2027 },
];

// ---------------------------------------------------------------------------
// 4.4 Authoritative Early Closes — 2027 (Regular session closes at 1:00 p.m. ET)
// NOTE: Only November 26, 2027 is explicitly authorized per prompt instructions.
// ---------------------------------------------------------------------------
export const EARLY_CLOSES_2027: EarlyClose[] = [
  { date: "2027-11-26", day: "Friday", reason: "Day after Thanksgiving", closeTime: "1:00 p.m. ET", year: 2027 },
];

// Unified sources of truth
export const ALL_MARKET_HOLIDAYS: MarketHoliday[] = [
  ...MARKET_HOLIDAYS_2026,
  ...MARKET_HOLIDAYS_2027
];

export const ALL_EARLY_CLOSES: EarlyClose[] = [
  ...EARLY_CLOSES_2026,
  ...EARLY_CLOSES_2027
];

export const HOLIDAY_MAP: Record<string, MarketHoliday> = Object.fromEntries(
  ALL_MARKET_HOLIDAYS.map((h) => [h.date, h])
);

export const EARLY_CLOSE_MAP: Record<string, EarlyClose> = Object.fromEntries(
  ALL_EARLY_CLOSES.map((ec) => [ec.date, ec])
);

// ---------------------------------------------------------------------------
// Status Label Types
// ---------------------------------------------------------------------------
export type MarketStatus =
  | "Open (regular session)"
  | "Pre-market"
  | "After-hours"
  | "Closed (weekend)"
  | "Closed (market holiday)"
  | "Closed (outside trading hours)"
  | "Closed (early close)"
  | "Check the NYSE calendar";

export interface MarketEvaluation {
  status: MarketStatus;
  explanation: string;
  nextTransition: string;
  isHoliday: boolean;
  holidayName?: string;
  isEarlyClose: boolean;
  earlyCloseReason?: string;
  isWeekend: boolean;
  sessionType: "pre" | "regular" | "after" | "closed" | "check";
}

/**
 * Extracts Eastern Time parts from a Date object using America/New_York.
 * Reliably accounts for EST and EDT transitions.
 */
export function getEasternTimeParts(date: Date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "short"
  });

  const parts = formatter.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }

  const year = parseInt(map.year, 10);
  const month = parseInt(map.month, 10);
  const day = parseInt(map.day, 10);
  let hour = parseInt(map.hour, 10);
  if (hour === 24) hour = 0;
  const minute = parseInt(map.minute, 10);
  const second = parseInt(map.second, 10);

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };
  const dayOfWeek = weekdayMap[map.weekday] ?? 0;
  const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const totalMinutes = hour * 60 + minute;

  // Determine timezone abbreviation (EST or EDT)
  const tzFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "short"
  });
  const tzParts = tzFormatter.formatToParts(date);
  const tzName = tzParts.find((p) => p.type === "timeZoneName")?.value || "ET";

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    dayOfWeek,
    weekdayStr: map.weekday,
    dateStr,
    totalMinutes,
    tzName
  };
}

/**
 * Evaluates stock market session status for a given calendar date and Eastern Time.
 * 
 * Rules applied in strict order:
 * 1. Explicit query for unlisted early close -> "Check the NYSE calendar"
 * 2. Market holidays take precedence -> "Closed (market holiday)"
 * 3. Weekends take precedence -> "Closed (weekend)"
 * 4. Eligible weekdays:
 *    - 00:00 - 03:59: "Closed (outside trading hours)"
 *    - 04:00 - 09:29: "Pre-market"
 *    - 09:30 - regular close: "Open (regular session)" (closes at 13:00 on listed early closes)
 *    - On early close dates between 13:00 and 15:59: "Closed (early close)"
 *    - 16:00 - 19:59: "After-hours"
 *    - 20:00 - 23:59: "Closed (outside trading hours)"
 */
export function evaluateMarketStatus(
  dateStr: string,
  hour: number,
  minute: number,
  second: number,
  dayOfWeek: number,
  options?: { queryUnlistedEarlyClose?: boolean }
): MarketEvaluation {
  // Edge Case: Query unlisted early close
  if (options?.queryUnlistedEarlyClose) {
    return {
      status: "Check the NYSE calendar",
      explanation:
        "This tool encodes the authoritative 2026–2027 holiday and early-close dates listed on this page. For confirmation of potential unlisted early closes or exchange calendar amendments, check the official NYSE calendar.",
      nextTransition: "Verify exchange calendar updates directly on nyse.com.",
      isHoliday: false,
      isEarlyClose: false,
      isWeekend: false,
      sessionType: "check"
    };
  }

  // Precedence Rule 1: Market Holidays
  const holiday = HOLIDAY_MAP[dateStr];
  if (holiday) {
    return {
      status: "Closed (market holiday)",
      explanation: `Today is ${holiday.name}, an official NYSE and Nasdaq market holiday. Regular, pre-market, and after-hours trading are closed for the full day.`,
      nextTransition: "The regular session will reopen on the next standard trading day at 9:30 a.m. ET.",
      isHoliday: true,
      holidayName: holiday.name,
      isEarlyClose: false,
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      sessionType: "closed"
    };
  }

  // Precedence Rule 2: Weekends (Saturday = 6, Sunday = 0)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    const dayName = dayOfWeek === 0 ? "Sunday" : "Saturday";
    return {
      status: "Closed (weekend)",
      explanation: `The US stock market is closed on weekends (${dayName}). Regular equity trading resumes on Monday at 9:30 a.m. ET (subject to market holidays).`,
      nextTransition: "Pre-market opens at 4:00 a.m. ET and regular trading opens at 9:30 a.m. ET on Monday.",
      isHoliday: false,
      isEarlyClose: false,
      isWeekend: true,
      sessionType: "closed"
    };
  }

  // Eligible Weekday: Check Early Close
  const earlyClose = EARLY_CLOSE_MAP[dateStr];
  const isEarlyClose = !!earlyClose;
  const totalMinutes = hour * 60 + minute;

  // Intraday Session Windows
  // 1. Outside trading hours before 4:00 a.m. (00:00 - 03:59)
  if (totalMinutes < 240) {
    return {
      status: "Closed (outside trading hours)",
      explanation: isEarlyClose
        ? `Outside all defined trading windows. Regular trading will close early today at 1:00 p.m. ET for ${earlyClose.reason}.`
        : "Outside all defined trading windows. Pre-market trading opens at 4:00 a.m. ET.",
      nextTransition: isEarlyClose
        ? "Pre-market opens at 4:00 a.m. ET (note early regular close at 1:00 p.m. ET today)."
        : "Pre-market opens at 4:00 a.m. ET (regular session opens at 9:30 a.m. ET).",
      isHoliday: false,
      isEarlyClose,
      earlyCloseReason: earlyClose?.reason,
      isWeekend: false,
      sessionType: "closed"
    };
  }

  // 2. Pre-market (4:00 a.m. to 9:29 a.m. -> 240 to 569 min)
  if (totalMinutes < 570) {
    return {
      status: "Pre-market",
      explanation: isEarlyClose
        ? `Pre-market trading is active (4:00 a.m. to 9:30 a.m. ET). Note: Regular session will close early at 1:00 p.m. ET today for ${earlyClose.reason}.`
        : "Pre-market trading is active (4:00 a.m. to 9:30 a.m. ET). Extended-hours access and order execution vary by broker.",
      nextTransition: isEarlyClose
        ? "Regular session opens at 9:30 a.m. ET (closes early at 1:00 p.m. ET today)."
        : "Regular session opens at 9:30 a.m. ET.",
      isHoliday: false,
      isEarlyClose,
      earlyCloseReason: earlyClose?.reason,
      isWeekend: false,
      sessionType: "pre"
    };
  }

  // 3. Regular Session
  // On early-close date: 9:30 a.m. to 1:00 p.m. (570 to 779 min)
  // On ordinary weekday: 9:30 a.m. to 4:00 p.m. (570 to 959 min)
  const regularCloseMinutes = isEarlyClose ? 780 : 960; // 13:00 (780 min) or 16:00 (960 min)

  if (totalMinutes < regularCloseMinutes) {
    return {
      status: "Open (regular session)",
      explanation: isEarlyClose
        ? `Regular equity trading is currently open on NYSE and Nasdaq. Today is an early-close session (${earlyClose.reason}), closing at 1:00 p.m. ET.`
        : "Regular equity trading is currently open on NYSE and Nasdaq (standard hours 9:30 a.m. to 4:00 p.m. ET).",
      nextTransition: isEarlyClose
        ? "Regular session closes early at 1:00 p.m. ET today."
        : "Regular session closes at 4:00 p.m. ET.",
      isHoliday: false,
      isEarlyClose,
      earlyCloseReason: earlyClose?.reason,
      isWeekend: false,
      sessionType: "regular"
    };
  }

  // 4. Closed (early close): On listed early-close dates between 1:00 p.m. and 4:00 p.m. (780 to 959 min)
  if (isEarlyClose && totalMinutes < 960) {
    return {
      status: "Closed (early close)",
      explanation: `The regular equity session closed early at 1:00 p.m. ET for ${earlyClose.reason}.`,
      nextTransition: "After-hours session begins at 4:00 p.m. ET under supplied rules.",
      isHoliday: false,
      isEarlyClose: true,
      earlyCloseReason: earlyClose.reason,
      isWeekend: false,
      sessionType: "closed"
    };
  }

  // 5. After-hours: 4:00 p.m. to 8:00 p.m. (960 to 1199 min)
  if (totalMinutes < 1200) {
    return {
      status: "After-hours",
      explanation:
        "After-hours trading session is active (4:00 p.m. to 8:00 p.m. ET). Extended-hours liquidity and spreads vary significantly by broker.",
      nextTransition: "After-hours session closes at 8:00 p.m. ET.",
      isHoliday: false,
      isEarlyClose,
      earlyCloseReason: earlyClose?.reason,
      isWeekend: false,
      sessionType: "after"
    };
  }

  // 6. Outside trading hours after 8:00 p.m. (1200 to 1439 min)
  return {
    status: "Closed (outside trading hours)",
    explanation:
      "Outside all defined trading windows. Extended-hours trading closed at 8:00 p.m. ET.",
    nextTransition: "Pre-market opens at 4:00 a.m. ET on the next eligible trading day.",
    isHoliday: false,
    isEarlyClose,
    earlyCloseReason: earlyClose?.reason,
    isWeekend: false,
    sessionType: "closed"
  };
}

/**
 * Format date display string, e.g. "Friday, November 27, 2026"
 */
export function formatLongDate(year: number, month: number, day: number, dayOfWeek: number) {
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const DAYS = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  return `${DAYS[dayOfWeek]}, ${MONTHS[month - 1]} ${day}, ${year}`;
}

/**
 * Format 12-hour time display string, e.g. "09:30:00 AM"
 */
export function format12HourTime(hour: number, minute: number, second: number) {
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? "AM" : "PM";
  const hStr = String(h12).padStart(2, "0");
  const mStr = String(minute).padStart(2, "0");
  const sStr = String(second).padStart(2, "0");
  return `${hStr}:${mStr}:${sStr} ${ampm}`;
}
