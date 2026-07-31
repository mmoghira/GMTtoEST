export const STORAGE_KEY = 'gmt2est_preferences';

export interface UserPreferences {
  favoriteCities: string[];
  savedConversions: { from: string; to: string }[];
  meetingCities: string[];
  homeTimezone: string | null;
  use24h: boolean;
}

const defaultPreferences: UserPreferences = {
  favoriteCities: [],
  savedConversions: [],
  meetingCities: [],
  homeTimezone: null,
  use24h: false,
};

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

export function getPreferences(): UserPreferences {
  if (!isLocalStorageAvailable()) return { ...defaultPreferences };
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? { ...defaultPreferences, ...JSON.parse(data) } : { ...defaultPreferences };
  } catch (e) {
    console.error('Failed to get preferences', e);
    return { ...defaultPreferences };
  }
}

export function savePreferences(prefs: Partial<UserPreferences>): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const current = getPreferences();
    const updated = { ...current, ...prefs };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save preferences', e);
  }
}

export function addFavoriteCity(timezone: string): void {
  const prefs = getPreferences();
  if (!prefs.favoriteCities.includes(timezone)) {
    savePreferences({ favoriteCities: [...prefs.favoriteCities, timezone] });
  }
}

export function removeFavoriteCity(timezone: string): void {
  const prefs = getPreferences();
  savePreferences({
    favoriteCities: prefs.favoriteCities.filter(tz => tz !== timezone)
  });
}

export function isFavoriteCity(timezone: string): boolean {
  return getPreferences().favoriteCities.includes(timezone);
}

export function toggleFavoriteCity(timezone: string): boolean {
  const isFav = isFavoriteCity(timezone);
  if (isFav) {
    removeFavoriteCity(timezone);
    return false;
  } else {
    addFavoriteCity(timezone);
    return true;
  }
}

export function addSavedConversion(from: string, to: string): void {
  const prefs = getPreferences();
  const exists = prefs.savedConversions.some(c => c.from === from && c.to === to);
  if (!exists) {
    savePreferences({
      savedConversions: [...prefs.savedConversions, { from, to }]
    });
  }
}

export function getSavedConversions(): { from: string; to: string }[] {
  return getPreferences().savedConversions;
}

export function setMeetingCities(timezones: string[]): void {
  savePreferences({ meetingCities: timezones });
}

export function getMeetingCities(): string[] {
  return getPreferences().meetingCities;
}

export function setHomeTimezone(timezone: string): void {
  savePreferences({ homeTimezone: timezone });
}

export function getHomeTimezone(): string | null {
  return getPreferences().homeTimezone;
}

export function clearPreferences(): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear preferences', e);
  }
}
