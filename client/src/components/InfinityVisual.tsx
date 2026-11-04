import { useId } from 'react'

const PATH = 'M200,100 C250,30 350,30 350,100 C350,170 250,170 200,100 C150,30 50,30 50,100 C50,170 150,170 200,100 Z'

// The abstract infinity loop from the brand board: seal → blue → navy → crimson,
// with a thin light trace travelling around it.
export default function InfinityVisual({ className = '', glow = true }: { className?: string; glow?: boolean }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}g`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#DBF2FC" />
          <stop offset="0.35" stopColor="#3A78C2" />
          <stop offset="0.68" stopColor="#1B4A8C" />
          <stop offset="1" stopColor="#FD6E88" />
        </linearGradient>
        <filter id={`${id}b`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      {glow && <path d={PATH} fill="none" stroke={`url(#${id}g)`} strokeWidth="36" opacity="0.5" filter={`url(#${id}b)`} />}
      <path d={PATH} fill="none" stroke={`url(#${id}g)`} strokeWidth="30" strokeLinejoin="round" />
      <path
        d={PATH}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.85"
        strokeWidth="1.6"
        strokeDasharray="70 330"
        strokeLinecap="round"
        className="animate-dash"
      />
    </svg>
  )
}
