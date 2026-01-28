export interface MonthInfo {
  value: number;
  full: string;
  short: string;
  days: number;
}

export const MONTH_MAP: Record<number, Omit<MonthInfo, 'value'>> = {
  0: { full: 'January', short: 'Jan', days: 31 },
  1: { full: 'February', short: 'Feb', days: 28 },
  2: { full: 'March', short: 'Mar', days: 31 },
  3: { full: 'April', short: 'Apr', days: 30 },
  4: { full: 'May', short: 'May', days: 31 },
  5: { full: 'June', short: 'Jun', days: 30 },
  6: { full: 'July', short: 'Jul', days: 31 },
  7: { full: 'August', short: 'Aug', days: 31 },
  8: { full: 'September', short: 'Sep', days: 30 },
  9: { full: 'October', short: 'Oct', days: 31 },
  10: { full: 'November', short: 'Nov', days: 30 },
  11: { full: 'December', short: 'Dec', days: 31 },
};

/**
 * Get full month name
 */
export const getMonthName = (month: number): string => {
  return MONTH_MAP[month]?.full ?? '';
};

/**
 * Get short month name
 */
export const getMonthNameShort = (month: number): string => {
  return MONTH_MAP[month]?.short ?? '';
};

/**
 * Get all months as array
 */
export const getMonthsList = (): MonthInfo[] => {
  return Object.entries(MONTH_MAP).map(([value, data]) => ({
    value: parseInt(value),
    ...data,
  }));
};
