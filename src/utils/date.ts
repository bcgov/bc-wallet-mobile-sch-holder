export const formatAsIssuedDate = (
  date: Date,
  timeZone: string = 'utc',
): string => {
  return date.toLocaleDateString('en-ca', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone,
  });
};
