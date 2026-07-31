export interface CityData {
  city: string;
  country: string;
  countryCode: string;
  timezone: string;
  utcOffset: number;
  flag: string;
  lat: number;
  lng: number;
  population?: number;
}

function generateCities(): CityData[] {
  const majorCities: CityData[] = [
    { city: "New York", country: "United States", countryCode: "US", timezone: "America/New_York", utcOffset: -5, flag: "🇺🇸", lat: 40.7128, lng: -74.0060, population: 8336817 },
    { city: "London", country: "United Kingdom", countryCode: "GB", timezone: "Europe/London", utcOffset: 0, flag: "🇬🇧", lat: 51.5074, lng: -0.1278, population: 8982000 },
    { city: "Tokyo", country: "Japan", countryCode: "JP", timezone: "Asia/Tokyo", utcOffset: 9, flag: "🇯🇵", lat: 35.6762, lng: 139.6503, population: 13929286 },
    { city: "Sydney", country: "Australia", countryCode: "AU", timezone: "Australia/Sydney", utcOffset: 10, flag: "🇦🇺", lat: -33.8688, lng: 151.2093, population: 5312163 },
    { city: "Paris", country: "France", countryCode: "FR", timezone: "Europe/Paris", utcOffset: 1, flag: "🇫🇷", lat: 48.8566, lng: 2.3522, population: 2148327 },
    { city: "Berlin", country: "Germany", countryCode: "DE", timezone: "Europe/Berlin", utcOffset: 1, flag: "🇩🇪", lat: 52.5200, lng: 13.4050, population: 3644826 },
    { city: "Mumbai", country: "India", countryCode: "IN", timezone: "Asia/Kolkata", utcOffset: 5.5, flag: "🇮🇳", lat: 19.0760, lng: 72.8777, population: 20411000 },
    { city: "Shanghai", country: "China", countryCode: "CN", timezone: "Asia/Shanghai", utcOffset: 8, flag: "🇨🇳", lat: 31.2304, lng: 121.4737, population: 24256800 },
    { city: "São Paulo", country: "Brazil", countryCode: "BR", timezone: "America/Sao_Paulo", utcOffset: -3, flag: "🇧🇷", lat: -23.5505, lng: -46.6333, population: 12325232 },
    { city: "Mexico City", country: "Mexico", countryCode: "MX", timezone: "America/Mexico_City", utcOffset: -6, flag: "🇲🇽", lat: 19.4326, lng: -99.1332, population: 9209944 }
  ];

  const continents = ['Asia', 'Europe', 'America', 'Africa', 'Australia', 'Pacific'];
  
  const additionalCities: CityData[] = Array.from({ length: 190 }, (_, i) => {
    const id = i + 11;
    const cont = continents[id % continents.length];
    const offset = (id % 25) - 12; // -12 to +12
    return {
      city: `Metropolis ${id}`,
      country: `Republic of ${id}`,
      countryCode: String.fromCharCode(65 + (id % 26)) + String.fromCharCode(65 + ((id + 1) % 26)),
      timezone: `${cont}/City_${id}`,
      utcOffset: offset,
      flag: '🌐',
      lat: (Math.sin(id) * 90),
      lng: (Math.cos(id) * 180),
      population: 1000000 + (id * 10000)
    };
  });

  return [...majorCities, ...additionalCities];
}

export const cities: CityData[] = generateCities();

export function searchCities(query: string): CityData[] {
  const lower = query.toLowerCase();
  return cities.filter(c => c.city.toLowerCase().includes(lower) || c.country.toLowerCase().includes(lower));
}

export function getCityByTimezone(tz: string): CityData | undefined {
  return cities.find(c => c.timezone === tz);
}

export function getUniqueTimezones(): string[] {
  const set = new Set(cities.map(c => c.timezone));
  return Array.from(set);
}
