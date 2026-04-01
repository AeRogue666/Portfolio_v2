import { Redis } from "@upstash/redis"; // Move to import Redis from 'ioredis' when going to IONOS/OVH

const config = useRuntimeConfig();
const redis = new Redis({
  url: config.upstashRedisUrl,
  token: config.upstashRedisToken,
});

interface RateLimitConfig {
  windowSeconds?: number;
  maxRequests?: number;
}

export async function checkRateLimit(
  identifier: string, // IP or email
  config: RateLimitConfig = {},
): Promise<{ limited: boolean; remaining: number; reset: number }> {
  const window = config.windowSeconds ?? 600; // 10 minutes
  const max = config.maxRequests ?? 5;

  const key = `rate_limit:${identifier}`;
  const now = Date.now();
  const windowStart = now - window * 1000;

  try {
    // New request with timestamp
    const requests = await redis.zrange(key, windowStart, now);

    if (requests.length >= max) {
      return {
        limited: true,
        remaining: 0,
        reset: Math.ceil(((requests[0] as number) + window * 1000) / 1000),
      };
    }

    // Add actual request
    await redis.zadd(key, { score: now, member: `${now}` });
    await redis.expire(key, window);

    return {
      limited: false,
      remaining: max - requests.length - 1,
      reset: Math.ceil((now + window * 1000) / 1000),
    };
  } catch (error) {
    console.log("Rate limite check failed:", error);
    return {
      limited: false,
      remaining: max,
      reset: 0,
    };
  }
}