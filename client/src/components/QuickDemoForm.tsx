import { useState, type FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import LiquidFill from './LiquidFill'
import { errorMessage, submitEnquiry } from '../lib/api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Compact demo request used in the home hero.
export default function QuickDemoForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!fullName.trim() || !EMAIL_RE.test(email)) {
      setError('Please add your name and a valid business email.')
      return
    }
    if (!consent) {
      setError('Please agree to be contacted so we can arrange your demo.')
      return
    }
    setError('')
    setStatus('sending')
    try {
      await submitEnquiry({ fullName, email, intent: 'demo', source: 'home-hero' })
      setStatus('sent')
    } catch (err) {
      setError(errorMessage(err))
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm text-white/80">
        <CheckCircle2 className="size-5 shrink-0 text-seal" aria-hidden="true" />
        Thank you. Our team will contact you shortly to arrange your walkthrough.
      </div>
    )
  }

  const input =
    'w-full rounded-full bg-white/[0.07] px-5 py-3.5 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 outline-none focus:ring-seal/60'

  return (
    <form noValidate onSubmit={onSubmit} className="mt-6 grid gap-3">
      <label htmlFor="demo-name" className="sr-only">
        Your name
      </label>
      <input id="demo-name" className={input} placeholder="Your name" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <label htmlFor="demo-email" className="sr-only">
        Business email
      </label>
      <input
        id="demo-email"
        type="email"
        className={input}
        placeholder="Business email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="flex cursor-pointer items-start gap-3 px-1 text-xs leading-relaxed text-white/50">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-crimson"
        />
        I agree to be contacted by PAIRO about my demo, in line with the Privacy Policy.
      </label>
      {error && (
        <p role="alert" className="px-1 text-xs text-crimson">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="group relative isolate mt-1 flex items-center justify-between overflow-hidden rounded-full py-1.5 pr-1.5 pl-6 text-sm font-semibold text-white ring-1 ring-white/20 disabled:opacity-60"
      >
        <LiquidFill className="bg-brand" />
        {status === 'sending' ? 'Sending…' : 'Request a demo'}
        <span className="grid size-9 place-items-center rounded-full bg-white text-ink">
          <ArrowUpRight className="arrow-turn size-4" aria-hidden="true" />
        </span>
      </button>
    </form>
  )
}
