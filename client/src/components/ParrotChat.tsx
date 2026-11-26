import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Mic, Paperclip, SendHorizontal } from 'lucide-react'
import type { ChatMessage, DraftCard } from '../content/chat'
import { GlowCard, type Glow } from './Dark'

interface ParrotChatProps {
  messages: ChatMessage[]
  /** change to replay the conversation */
  playKey?: string | number
  /** a prompt the visitor picked: its question and Parrot's answer glow, the rest dims */
  focus?: string | null
  glow?: Glow
  className?: string
}

const MSG_STEP = 0.8 // seconds between messages

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
// Short replies that continue an exchange rather than start a new one.
const FOLLOW_UPS = new Set(['confirm', 'yes', 'ok', 'send'])

// Indexes of the exchange that starts with the user message matching `focus`.
function exchangeFor(messages: ChatMessage[], focus?: string | null): Set<number> {
  const picked = new Set<number>()
  if (!focus) return picked
  const f = norm(focus)
  const start = messages.findIndex((m) => {
    const t = norm(m.text ?? m.attachment ?? '')
    if (m.from !== 'you' || !t) return false
    return t === f || f.includes(t) || t.includes(f)
  })
  if (start < 0) return picked
  picked.add(start)
  for (let i = start + 1; i < messages.length; i++) {
    const m = messages[i]
    if (m.from === 'you' && !FOLLOW_UPS.has(norm(m.text ?? ''))) break
    picked.add(i)
  }
  return picked
}

