/**
 * User Preferences & LocalStorage Persistence Manager
 * Allows saving favorite cities, recent converter pairs, and default timezones with 0 account required.
 */

export interface SavedCity {
  id: string;
  name: string;
  country: string;
  timezone: string;
  offsetStr: string;
  flag: string;
}

export interface RecentConversion {
  from: string;
  to: string;
  timestamp: number;
}

const FAVORITES_KEY = 'gmt_est_fav_cities';
const RECENTS_KEY = 'gmt_est_recent_conversions';
const DEFAULT_TZ_KEY = 'gmt_est_user_tz';

export const DEFAULT_CITIES: SavedCity[] = [
  { id: 'london', name: 'London', country: 'United Kingdom', timezone: 'Europe/London', offsetStr: 'UTC+1 / UTC+0', flag: '🇬🇧' },
  { id: 'new-york', name: 'New York', country: 'United States', timezone: 'America/New_York', offsetStr: 'UTC-4 / UTC-5', flag: '🇺🇸' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', offsetStr: 'UTC+9', flag: '🇯🇵' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', offsetStr: 'UTC+10 / UTC+11', flag: '🇦🇺' },
  { id: 'paris', name: 'Paris', country: 'France', timezone: 'Europe/Paris', offsetStr: 'UTC+2 / UTC+1', flag: '🇫🇷' },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', timezone: 'Asia/Dubai', offsetStr: 'UTC+4', flag: '🇦🇪' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', offsetStr: 'UTC+5:30', flag: '🇮🇳' },
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', offsetStr: 'UTC-7 / UTC-8', flag: '🇺🇸' },
];

export function getFavoriteCities(): SavedCity[] {
  if (typeof window === 'undefined') return DEFAULT_CITIES;
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return DEFAULT_CITIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CITIES;
  } catch {
    return DEFAULT_CITIES;
  }
}

export function saveFavoriteCity(city: SavedCity): void {
  if (typeof window === 'undefined') return;
  const current = getFavoriteCities();
  if (!current.some(c => c.id === city.id)) {
    const updated = [...current, city];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }
}

export function removeFavoriteCity(cityId: string): void {
  if (typeof window === 'undefined') return;
  const current = getFavoriteCities();
  const updated = current.filter(c => c.id !== cityId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function isFavoriteCity(cityId: string): boolean {
  return getFavoriteCities().some(c => c.id === cityId);
}

export function getRecentConversions(): RecentConversion[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentConversion(from: string, to: string): void {
  if (typeof window === 'undefined') return;
  const current = getRecentConversions().filter(c => !(c.from === from && c.to === to));
  const updated = [{ from, to, timestamp: Date.now() }, ...current].slice(0, 10);
  localStorage.setItem(RECENTS_KEY, JSON.stringify(updated));
}

export function getUserDefaultTimezone(): string {
  if (typeof window === 'undefined') return 'America/New_York';
  try {
    const saved = localStorage.getItem(DEFAULT_TZ_KEY);
    if (saved) return saved;
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
  } catch {
    return 'America/New_York';
  }
}

export function setUserDefaultTimezone(tz: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEFAULT_TZ_KEY, tz);
}
