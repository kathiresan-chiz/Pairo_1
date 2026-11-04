import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import { append } from '../lib/store.js'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INTENTS = ['general', 'demo', 'sales'] as const

type Intent = (typeof INTENTS)[number]

export interface Enquiry {
  fullName: string
  email: string
  company: string
  phone: string
  industry: string
  requirements: string
  preferredContact: string
  intent: Intent
  source: string
}

const clean = (value: unknown, max = 200): string => (typeof value === 'string' ? value.trim().slice(0, max) : '')

const isIntent = (value: unknown): value is Intent => INTENTS.includes(value as Intent)

router.post('/contact', async (req, res, next) => {
  const body: Record<string, unknown> = req.body ?? {}
  const enquiry: Enquiry = {
    fullName: clean(body.fullName, 120),
    email: clean(body.email, 160).toLowerCase(),
    company: clean(body.company, 160),
    phone: clean(body.phone, 40),
    industry: clean(body.industry, 80),
    requirements: clean(body.requirements, 4000),
    preferredContact: clean(body.preferredContact, 20),
    intent: isIntent(body.intent) ? body.intent : 'general',
    source: clean(body.source, 40) || 'contact-page',
  }

  if (!enquiry.fullName || !EMAIL_RE.test(enquiry.email)) {
    res.status(400).json({ error: 'Please provide your name and a valid email address.' })
    return
  }

  try {
    await append('enquiries', { id: randomUUID(), createdAt: new Date().toISOString(), ...enquiry })
    res.status(201).json({ ok: true })
  } catch (err) {
    next(err)
  }
})

router.post('/newsletter', async (req, res, next) => {
  const email = clean(req.body?.email, 160).toLowerCase()
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' })
    return
  }

  try {
    await append('subscribers', { email, createdAt: new Date().toISOString() })
    res.status(201).json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
