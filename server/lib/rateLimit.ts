import { Redis } from "@upstash/redis"; // Move to import Redis from 'ioredis' when going to IONOS/OVH

const config = useRuntimeConfig();

const redis = new Redis({
  url: config.upstashRedisUrl,
  token: config.upstashRedisToken,
});

const WINDOW = 60 * 10; // 10 minutes
const MAX_REQUESTS = 5;

export async function rateLimit(ip: string) {
  const key = `rate_limit:${ip}`;

  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, WINDOW);
  }

  return requests > MAX_REQUESTS;
}
