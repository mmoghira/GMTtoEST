/**
 * Time Engine Utility
 * Provides timezone math, DST checking, meeting overlap detection, jet lag calculations, and date formatting.
 */

export interface CityTimeData {
  id: string;
  name: string;
  country: string;
  flag: string;
  timezone: string;
  offsetMinutes: number;
  offsetFormatted: string;
  currentTimeStr: string;
  currentDateStr: string;
  isDaytime: boolean;
  isDST: boolean;
}

export const POPULAR_CITIES: Array<{ id: string; name: string; country: string; flag: string; timezone: string }> = [
  { id: 'london', name: 'London', country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London' },
  { id: 'new-york', name: 'New York', country: 'United States', flag: '🇺🇸', timezone: 'America/New_York' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', timezone: 'Asia/Tokyo' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Sydney' },
  { id: 'paris', name: 'Paris', country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin' },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', timezone: 'Asia/Dubai' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', timezone: 'Asia/Singapore' },
  { id: 'hong-kong', name: 'Hong Kong', country: 'China', flag: '🇭🇰', timezone: 'Asia/Hong_Kong' },
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', flag: '🇺🇸', timezone: 'America/Los_Angeles' },
  { id: 'chicago', name: 'Chicago', country: 'United States', flag: '🇺🇸', timezone: 'America/Chicago' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', flag: '🇨🇦', timezone: 'America/Toronto' },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', flag: '🇨🇦', timezone: 'America/Vancouver' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata' },
  { id: 'delhi', name: 'Delhi', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata' },
  { id: 'karachi', name: 'Karachi', country: 'Pakistan', flag: '🇵🇰', timezone: 'Asia/Karachi' },
  { id: 'sao-paulo', name: 'São Paulo', country: 'Brazil', flag: '🇧🇷', timezone: 'America/Sao_Paulo' },
  { id: 'mexico-city', name: 'Mexico City', country: 'Mexico', flag: '🇲🇽', timezone: 'America/Mexico_City' },
  { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', flag: '🇿🇦', timezone: 'Africa/Johannesburg' },
  { id: 'auckland', name: 'Auckland', country: 'New Zealand', flag: '🇳🇿', timezone: 'Pacific/Auckland' },
  { id: 'seoul', name: 'Seoul', country: 'South Korea', flag: '🇰🇷', timezone: 'Asia/Seoul' },
  { id: 'beijing', name: 'Beijing', country: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai' },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', flag: '🇪🇬', timezone: 'Africa/Cairo' },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', flag: '🇹🇷', timezone: 'Europe/Istanbul' },
  { id: 'honolulu', name: 'Honolulu', country: 'United States', flag: '🇺🇸', timezone: 'Pacific/Honolulu' },
  { id: 'anchorage', name: 'Anchorage', country: 'United States', flag: '🇺🇸', timezone: 'America/Anchorage' }
];

export function getCityTime(city: { id: string; name: string; country: string; flag: string; timezone: string }, date = new Date()): CityTimeData {
  try {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: city.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: city.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const hourFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: city.timezone,
      hour: 'numeric',
      hour12: false
    });

    const hour24 = parseInt(hourFormatter.format(date), 10);
    const isDaytime = hour24 >= 6 && hour24 < 18;

    // Calculate offset
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: city.timezone }));
    const offsetMinutes = Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);

    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absMin = Math.abs(offsetMinutes);
    const hrs = Math.floor(absMin / 60);
    const mins = absMin % 60;
    const offsetFormatted = `UTC${sign}${hrs}${mins > 0 ? `:${mins}` : ''}`;

    // Simple DST check (summer vs winter offset comparison)
    const janDate = new Date(date.getFullYear(), 0, 1);
    const julDate = new Date(date.getFullYear(), 6, 1);
    const janOffset = Math.round((new Date(janDate.toLocaleString('en-US', { timeZone: city.timezone })).getTime() - janDate.getTime()) / 60000);
    const julOffset = Math.round((new Date(julDate.toLocaleString('en-US', { timeZone: city.timezone })).getTime() - julDate.getTime()) / 60000);
    const isDST = janOffset !== julOffset && offsetMinutes === Math.max(janOffset, julOffset);

    return {
      id: city.id,
      name: city.name,
      country: city.country,
      flag: city.flag,
      timezone: city.timezone,
      offsetMinutes,
      offsetFormatted,
      currentTimeStr: timeFormatter.format(date),
      currentDateStr: dateFormatter.format(date),
      isDaytime,
      isDST
    };
  } catch {
    return {
      id: city.id,
      name: city.name,
      country: city.country,
      flag: city.flag,
      timezone: city.timezone,
      offsetMinutes: 0,
      offsetFormatted: 'UTC+0',
      currentTimeStr: date.toLocaleTimeString(),
      currentDateStr: date.toLocaleDateString(),
      isDaytime: true,
      isDST: false
    };
  }
}

