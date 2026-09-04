type RateLimitEntry = { count: number; resetAt: number };

const globalForRateLimit = globalThis as typeof globalThis & {
  orderRateLimits?: Map<string, RateLimitEntry>;
};

const rateLimits = globalForRateLimit.orderRateLimits ?? new Map<string, RateLimitEntry>();
if (process.env.NODE_ENV !== 'production') globalForRateLimit.orderRateLimits = rateLimits;

function clientKey(request: Request) {
  // Render sets this header after its trusted proxy. Only the first address is the client.
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export function enforceRateLimit(
  request: Request,
  scope: string,
  limit: number,
  windowMs: number
) {
  const now = Date.now();
  const key = `${scope}:${clientKey(request)}`;
  const existing = rateLimits.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
