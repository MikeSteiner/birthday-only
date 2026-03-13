export function getInitials(fullName: string): string {
  const matches = fullName.match(/(?<!\p{L})\p{L}/gu);
  if (!matches || matches.length === 0) {
    return '';
  }

  // Single word names
  if (matches.length === 1) {
    return fullName.trim().slice(0, 2).toUpperCase();
  }

  return (matches[0] + (matches[matches.length - 1] || '')).toUpperCase();
}
