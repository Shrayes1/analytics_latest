/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Format percentage with + or - sign
 */
export function formatPercentage(value: number, includePlus = true): string {
  const sign = value > 0 && includePlus ? '+' : '';
  return `${sign}${value}%`;
}

/**
 * Format hours with "hrs" suffix
 */
export function formatHours(hours: number): string {
  return `${hours} hrs`;
}

/**
 * Format currency with $ sign
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format date to MMM D, YYYY format
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormatter('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}