import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import LiquidFill from './LiquidFill'
import { errorMessage, subscribe } from '../lib/api'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await subscribe(email)
      setStatus('sent')
      setMessage('You are subscribed. Thank you.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(errorMessage(err))
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center gap-2 rounded-full bg-white p-1.5 ring-1 ring-navy/10 focus-within:ring-brand">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your work email"
          autoComplete="email"
          className="w-full min-w-0 flex-1 bg-transparent px-3 py-2 sm:px-4 outline-none placeholder:text-muted/70"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group relative isolate flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          <LiquidFill className="bg-brand" />
          Subscribe
          <span className="grid size-8 place-items-center rounded-full bg-white text-ink">
            <ArrowUpRight className="arrow-turn size-4" aria-hidden="true" />
          </span>
        </button>
      </div>
      {message && (
        <p role="status" className={`mt-3 px-4 text-sm ${status === 'error' ? 'text-[#b02c48]' : 'text-navy'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