// The Parrot AI chat window: once scrolled into view, messages appear one after another.
export default function ParrotChat({ messages, playKey, focus, glow = 'b', className = '' }: ParrotChatProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const [visible, setVisible] = useState(false)
  const picked = useMemo(() => exchangeFor(messages, focus), [messages, focus])

  useEffect(() => {
    const el = listRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [playKey])

  return (
    <GlowCard glow={glow} aosItems={false} className={`flex flex-col p-4 sm:p-5 ${className}`} aria-label="Parrot AI conversation (sample data)">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand to-[#4b3df0] text-sm font-semibold">P</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Parrot AI</p>
          <p className="flex items-center gap-1.5 text-xs text-white/55">
            <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            online · running on your own model
          </p>
        </div>
        <span className="grid size-6 place-items-center rounded-full bg-crimson text-[11px] font-semibold">1</span>
      </div>

      <ol ref={listRef} key={playKey} className="flex flex-1 flex-col gap-3 py-5">
        {messages.map((m, i) => (
          <li
            key={i}
            className={`${visible ? 'stage-in' : 'opacity-0'} flex max-w-[88%] flex-col gap-1 ${m.from === 'you' ? 'self-end items-end' : 'self-start items-start'}`}
            style={{ animationDelay: `${0.3 + i * MSG_STEP}s` }}
          >
            <div
              className={`chat-focus flex flex-col gap-1 ${m.from === 'you' ? 'items-end' : 'items-start'} ${
                picked.size ? (picked.has(i) ? 'is-picked' : 'is-dimmed') : ''
              }`}
            >
            {m.card ? (
              <Draft card={m.card} />
            ) : (
              <div
                className={`chat-bubble rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === 'you' ? 'rounded-br-md bg-brand text-white' : 'rounded-bl-md bg-white/[0.08] text-white/90 ring-1 ring-white/10'
                }`}
              >
                {m.voice && (
                  <span className="mb-1 flex items-center gap-2 text-xs text-white/75">
                    <Mic className="size-3.5" aria-hidden="true" />
                    <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
                      {[5, 9, 6, 11, 7, 10, 4, 8].map((h, k) => (
                        <span key={k} className="w-0.5 rounded-full bg-white/70" style={{ height: h }} />
                      ))}
                    </span>
                    {m.voice}
                  </span>
                )}
                {m.attachment && (
                  <span className="flex items-center gap-1.5 font-medium">
                    <Paperclip className="size-3.5" aria-hidden="true" />
                    {m.attachment}
                    {m.text && <span className="font-normal opacity-80">— {m.text}</span>}
                  </span>
                )}
                {!m.attachment && m.text && <Emphasis text={m.text} phrases={m.highlight} />}
              </div>
            )}
            <span className="text-[10px] text-white/40">{m.time}</span>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-2 rounded-full bg-white/[0.06] py-1.5 pr-1.5 pl-4 ring-1 ring-white/10">
        <span className="flex-1 truncate text-xs text-white/45">Ask Parrot AI, or hold to speak…</span>
        <span className="grid size-8 place-items-center rounded-full bg-white/10" aria-hidden="true">
          <Mic className="size-4" />
        </span>
        <span className="grid size-8 place-items-center rounded-full bg-brand" aria-hidden="true">
          <SendHorizontal className="size-4" />
        </span>
      </div>
    </GlowCard>
  )
}

// The questions a visitor asked in a chat (short follow-ups like "Confirm" left out).
export function chatPrompts(messages: ChatMessage[]) {
  return messages
    .filter((m) => m.from === 'you' && (m.text || m.attachment) && !FOLLOW_UPS.has(norm(m.text ?? '')))
    .map((m) => {
      const key = (m.text ?? m.attachment)!
      const label = m.attachment ? `📎 ${m.attachment}` : m.voice ? `🎙 ${m.text}` : `“${m.text}”`
      return { key, label }
    })
}

// A chat with its questions as chips above it: click one to light up that exchange.
export function ChatWithPrompts({
  messages,
  playKey,
  glow,
  className = '',
  tone = 'light',
}: Omit<ParrotChatProps, 'focus'> & { tone?: 'light' | 'dark' }) {
  const [focus, setFocus] = useState<string | null>(null)
  useEffect(() => setFocus(null), [playKey, messages])
  const prompts = chatPrompts(messages)
  return (
    <div className="grid gap-3">
      {prompts.length > 1 && (
        <ul className="flex flex-wrap gap-2" aria-label="Tap a question to highlight it in the chat">
          {prompts.map((p) => (
            <li key={p.key}>
              <PromptChip text={p.label} tone={tone} active={focus === p.key} onClick={() => setFocus((f) => (f === p.key ? null : p.key))} />
            </li>
          ))}
        </ul>
      )}
      <ParrotChat messages={messages} playKey={playKey} focus={focus} glow={glow} className={className} />
    </div>
  )
}

// A prompt chip beside the chat: click it to light up that exchange in the chat.
export function PromptChip({ text, active, onClick, tone = 'light' }: { text: string; active: boolean; onClick: () => void; tone?: 'light' | 'dark' }) {
  const base = tone === 'dark' ? 'bg-white/10 ring-white/15 hover:bg-white/15' : 'bg-mist ring-line hover:bg-white hover:ring-brand/40'
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`prompt-chip w-fit cursor-pointer rounded-full px-4 py-2 text-left text-sm font-medium ring-1 transition ${
        active ? 'is-active bg-brand text-white ring-brand' : base
      }`}
    >
      {text}
    </button>
  )
}

function Draft({ card }: { card: DraftCard }) {
  return (
    <div className="chat-bubble w-64 max-w-full rounded-2xl bg-white p-4 text-ink shadow-xl shadow-black/30 sm:w-72">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-brand-deep uppercase">{card.title}</p>
      <p className="mt-1 font-semibold">{card.party}</p>
      <dl className="mt-3 grid gap-1.5 text-xs">
        {card.lines.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-muted">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
        {card.total && (
          <div className="mt-1 flex justify-between gap-4 border-t border-line pt-2 text-sm">
            <dt className="font-semibold">{card.total[0]}</dt>
            <dd className="font-semibold">{card.total[1]}</dd>
          </div>
        )}
      </dl>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
        <span className="rounded-full bg-ink py-2 text-center text-white">Confirm</span>
        <span className="rounded-full py-2 text-center ring-1 ring-line">Edit</span>
      </div>
    </div>
  )
}

// Renders `text` with each phrase in `phrases` emphasised.
export function Emphasis({ text, phrases, className = 'font-semibold text-seal-bright' }: { text: string; phrases?: string | string[]; className?: string }) {
  const list = (Array.isArray(phrases) ? phrases : phrases ? [phrases] : []).filter((p) => text.includes(p))
  if (!list.length) return <>{text}</>
  const pattern = new RegExp(`(${list.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`)
  return (
    <>
      {text.split(pattern).map((part, i) => (
        <Fragment key={i}>{list.includes(part) ? <span className={className}>{part}</span> : part}</Fragment>
      ))}
    </>
  )
}
