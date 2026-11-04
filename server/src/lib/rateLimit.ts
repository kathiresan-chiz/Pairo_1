import type { RequestHandler } from 'express'

interface RateLimitOptions {
  windowMs: number
  max: number
}

// Minimal in-memory limiter for the form endpoints (per IP, POST only).
export function rateLimit({ windowMs, max }: RateLimitOptions): RequestHandler {
  const hits = new Map<string, { start: number; count: number }>()

  return (req, res, next) => {
    if (req.method !== 'POST') return next()

    const now = Date.now()
    const key = req.ip ?? 'unknown'
    const entry = hits.get(key)

    if (!entry || now - entry.start > windowMs) {
      hits.set(key, { start: now, count: 1 })
      return next()
    }

    entry.count += 1
    if (entry.count > max) {
      res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' })
      return
    }
    next()
  }
}
