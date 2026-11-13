import type { CSSProperties } from 'react'
import wordmarkNavy from '../assets/brand/wordmark-navy.png'
import wordmarkWhite from '../assets/brand/wordmark-white.png'
import oMask from '../assets/brand/wordmark-o-mask.png'

// The wordmark ships without its "O"; the O is a flowing gradient masked into the
// ring shape, exactly as on the brand identity board.
const tones = {
  dark: {
    src: wordmarkNavy,
    gradient: 'linear-gradient(90deg, #FD6E88, #3A78C2, #122E54, #FD6E88)',
    glow: 'glow-soft',
    // Matte "O" for glow-free use: a still blue-to-navy fill, no halo and no flowing colour.
    matte: 'linear-gradient(135deg, #3A78C2 0%, #1B4A8C 55%, #072D59 100%)',
  },
  light: {
    src: wordmarkWhite,
    gradient: 'linear-gradient(90deg, #FD6E88, #3A78C2, #C8E6FA, #FD6E88)',
    glow: 'glow-strong',
    // The same matte "O", in lighter blues so it reads on dark backgrounds.
    matte: 'linear-gradient(135deg, #DBF2FC 0%, #9FDCFA 45%, #3A78C2 100%)',
  },
}

interface LogoProps {
  tone?: keyof typeof tones
  // Glowing, colour-flowing "O" (brand board). Off in the navbar and footer for a matte logo.
  glow?: boolean
  className?: string
}

export default function Logo({ tone = 'dark', glow = true, className = 'h-9' }: LogoProps) {
  const t = tones[tone]
  return (
    <span role="img" aria-label="PairO" className={`relative inline-block aspect-[1511/522] ${className}`}>
      <img src={t.src} alt="" className="absolute inset-0 size-full" />
      <span aria-hidden="true" className={`absolute inset-0 ${glow ? t.glow : ''}`}>
        <span
          className={`logo-o block size-full ${glow ? '' : '[animation:none] [background-size:100%_100%]'}`}
          style={{ backgroundImage: glow ? t.gradient : t.matte, '--mask': `url(${oMask})` } as CSSProperties}
        />
      </span>
    </span>
  )
}
