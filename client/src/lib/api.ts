export type Intent = 'general' | 'demo' | 'sales'

export interface Enquiry {
  fullName: string
  email: string
  company?: string
  phone?: string
  industry?: string
  requirements?: string
  preferredContact?: string
  intent: Intent
  source?: string
}

interface ApiResponse {
  ok?: boolean
  error?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/*
 * Where form submissions go:
 *  - the deployed site (production build) uses Netlify Forms: the fields are posted to
 *    Netlify, which stores them under Forms in the Netlify dashboard and can email them.
 *    The matching hidden forms in index.html tell Netlify which fields each form has.
 *  - local development (npm run dev) uses the Express API in server/, as before.
 * Set VITE_FORMS=api at build time to use the Express API in production instead.
 */
const useNetlifyForms = import.meta.env.PROD && import.meta.env.VITE_FORMS !== 'api'

async function postToApi(path: string, body: unknown): Promise<ApiResponse> {
  const res = await fetch(`/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data: ApiResponse = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.')
  }
  return data
}

async function postToNetlify(formName: string, fields: Record<string, string | undefined>): Promise<ApiResponse> {
  const body = new URLSearchParams({ 'form-name': formName })
  for (const [key, value] of Object.entries(fields)) {
    if (value) body.append(key, value.trim())
  }
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error('Something went wrong. Please try again.')
  return { ok: true }
}

export async function submitEnquiry(enquiry: Enquiry) {
  // Same checks the Express API makes, so both paths behave alike.
  if (!enquiry.fullName.trim() || !EMAIL_RE.test(enquiry.email.trim())) {
    throw new Error('Please provide your name and a valid email address.')
  }
  if (!useNetlifyForms) return postToApi('/contact', enquiry)
  return postToNetlify('enquiry', { ...enquiry, source: enquiry.source || 'contact-page' })
}

export async function subscribe(email: string) {
  if (!EMAIL_RE.test(email.trim())) throw new Error('Please enter a valid email address.')
  if (!useNetlifyForms) return postToApi('/newsletter', { email })
  return postToNetlify('newsletter', { email: email.toLowerCase() })
}

export const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : 'Something went wrong. Please try again.'
