import {
  es,
  formatSpanishDateTime,
  formatSpanishDate,
  formatSpanishTime,
  getDayRelation,
  getActiveTimezoneAbbreviation
} from "../theme/i18n/formatters.ts";

function parseLocalToUtc(dateTimeStr, timeZone) {
  const [d, t] = dateTimeStr.split(" ");
  const [year, month, day] = d.split("-").map(Number);
  const [hour, minute] = t.split(":").map(Number);
  const base = Date.UTC(year, month - 1, day, hour, minute);

  function getOffset(utcDate, tz) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hourCycle: "h23"
    });
    const parts = {};
    formatter.formatToParts(utcDate).forEach(p => { parts[p.type] = p.value; });
    const asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
    return Math.round((asUTC - utcDate.getTime()) / 60000);
  }

  let guess = base - getOffset(new Date(base), timeZone) * 60000;
  for (let i = 0; i < 4; i++) {
    guess = base - getOffset(new Date(guess), timeZone) * 60000;
  }
  return new Date(guess);
}

function getOffsetMinutes(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hourCycle: "h23"
  });
  const parts = {};
  formatter.formatToParts(date).forEach(p => { parts[p.type] = p.value; });
  const asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return Math.round((asUTC - date.getTime()) / 60000);
}

console.log("=== RUNNING REAL-DATE TIMEZONE VERIFICATION TESTS ===");

const testCases = [
  {
    name: "AEST -> EST test 1: standard Australian time and US daylight time",
    sourceTz: "Australia/Sydney",
    sourceTime: "2026-07-15 12:00",
    targetTz: "America/New_York",
    expectedSourceAbbr: "AEST",
    expectedTargetAbbr: "EDT",
    expectedTargetDateTime: "2026-07-14 22:00",
    expectedDiffHours: 14,
    expectedDiffLabel: "Diferencia de 14 horas — EDT",
    expectedDayRelation: "previousDay",
    expectedDayRelationLabel: "día anterior"
  },
  {
    name: "AEST/AEDT -> EST test 2: Australian daylight time and US standard time",
    sourceTz: "Australia/Sydney",
    sourceTime: "2026-01-15 12:00",
    targetTz: "America/New_York",
    expectedSourceAbbr: "AEDT",
    expectedTargetAbbr: "EST",
    expectedTargetDateTime: "2026-01-14 20:00",
    expectedDiffHours: 16,
    expectedDiffLabel: "Diferencia de 16 horas — EST",
    expectedDayRelation: "previousDay",
    expectedDayRelationLabel: "día anterior"
  },
  {
    name: "MST -> EST test 1: Denver winter",
    sourceTz: "America/Denver",
    sourceTime: "2026-01-15 12:00",
    targetTz: "America/New_York",
    expectedSourceAbbr: "MST",
    expectedTargetAbbr: "EST",
    expectedTargetDateTime: "2026-01-15 14:00",
    expectedDiffHours: 2,
    expectedDiffLabel: "Diferencia de 2 horas — EST",
    expectedDayRelation: "sameDay",
    expectedDayRelationLabel: "mismo día"
  },
  {
    name: "MST -> EST test 2: Denver summer",
    sourceTz: "America/Denver",
    sourceTime: "2026-07-15 12:00",
    targetTz: "America/New_York",
    expectedSourceAbbr: "MDT",
    expectedTargetAbbr: "EDT",
    expectedTargetDateTime: "2026-07-15 14:00",
    expectedDiffHours: 2,
    expectedDiffLabel: "Diferencia de 2 horas — EDT",
    expectedDayRelation: "sameDay",
    expectedDayRelationLabel: "mismo día"
  },
  {
    name: "MST -> EST test 3: Phoenix summer exception",
    sourceTz: "America/Phoenix",
    sourceTime: "2026-07-15 12:00",
    targetTz: "America/New_York",
    expectedSourceAbbr: "MST",
    expectedTargetAbbr: "EDT",
    expectedTargetDateTime: "2026-07-15 15:00",
    expectedDiffHours: 3,
    expectedDiffLabel: "Diferencia de 3 horas — EDT",
    expectedDayRelation: "sameDay",
    expectedDayRelationLabel: "mismo día"
  }
];

let allPassed = true;

for (const tc of testCases) {
  console.log(`\n--- [TEST] ${tc.name} ---`);
  const date = parseLocalToUtc(tc.sourceTime, tc.sourceTz);
  
  const sourceAbbr = getActiveTimezoneAbbreviation(date, tc.sourceTz);
  const targetAbbr = getActiveTimezoneAbbreviation(date, tc.targetTz);
  const diffHours = Math.abs((getOffsetMinutes(date, tc.targetTz) - getOffsetMinutes(date, tc.sourceTz)) / 60);
  const diffLabel = es.converter.difference(diffHours, targetAbbr);
  const dayRelation = getDayRelation(date, date, tc.sourceTz, tc.targetTz);
  const dayRelationText = es.converter[dayRelation];

  // Target date/time formatting
  const targetFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: tc.targetTz,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false
  });
  const targetParts = {};
  targetFormatter.formatToParts(date).forEach(p => { targetParts[p.type] = p.value; });
  const actualTargetDateTime = `${targetParts.year}-${targetParts.month}-${targetParts.day} ${targetParts.hour}:${targetParts.minute}`;

  console.log(`  Source Abbr: ${sourceAbbr} (expected: ${tc.expectedSourceAbbr})`);
  console.log(`  Target Abbr: ${targetAbbr} (expected: ${tc.expectedTargetAbbr})`);
  console.log(`  Target Date/Time: ${actualTargetDateTime} (expected: ${tc.expectedTargetDateTime})`);
  console.log(`  Diff Label: "${diffLabel}" (expected: "${tc.expectedDiffLabel}")`);
  console.log(`  Day Note: "${dayRelationText}" (expected: "${tc.expectedDayRelationLabel}")`);

  const passed = (
    sourceAbbr === tc.expectedSourceAbbr &&
    targetAbbr === tc.expectedTargetAbbr &&
    actualTargetDateTime === tc.expectedTargetDateTime &&
    diffHours === tc.expectedDiffHours &&
    diffLabel === tc.expectedDiffLabel &&
    dayRelation === tc.expectedDayRelation &&
    dayRelationText === tc.expectedDayRelationLabel
  );

  if (passed) {
    console.log(`  => PASS`);
  } else {
    console.error(`  => FAIL`);
    allPassed = false;
  }
}

if (!allPassed) {
  process.exit(1);
}
console.log("\n>>> ALL 5 REAL-DATE VERIFICATION TESTS PASSED! <<<");
