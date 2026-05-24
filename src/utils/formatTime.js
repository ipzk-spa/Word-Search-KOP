/**
 * @module utils/formatTime
 */

/**
 * Форматує мілісекунди як MM:SS для таймера гри.
 * @param {number} ms Час у мілісекундах.
 * @returns {string} Рядок виду `00:00`.
 */
export function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}
