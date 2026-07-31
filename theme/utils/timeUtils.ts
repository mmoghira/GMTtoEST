// Client-side time utility functions

export function getTimeInZone(timezone: string): Date {
  const date = new Date();
  const str = date.toLocaleString('en-US', { timeZone: timezone });
  return new Date(str);
}

export function getUTCOffsetString(timezone: string, date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'longOffset'
  }).formatToParts(date);
  const offsetPart = parts.find(p => p.type === 'timeZoneName');
  if (!offsetPart || offsetPart.value === 'GMT') return '+00:00';
  return offsetPart.value.replace('GMT', '');
}

export function getUTCOffsetHours(timezone: string, date: Date = new Date()): number {
  const offsetStr = getUTCOffsetString(timezone, date);
  const sign = offsetStr.startsWith('-') ? -1 : 1;
  const match = offsetStr.match(/[\+\-]?(\d+):(\d+)/);
  if (!match) return 0;
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  return sign * (hours + minutes / 60);
}

export function isDST(timezone: string, date: Date = new Date()): boolean {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  const offsetJan = getUTCOffsetHours(timezone, jan);
  const offsetJul = getUTCOffsetHours(timezone, jul);
  const currentOffset = getUTCOffsetHours(timezone, date);
  
  if (offsetJan === offsetJul) return false;
  
  // Northern hemisphere
  if (offsetJul > offsetJan) {
    return currentOffset === offsetJul;
  }
  // Southern hemisphere
  return currentOffset === offsetJan;
}

export function getDayNightStatus(timezone: string, date: Date = new Date()): 'day' | 'night' | 'twilight' {
  const tzTime = getTimeInZone(timezone);
  // Re-apply to arbitrary day to check hours
  tzTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  tzTime.setHours(new Date(date.toLocaleString('en-US', { timeZone: timezone })).getHours());
  
  const hour = tzTime.getHours();
  
  if (hour >= 7 && hour < 18) return 'day';
  if ((hour >= 5 && hour < 7) || (hour >= 18 && hour < 20)) return 'twilight';
  return 'night';
}

export function calculateTimeDifference(tz1: string, tz2: string, date: Date = new Date()): number {
  return getUTCOffsetHours(tz1, date) - getUTCOffsetHours(tz2, date);
}

export function getOverlappingHours(
  timezones: string[],
  workStart: number = 9,
  workEnd: number = 17
): { hour: number; overlap: boolean }[] {
  const overlapHours = [];
  const now = new Date();
  
  for (let hour = 0; hour < 24; hour++) {
    const isOverlap = timezones.every(tz => {
      // Get what hour it is in each timezone when UTC is 'hour'
      // Simplification: We assume UTC base for iteration
      const offset = getUTCOffsetHours(tz, now);
      let localHour = (hour + offset) % 24;
      if (localHour < 0) localHour += 24;
      return localHour >= workStart && localHour < workEnd;
    });
    overlapHours.push({ hour, overlap: isOverlap });
  }
  return overlapHours;
}

export function findBestMeetingWindows(
  timezones: string[],
  workStart: number = 9,
  workEnd: number = 17
): { utcHour: number; localTimes: { timezone: string; hour: number }[] }[] {
  const overlapHours = getOverlappingHours(timezones, workStart, workEnd);
  const now = new Date();
  
  return overlapHours
    .filter(h => h.overlap)
    .map(h => {
      const localTimes = timezones.map(tz => {
        const offset = getUTCOffsetHours(tz, now);
        let localHour = (h.hour + offset) % 24;
        if (localHour < 0) localHour += 24;
        return { timezone: tz, hour: localHour };
      });
      return { utcHour: h.hour, localTimes };
    });
}

export function formatUnixTimestamp(timestamp: number, timezone?: string, use24h: boolean = false): string {
  const date = new Date(timestamp * 1000);
  return formatTime(date, timezone || Intl.DateTimeFormat().resolvedOptions().timeZone, use24h) + ' ' + formatDate(date, timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);
}

export function parseToUnixTimestamp(dateStr: string): number {
  return Math.floor(new Date(dateStr).getTime() / 1000);
}

export function toISO8601(date: Date, timezone?: string): string {
  if (!timezone) return date.toISOString();
  
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);
  
  const p: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== 'literal') {
      p[part.type] = part.value;
    }
  }
  
  const offset = getUTCOffsetString(timezone, date);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${offset === '+00:00' ? 'Z' : offset}`;
}

export function estimateJetLag(hoursDifference: number, direction: 'east' | 'west'): { severity: number; adjustmentDays: number; tips: string[] } {
  const absDiff = Math.abs(hoursDifference);
  let severity = Math.min(10, Math.round((absDiff / 12) * 10));
  if (direction === 'east') severity = Math.min(10, severity + 2); // Traveling east is generally harder
  
  const adjustmentDays = Math.max(1, Math.round(absDiff / 1.5));
  
  const tips = [];
  if (direction === 'east') {
    tips.push('Try to go to bed earlier a few days before your trip.');
    tips.push('Seek morning light at your destination.');
    tips.push('Avoid caffeine and alcohol before bedtime.');
  } else {
    tips.push('Go to bed later a few days before your trip.');
    tips.push('Seek evening light at your destination.');
  }
  
  return { severity, adjustmentDays, tips };
}

export function formatTime(date: Date, timezone: string, use24h: boolean = false): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24h
  }).format(date);
}

export function formatDate(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function generateICS(event: { title: string; start: Date; end?: Date; timezone?: string; description?: string }): string {
  const formatDateToICS = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const startStr = formatDateToICS(event.start);
  const end = event.end || new Date(event.start.getTime() + 60 * 60 * 1000); // 1 hour default
  const endStr = formatDateToICS(end);
  
  const now = formatDateToICS(new Date());
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GMTtoEST//Time Intelligence Platform//EN',
    'BEGIN:VEVENT',
    `UID:${now}-${Math.random().toString(36).substring(2, 11)}@gmttoest.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${event.title}`,
    ...(event.description ? [`DESCRIPTION:${event.description}`] : []),
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}
