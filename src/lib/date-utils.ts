

export function formatDuration(milliseconds: number) {
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return formatter.format(days, 'day');
  } else if (hours > 0) {
    return formatter.format(hours, 'hour');
  } else if (minutes > 0) {
    return formatter.format(minutes, 'minute');
  } else {
    return formatter.format(seconds, 'second');
  }
}