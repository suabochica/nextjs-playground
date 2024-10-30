interface DateTimeFormatOptions {
  year: 'numeric';
  month: 'numeric';
  day: 'numeric';
  hour: 'numeric';
  minute: 'numeric';
  second: 'numeric';
}

export default function useDateTimeFormat(timestamp: number): string {
  const date = new Date(timestamp);
  const language = navigator.language || 'es-ES';

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