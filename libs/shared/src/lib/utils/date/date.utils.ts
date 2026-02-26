/**
 * Calculate the difference in years until the present year.
 */
export function getYearDiffFromNow(year: number | null | undefined): number | undefined {
  const currentYear = new Date().getFullYear();
  if (!year || isNaN(year) || year > currentYear) {
    return;
  }

  return currentYear - year;
}
