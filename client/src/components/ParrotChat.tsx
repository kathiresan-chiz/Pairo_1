import { Fragment } from 'react'
import { Mic, Paperclip, SendHorizontal } from 'lucide-react'
import type { ChatMessage, DraftCard } from '../content/chat'
import { GlowCard, type Glow } from './Dark'

interface ParrotChatProps {
  messages: ChatMessage[]
  /** change to replay the conversation */
  playKey?: string | number
  glow?: Glow
  className?: string
}

// The Parrot AI chat window: messages appear one after another, then the input bar.
export default function ParrotChat({ messages, playKey, glow = 'b', className = '' }: ParrotChatProps) {
  return (
    <GlowCard glow={glow} className={`flex flex-col p-4 sm:p-5 ${className}`} aria-label="Parrot AI conversation (sample data)">
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

      <ol key={playKey} className="flex flex-1 flex-col gap-3 py-5">
        {messages.map((m, i) => (
          <li
            key={i}
            className={`stage-in flex max-w-[88%] flex-col gap-1 ${m.from === 'you' ? 'self-end items-end' : 'self-start items-start'}`}
            style={{ animationDelay: `${0.25 + i * 0.55}s` }}
          >
            {m.card ? (
              <Draft card={m.card} />
            ) : (
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
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

function Draft({ card }: { card: DraftCard }) {
  return (
    <div className="w-64 max-w-full rounded-2xl bg-white p-4 text-ink shadow-xl shadow-black/30 sm:w-72">
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
