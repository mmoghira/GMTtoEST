export const es = {
  converter: {
    fromTo: (from: string, to: string) => `De ${from} a ${to}`,
    reverseFromTo: (from: string, to: string) => `De ${from} a ${to}`,
    inputLabel: (zone: string) => `Hora ${zone}`,
    currentTime: 'Usar la hora actual',
    twentyFourHour: 'Formato 24 h',
    copy: 'Copiar',
    copySuccess: 'Resultado copiado al portapapeles',
    copyError: 'No se pudo copiar el resultado',
    emptyResult: 'Introduce una fecha y hora para ver la conversión.',
    compatibleWithDst: 'Compatible con el horario de verano',
    difference: (hours: number, abbreviation: string) =>
      `Diferencia de ${hours} ${hours === 1 ? 'hora' : 'horas'} — ${abbreviation}`,
    differenceExplanation: (
      abbreviation: string,
      hours: number,
      sourceName: string,
      targetName: string
    ) =>
      `${abbreviation} está ${hours} ${hours === 1 ? 'hora' : 'horas'} por detrás de ${sourceName} en esta fecha. Los cambios de horario de verano pueden crear horas omitidas o repetidas, por lo que es importante realizar una conversión basada en la fecha.`,
    previousDay: 'día anterior',
    sameDay: 'mismo día',
    nextDay: 'día siguiente',
    loading: 'Calculando…',
    invalidDate: 'Introduce una fecha y hora válidas.'
  }
} as const;

export function formatSpanishDateTime(
  date: Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    timeZone,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    ...options,
  });

  return formatter.format(date).replace(',', '');
}

export function formatSpanishDate(
  date: Date,
  timeZone: string
): string {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatSpanishTime(
  date: Date,
  timeZone: string,
  use24Hour = true
): string {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24Hour,
  }).format(date);
}

export function getDayRelation(
  sourceDate: Date,
  targetDate: Date,
  sourceTimeZone: string,
  targetTimeZone: string
): 'previousDay' | 'sameDay' | 'nextDay' {
  const sourceDay = new Intl.DateTimeFormat('en-CA', {
    timeZone: sourceTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(sourceDate);

  const targetDay = new Intl.DateTimeFormat('en-CA', {
    timeZone: targetTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(targetDate);

  if (targetDay < sourceDay) return 'previousDay';
  if (targetDay > sourceDay) return 'nextDay';
  return 'sameDay';
}

export function getActiveTimezoneAbbreviation(
  date: Date,
  timeZone: string,
  standardCode?: string,
  daylightCode?: string
): string {
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' });
  const parts = formatter.formatToParts(date);
  const tzName = parts.find((p) => p.type === 'timeZoneName')?.value || '';

  if (timeZone === 'Australia/Sydney' || timeZone === 'Australia/Melbourne' || timeZone === 'Australia/Brisbane') {
    const isDst = tzName.includes('AEDT') || tzName.includes('Daylight') || tzName.includes('+11');
    return isDst ? (daylightCode || 'AEDT') : (standardCode || 'AEST');
  }
  if (timeZone === 'America/Denver') {
    const isDst = tzName.includes('MDT') || tzName.includes('Daylight') || tzName.includes('-6');
    return isDst ? (daylightCode || 'MDT') : (standardCode || 'MST');
  }
  if (timeZone === 'America/Phoenix') {
    return standardCode || 'MST';
  }
  if (timeZone === 'America/New_York') {
    const isDst = tzName.includes('EDT') || tzName.includes('Daylight') || tzName.includes('-4');
    return isDst ? (daylightCode || 'EDT') : (standardCode || 'EST');
  }
  if (timeZone === 'UTC' || timeZone === 'Etc/UTC') {
    return 'GMT';
  }

  if (tzName && !tzName.startsWith('GMT') && !tzName.startsWith('UTC')) {
    return tzName;
  }
  return standardCode || tzName || 'UTC';
}
