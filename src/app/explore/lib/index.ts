import { CARD_COLORS } from '@/features/explore/lib/types';

/**
 * Assigns a deterministic color from CARD_COLORS to each portfolio
 * based on its index in the feed.
 */
export function assignCardColors<T>(items: T[]): (T & { color: string })[] {
  return items.map((item, i) => ({
    ...item,
    color: CARD_COLORS[i % CARD_COLORS.length],
  }));
}

/**
 * Safely extracts the hostname from a URL string.
 * Falls back to the raw url if parsing fails.
 */
export function getHostname(url: string): string {
  try {
    const normalized = url.startsWith('http') ? url : `https://${url}`;
    return new URL(normalized).hostname;
  } catch {
    return url;
  }
}
