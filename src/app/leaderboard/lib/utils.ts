/**
 * Formats a numeric score to one decimal place.
 * Returns "0.0" if score is falsy.
 */
export function formatScore(score?: number | null): string {
  return score ? score.toFixed(1) : '0.0';
}

/**
 * Normalizes a URL by prepending https:// if no protocol is present.
 */
export function normalizeUrl(url: string): string {
  return url.startsWith('http') ? url : `https://${url}`;
}
