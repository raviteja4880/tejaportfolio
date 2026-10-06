const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;

const rateLimitStore = new Map<string, number[]>();

export function checkRateLimit(identifier: string): boolean {
  const normalizedIdentifier = identifier || "anonymous";
  const now = Date.now();
  const entries = rateLimitStore.get(normalizedIdentifier) ?? [];
  const recentEntries = entries.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentEntries.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(normalizedIdentifier, recentEntries);
    return false;
  }

  recentEntries.push(now);
  rateLimitStore.set(normalizedIdentifier, recentEntries);
  return true;
}
