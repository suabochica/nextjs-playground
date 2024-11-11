interface DateTimeFormatOptions {
  year: 'numeric';
  month: 'numeric';
  day: 'numeric';
  hour: 'numeric';
  minute: 'numeric';
  second: 'numeric';
}

const DEFAULT_LANGUAGE = 'es-ES';
const isDateTimeFormatSupported = typeof Intl !== 'undefined' && Intl.DateTimeFormat;

export function formatDate(timestamp: number, { language = DEFAULT_LANGUAGE} = {}): string {
  const date = new Date(timestamp);

  if (!isDateTimeFormatSupported) {
    const options = {
      weekday: 'short' as const,
      year: 'numeric' as const,
      month: 'short' as const,
      day: 'numeric' as const,
    }

    return date.toLocaleDateString(language, options);
  }

  const options: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  return new Intl.DateTimeFormat(language, options).format(date);
}

export default function useDateTimeFormat(timestamp: number): string {
  return formatDate(timestamp, {language: DEFAULT_LANGUAGE});
}