/**
 * Formatting utilities for SkyCast application
 */

/**
 * Format temperature value based on unit
 * @param {number} temp Temperature value
 * @param {string} unit 'metric' (°C) or 'imperial' (°F)
 */
export const formatTemp = (temp, unit = 'metric') => {
  if (temp === undefined || temp === null) return '--°';
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${Math.round(temp)}${symbol}`;
};

/**
 * Format timestamp to readable date string
 * @param {number} unixTimestamp Unix timestamp in seconds
 */
export const formatDate = (unixTimestamp) => {
  if (!unixTimestamp) return '';
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format timestamp to 12-hour time format
 * @param {number} unixTimestamp Unix timestamp in seconds
 */
export const formatTime = (unixTimestamp) => {
  if (!unixTimestamp) return '';
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
