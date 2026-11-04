// Keyword ticker, as in the layout reference. The list is doubled so the loop is seamless.
export default function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const row = [...items, ...items]
  return (
    <div className={`relative overflow-hidden border-y border-line py-4 ${className}`}>
      <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-6 text-xs font-semibold tracking-[0.2em] whitespace-nowrap text-muted uppercase"
          >
            {item}
            <span className="text-crimson" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-mist to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-mist to-transparent" />
    </div>
  )
}
