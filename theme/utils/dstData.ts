export interface DSTTransition {
  region: string;
  regionCode: string;
  year: number;
  springForward: string;
  fallBack: string;
  springRule: string;
  fallRule: string;
  offsetStandard: string;
  offsetDaylight: string;
}

const rules = [
  { region: 'United States', code: 'US', offsetS: 'UTC-5 (EST)', offsetD: 'UTC-4 (EDT)', springType: '2nd_sun_mar', fallType: '1st_sun_nov' },
  { region: 'Canada', code: 'CA', offsetS: 'UTC-5 (EST)', offsetD: 'UTC-4 (EDT)', springType: '2nd_sun_mar', fallType: '1st_sun_nov' },
  { region: 'United Kingdom', code: 'GB', offsetS: 'UTC+0 (GMT)', offsetD: 'UTC+1 (BST)', springType: 'last_sun_mar', fallType: 'last_sun_oct' },
  { region: 'European Union', code: 'EU', offsetS: 'UTC+1 (CET)', offsetD: 'UTC+2 (CEST)', springType: 'last_sun_mar', fallType: 'last_sun_oct' },
  { region: 'Mexico', code: 'MX', offsetS: 'UTC-6', offsetD: 'UTC-5', springType: '1st_sun_apr', fallType: 'last_sun_oct' },
  { region: 'Australia (NSW)', code: 'AU', offsetS: 'UTC+10 (AEST)', offsetD: 'UTC+11 (AEDT)', springType: '1st_sun_oct', fallType: '1st_sun_apr' },
  { region: 'New Zealand', code: 'NZ', offsetS: 'UTC+12 (NZST)', offsetD: 'UTC+13 (NZDT)', springType: 'last_sun_sep', fallType: '1st_sun_apr' },
  { region: 'Brazil', code: 'BR', offsetS: 'UTC-3', offsetD: 'UTC-2', springType: 'none', fallType: 'none' },
  { region: 'Chile', code: 'CL', offsetS: 'UTC-4', offsetD: 'UTC-3', springType: '1st_sun_sep', fallType: '1st_sun_apr' },
  { region: 'Paraguay', code: 'PY', offsetS: 'UTC-4', offsetD: 'UTC-3', springType: '1st_sun_oct', fallType: '4th_sun_mar' },
  { region: 'Jordan', code: 'JO', offsetS: 'UTC+2', offsetD: 'UTC+3', springType: 'none', fallType: 'none' },
  { region: 'Lebanon', code: 'LB', offsetS: 'UTC+2', offsetD: 'UTC+3', springType: 'last_sun_mar', fallType: 'last_sun_oct' },
  { region: 'Israel', code: 'IL', offsetS: 'UTC+2', offsetD: 'UTC+3', springType: 'last_fri_mar', fallType: 'last_sun_oct' },
  { region: 'Egypt', code: 'EG', offsetS: 'UTC+2', offsetD: 'UTC+3', springType: 'last_fri_apr', fallType: 'last_thu_oct' },
  { region: 'Iran', code: 'IR', offsetS: 'UTC+3:30', offsetD: 'UTC+4:30', springType: 'none', fallType: 'none' },
  { region: 'Turkey', code: 'TR', offsetS: 'UTC+3', offsetD: 'UTC+3', springType: 'none', fallType: 'none' }
];

function getNthDay(year: number, month: number, dayOfWeek: number, n: number, fromEnd: boolean = false): Date {
  const d = new Date(year, month, 1);
  if (fromEnd) {
    d.setMonth(month + 1);
    d.setDate(0);
    while (d.getDay() !== dayOfWeek) {
      d.setDate(d.getDate() - 1);
    }
    return d;
  } else {
    while (d.getDay() !== dayOfWeek) {
      d.setDate(d.getDate() + 1);
    }
    d.setDate(d.getDate() + (n - 1) * 7);
    return d;
  }
}

const getDateStr = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function generateDstData(): DSTTransition[] {
  const years = Array.from({length: 11}, (_, i) => 2020 + i);
  const data: DSTTransition[] = [];
  
  years.forEach(year => {
    rules.forEach(rule => {
      let spring = null;
      let fall = null;
      
      if (rule.springType === '2nd_sun_mar') spring = getNthDay(year, 2, 0, 2);
      if (rule.springType === 'last_sun_mar') spring = getNthDay(year, 2, 0, 1, true);
      if (rule.springType === '1st_sun_apr') spring = getNthDay(year, 3, 0, 1);
      if (rule.springType === 'last_sun_sep') spring = getNthDay(year, 8, 0, 1, true);
      if (rule.springType === '1st_sun_oct') spring = getNthDay(year, 9, 0, 1);
      if (rule.springType === '1st_sun_sep') spring = getNthDay(year, 8, 0, 1);
      if (rule.springType === 'last_fri_mar') spring = getNthDay(year, 2, 5, 1, true);
      if (rule.springType === 'last_fri_apr') spring = getNthDay(year, 3, 5, 1, true);

      if (rule.fallType === '1st_sun_nov') fall = getNthDay(year, 10, 0, 1);
      if (rule.fallType === 'last_sun_oct') fall = getNthDay(year, 9, 0, 1, true);
      if (rule.fallType === '1st_sun_apr') fall = getNthDay(year, 3, 0, 1);
      if (rule.fallType === '4th_sun_mar') fall = getNthDay(year, 2, 0, 4);
      if (rule.fallType === 'last_thu_oct') fall = getNthDay(year, 9, 4, 1, true);

      if (rule.springType !== 'none' || rule.fallType !== 'none') {
        data.push({
          region: rule.region,
          regionCode: rule.code,
          year: year,
          springForward: spring ? getDateStr(spring) : 'None',
          fallBack: fall ? getDateStr(fall) : 'None',
          springRule: rule.springType.replace(/_/g, ' '),
          fallRule: rule.fallType.replace(/_/g, ' '),
          offsetStandard: rule.offsetS,
          offsetDaylight: rule.offsetD
        });
      }
    });
  });
  return data;
}

export const dstTransitions: DSTTransition[] = generateDstData();

export function getTransitionsByRegion(regionCode: string): DSTTransition[] {
  return dstTransitions.filter(t => t.regionCode === regionCode);
}

export function getNextTransition(regionCode: string): DSTTransition & { type: 'spring' | 'fall', daysUntil: number } | null {
  const transitions = getTransitionsByRegion(regionCode);
  const now = new Date();
  
  for (const t of transitions) {
    if (t.year < now.getFullYear()) continue;
    
    if (t.springForward !== 'None') {
      const springDate = new Date(t.springForward);
      if (springDate > now) {
        return { ...t, type: 'spring', daysUntil: Math.ceil((springDate.getTime() - now.getTime()) / (1000 * 3600 * 24)) };
      }
    }
    
    if (t.fallBack !== 'None') {
      const fallDate = new Date(t.fallBack);
      if (fallDate > now) {
        return { ...t, type: 'fall', daysUntil: Math.ceil((fallDate.getTime() - now.getTime()) / (1000 * 3600 * 24)) };
      }
    }
  }
  return null;
}

export function getRegions(): {code: string, name: string}[] {
  const map = new Map();
  for (const t of dstTransitions) {
    if (!map.has(t.regionCode)) map.set(t.regionCode, t.region);
  }
  return Array.from(map.entries()).map(([code, name]) => ({code, name}));
}
