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

async function post(path: string, body: unknown): Promise<ApiResponse> {
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

export const submitEnquiry = (enquiry: Enquiry) => post('/contact', enquiry)
export const subscribe = (email: string) => post('/newsletter', { email })

export const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : 'Something went wrong. Please try again.'
