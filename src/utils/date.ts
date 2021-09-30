export const formatAsIssuedDate = (
  date: Date,
  timeZone: string = 'utc',
): string => {
  return date.toLocaleDateString('en-ca', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone,
  });
};