/**
 * Calculates meeting overlap status for an hour (0-23)
 * Returns: 'business' (9am-5pm), 'shoulder' (7am-9am or 5pm-9pm), 'night' (9pm-7am)
 */
export function getHourSlotCategory(hour24: number): 'business' | 'shoulder' | 'night' {
  if (hour24 >= 9 && hour24 < 17) return 'business';
  if ((hour24 >= 7 && hour24 < 9) || (hour24 >= 17 && hour24 < 21)) return 'shoulder';
  return 'night';
}

/**
 * Calculates Jet Lag Score and suggested adaptation schedule
 */
export function calculateJetLag(originTz: string, destTz: string, flightDurationHours = 8): {
  score: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Extreme';
  recoveryDays: number;
  direction: 'Eastbound (Phase Advance)' | 'Westbound (Phase Delay)' | 'Same Meridian';
  hoursDifference: number;
  lightAdvice: string;
} {
  const now = new Date();
  const originDate = new Date(now.toLocaleString('en-US', { timeZone: originTz }));
  const destDate = new Date(now.toLocaleString('en-US', { timeZone: destTz }));
  const offsetDiffMinutes = Math.round((destDate.getTime() - originDate.getTime()) / 60000);
  const hoursDiff = Math.abs(offsetDiffMinutes / 60);

  let direction: 'Eastbound (Phase Advance)' | 'Westbound (Phase Delay)' | 'Same Meridian' = 'Same Meridian';
  if (offsetDiffMinutes > 0) direction = 'Eastbound (Phase Advance)';
  else if (offsetDiffMinutes < 0) direction = 'Westbound (Phase Delay)';

  let score = Math.round((hoursDiff * 1.2) + (flightDurationHours * 0.4));
  if (direction === 'Eastbound (Phase Advance)') score += 2; // Eastward travel is harder
  score = Math.min(10, Math.max(1, score));

  let severity: 'Mild' | 'Moderate' | 'Severe' | 'Extreme' = 'Mild';
  let recoveryDays = Math.ceil(hoursDiff / 1.5);
  if (score >= 8) { severity = 'Extreme'; recoveryDays = Math.max(5, Math.ceil(hoursDiff)); }
  else if (score >= 6) { severity = 'Severe'; recoveryDays = Math.max(3, Math.ceil(hoursDiff / 1.2)); }
  else if (score >= 4) { severity = 'Moderate'; recoveryDays = Math.max(2, Math.ceil(hoursDiff / 1.5)); }

  let lightAdvice = 'Expose eyes to natural sunlight upon morning arrival at destination.';
  if (direction === 'Eastbound (Phase Advance)') {
    lightAdvice = 'Seek bright light in the destination morning (after temperature minimum) to advance your clock. Avoid evening light.';
  } else if (direction === 'Westbound (Phase Delay)') {
    lightAdvice = 'Seek bright light in the destination late afternoon/early evening to delay your clock. Avoid early morning bright light.';
  }

  return {
    score,
    severity,
    recoveryDays,
    direction,
    hoursDifference: hoursDiff,
    lightAdvice
  };
}
